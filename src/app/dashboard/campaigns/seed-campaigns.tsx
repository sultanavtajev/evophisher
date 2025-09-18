'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase/client'
import { InsertPhishingCampaign, InsertPhishingTarget } from '@/lib/types/database'

export function SeedCampaignsComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSeeded, setIsSeeded] = useState(false)

  const seedCampaigns = async () => {
    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Du må være logget inn for å legge til kampanjer')
        return
      }

      // Get user's companies
      const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select('id, name')
        .eq('user_id', user.id)
        .limit(1)

      if (companiesError || !companies || companies.length === 0) {
        alert('Du må opprette minst én bedrift før du kan legge til kampanjer')
        return
      }

      const company = companies[0]

      // Get some employees from the company
      const { data: employees, error: employeesError } = await supabase
        .from('employees')
        .select('id, first_name, last_name, email')
        .eq('company_id', company.id)
        .limit(5)

      if (employeesError || !employees || employees.length === 0) {
        alert('Du må ha minst noen ansatte i bedriften for å opprette kampanjer')
        return
      }

      // Sample campaigns
      const sampleCampaigns: Omit<InsertPhishingCampaign, 'company_id'>[] = [
        {
          name: 'Q1 2024 Sikkerhetstest - Passord',
          description: 'Kvartalsvise sikkerhetstester fokusert på passordrutiner og IT-sikkerhet',
          status: 'completed',
          template_subject: 'VIKTIG: Ditt passord utløper i dag',
          template_body: `Hei {{name}},

Vi har registrert at passordet ditt for {{company}} utløper i dag.

For å unngå at kontoen din blir deaktivert, må du oppdatere passordet ditt umiddelbart.

Klikk her for å oppdatere: https://security-update.${company.name.toLowerCase().replace(/\s+/g, '-')}.no/password-reset

Hvis du ikke oppdaterer passordet innen 2 timer, vil kontoen din bli midlertidig suspendert av sikkerhetshensyn.

Takk for din forståelse.

Med vennlig hilsen,
IT Support Team
${company.name}`,
          sender_name: 'IT Support',
          sender_email: 'support@' + company.name.toLowerCase().replace(/\s+/g, '-') + '.no',
          landing_page_url: 'https://test-landing.evophisher.no/password-reset',
          start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
        },
        {
          name: 'HR Test - Lønnslipp Februar',
          description: 'Test av ansattes oppmerksomhet rundt HR-relaterte phishing-forsøk',
          status: 'completed',
          template_subject: 'Din lønnslipp for februar er klar for visning',
          template_body: `Kjære {{name}},

Din lønnslipp for februar er nå tilgjengelig for visning i HR-portalen.

SAMMENDRAG:
- Bruttolønn: Tilgjengelig i portalen
- Feriepenger: Oppdatert
- Skattetrekk: Beregnet

For å se den komplette lønnsoversikten, logg inn på HR-portalen:
https://hr-portal.${company.name.toLowerCase().replace(/\s+/g, '-')}.no/payroll/{{employee_id}}

Med vennlig hilsen,
HR-avdelingen
${company.name}`,
          sender_name: 'HR Avdelingen',
          sender_email: 'hr@' + company.name.toLowerCase().replace(/\s+/g, '-') + '.no',
          landing_page_url: 'https://test-landing.evophisher.no/hr-portal',
          start_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() // 20 days ago
        },
        {
          name: 'CEO Test - Hasteoppgave Mars',
          description: 'Whaling-test rettet mot ledelse og assistenter med CEO-imitasjon',
          status: 'active',
          template_subject: 'HASTER - Konfidensiell oppgave',
          template_body: `Hei {{name}},

Jeg er for øyeblikket i et viktig møte og trenger din hjelp med en konfidensiell oppgave.

Kan du kjøpe 3 stk Google Play gavekort à kr 2000 hver til en viktig klient? Dette er tidskritisk og må gjøres i dag.

Send meg bildene av kodene så snart du har kjøpt dem. Jeg refunderer deg i morgen.

Ring meg ikke - jeg er i møte resten av dagen.

Takk for hjelpen!

Administrerende direktør
${company.name}

Sendt fra min iPhone`,
          sender_name: 'Administrerende direktør',
          sender_email: 'ceo@' + company.name.toLowerCase().replace(/\s+/g, '-') + '.no',
          landing_page_url: 'https://test-landing.evophisher.no/ceo-request',
          start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
        },
        {
          name: 'Microsoft 365 Sikkerhetstest',
          description: 'Test av reaksjoner på falske Microsoft sikkerhetsvarsler',
          status: 'draft',
          template_subject: 'Microsoft 365 - Mistenkelig påloggingsaktivitet oppdaget',
          template_body: `Hei {{name}},

Vi har oppdaget mistenkelig påloggingsaktivitet på din Microsoft 365-konto knyttet til {{email}}.

DETALJER:
- Tidspunkt: I dag, 14:32
- Lokasjon: Lagos, Nigeria
- Enhet: Ukjent Android-enhet
- Status: Blokkert

For å sikre kontoen din og få tilgang til alle tjenester igjen, må du verifisere identiteten din umiddelbart.

VERIFISER KONTOEN DIN: https://login-security.microsoft365.com/verify

Microsoft Security Team`,
          sender_name: 'Microsoft Security',
          sender_email: 'security@microsoft.com',
          landing_page_url: 'https://test-landing.evophisher.no/microsoft-verify',
          start_date: null
        }
      ]

      // Create campaigns
      const campaignsWithCompany = sampleCampaigns.map(campaign => ({
        ...campaign,
        company_id: company.id
      }))

      const { data: createdCampaigns, error: campaignsError } = await supabase
        .from('phishing_campaigns')
        .insert(campaignsWithCompany)
        .select()

      if (campaignsError) {
        console.error('Error creating campaigns:', campaignsError)
        alert('Feil ved opprettelse av kampanjer: ' + campaignsError.message)
        return
      }

      // Create targets for each campaign
      const allTargets: InsertPhishingTarget[] = []

      createdCampaigns.forEach((campaign, campaignIndex) => {
        // Create different scenarios for each campaign
        employees.forEach((employee, employeeIndex) => {
          let status: 'pending' | 'sent' | 'opened' | 'clicked' | 'submitted' | 'reported'

          if (campaign.status === 'completed') {
            // For completed campaigns, simulate different outcomes
            const scenario = (campaignIndex + employeeIndex) % 5
            switch (scenario) {
              case 0: status = 'reported'; break
              case 1: status = 'clicked'; break
              case 2: status = 'opened'; break
              case 3: status = 'sent'; break
              default: status = 'submitted'; break
            }
          } else if (campaign.status === 'active') {
            // For active campaigns, most are sent/opened
            status = employeeIndex < 2 ? 'opened' : 'sent'
          } else {
            // Draft campaigns have pending targets
            status = 'pending'
          }

          allTargets.push({
            campaign_id: campaign.id,
            employee_id: employee.id,
            status
          })
        })
      })

      const { error: targetsError } = await supabase
        .from('phishing_targets')
        .insert(allTargets)

      if (targetsError) {
        console.error('Error creating targets:', targetsError)
        alert('Kampanjer opprettet, men feil ved opprettelse av mål: ' + targetsError.message)
        return
      }

      // Update targets with realistic timestamps for completed campaigns
      if (createdCampaigns.some(c => c.status === 'completed')) {
        // This would ideally be done with more specific queries, but for demo purposes
        // we'll let the user know they can see the campaigns now
      }

      alert(`${createdCampaigns.length} kampanjer med ${allTargets.length} mål ble opprettet!`)
      setIsSeeded(true)

      // Refresh the page to show new campaigns
      window.location.reload()
    } catch (error) {
      console.error('Error seeding campaigns:', error)
      alert('En uventet feil oppstod')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legg til eksempelkampanjer</CardTitle>
        <CardDescription>
          Opprett realistiske phishing-kampanjer med forskjellige statuser og resultater
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Dette vil opprette 4 eksempelkampanjer med dine eksisterende bedrifter og ansatte:
          </p>
          <ul className="text-sm space-y-1 ml-4">
            <li>• <strong>Q1 Sikkerhetstest</strong> - Fullført kampanje med blandede resultater</li>
            <li>• <strong>HR Lønnslipp Test</strong> - Fullført HR-fokusert test</li>
            <li>• <strong>CEO Whaling Test</strong> - Aktiv ledelsesrettet kampanje</li>
            <li>• <strong>Microsoft 365 Test</strong> - Utkast klar for lansering</li>
          </ul>
          <p className="text-sm text-muted-foreground font-medium">
            <strong>OBS:</strong> Du må ha opprettet minst én bedrift og noen ansatte først.
          </p>
          <Button
            onClick={seedCampaigns}
            disabled={isLoading || isSeeded}
          >
            {isLoading ? 'Oppretter kampanjer...' : isSeeded ? 'Kampanjer opprettet' : 'Opprett eksempelkampanjer'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}