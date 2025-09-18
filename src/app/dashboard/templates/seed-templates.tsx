'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase/client'
import { InsertEmailTemplate } from '@/lib/types/database'

const DEFAULT_TEMPLATES: Omit<InsertEmailTemplate, 'user_id'>[] = [
  {
    name: 'Passord utløper snart - IT Support',
    subject: 'VIKTIG: Ditt passord utløper i dag',
    body: `Hei {{name}},

Vi har registrert at passordet ditt for {{company}} utløper i dag.

For å unngå at kontoen din blir deaktivert, må du oppdatere passordet ditt umiddelbart.

Klikk her for å oppdatere: https://security-update.{{company}}.no/password-reset

Hvis du ikke oppdaterer passordet innen 2 timer, vil kontoen din bli midlertidig suspendert av sikkerhetshensyn.

Takk for din forståelse.

Med vennlig hilsen,
IT Support Team
{{company}}

---
Denne e-posten ble sendt til {{email}}. Ikke svar på denne e-posten.`,
    template_type: 'phishing',
    is_public: true
  },
  {
    name: 'Microsoft 365 Sikkerhetsvarsling',
    subject: 'Microsoft 365 - Mistenkelig påloggingsaktivitet oppdaget',
    body: `Hei {{name}},

Vi har oppdaget mistenkelig påloggingsaktivitet på din Microsoft 365-konto knyttet til {{email}}.

DETALJER:
- Tidspunkt: I dag, 14:32
- Lokasjon: Lagos, Nigeria
- Enhet: Ukjent Android-enhet
- Status: Blokkert

For å sikre kontoen din og få tilgang til alle tjenester igjen, må du verifisere identiteten din umiddelbart.

VERIFISER KONTOEN DIN: https://login-security.microsoft365.com/verify

Hvis dette ikke var deg, anbefaler vi sterkt at du endrer passordet ditt øyeblikkelig.

Microsoft Security Team
Ikke svar på denne e-posten - den er automatisk generert.`,
    template_type: 'phishing',
    is_public: true
  },
  {
    name: 'Lønnslipp tilgjengelig - HR',
    subject: 'Din lønnslipp for {{month}} er klar for visning',
    body: `Kjære {{name}},

Din lønnslipp for {{month}} er nå tilgjengelig for visning i HR-portalen.

SAMMENDRAG:
- Bruttolønn: Tilgjengelig i portalen
- Feriepenger: Oppdatert
- Skattetrekk: Beregnet

For å se den komplette lønnsoversikten, logg inn på HR-portalen:
https://hr-portal.{{company}}.no/payroll/{{employee_id}}

Husk at du må logge inn innen 7 dager, ellers blir tilgangen midlertidig deaktivert av sikkerhetshensyn.

Spørsmål? Kontakt HR på hr@{{company}}.no

Med vennlig hilsen,
HR-avdelingen
{{company}}`,
    template_type: 'phishing',
    is_public: true
  },
  {
    name: 'Hasteoppgave fra CEO',
    subject: 'HASTER - Konfidensiell oppgave',
    body: `Hei {{name}},

Jeg er for øyeblikket i et viktig møte og trenger din hjelp med en konfidensiell oppgave.

Kan du kjøpe 3 stk Google Play gavekort à kr 2000 hver til en viktig klient? Dette er tidskritisk og må gjøres i dag.

Send meg bildene av kodene så snart du har kjøpt dem. Jeg refunderer deg i morgen.

Ring meg ikke - jeg er i møte resten av dagen.

Takk for hjelpen!

{{ceo_name}}
Administrerende direktør
{{company}}

Sendt fra min iPhone`,
    template_type: 'phishing',
    is_public: true
  },
  {
    name: 'Bankvarsel - Mistenkelig aktivitet',
    subject: 'VIKTIG: Mistenkelig aktivitet på din bankkonto',
    body: `Kjære {{name}},

Vi har registrert mistenkelig aktivitet på bankkontoen din knyttet til {{email}}.

TRANSAKSJONER SOM KREVER BEKREFTELSE:
- 15.234 kr til "Online Shopping International"
- 8.750 kr til "Digital Services Ltd"
- 12.900 kr til ukjent mottaker

Hvis du ikke gjenkjenner disse transaksjonene, må du umiddelbart:

1. Logge inn på din nettbank: https://secure-banking.dnb.no/verify-account
2. Bekrefte identiteten din
3. Rapportere svindelforsøk

VIKTIG: Hvis du ikke reagerer innen 24 timer, vil alle ventende transaksjoner bli godkjent automatisk.

Kundeservice: 915 04 800 (hele døgnet)

Med vennlig hilsen,
DNB Sikkerhetsteam

---
Dette er en automatisk generert e-post. Ikke svar på denne meldingen.`,
    template_type: 'phishing',
    is_public: true
  },
  {
    name: 'Planlagt systemoppdatering - IT',
    subject: 'Viktig systemoppdatering krever handling fra deg',
    body: `Hei {{name}},

Vi gjennomfører en kritisk sikkerhetsoppdatering av {{company}}s IT-systemer i helgen.

VIKTIG: For å sikre at du beholder tilgang til alle systemer etter oppdateringen, må du bekrefte kontoen din på forhånd.

DEADLINE: Fredag 17:00

HANDLING KREVES:
1. Gå til: https://system-update.{{company}}-it.no
2. Logg inn med dine vanlige legitimasjoner
3. Bekreft kontoinformasjonen din
4. Last ned den nye sikkerhetssertifikatet

Kontoer som ikke er bekreftet innen fristen vil miste tilgang til:
- E-post
- Filserver
- Alle interne systemer

Ved problemer, kontakt IT-support på: support@{{company}}.no

Med vennlig hilsen,
IT Support
{{company}}

MERK: Denne oppdateringen er obligatorisk for alle ansatte.`,
    template_type: 'phishing',
    is_public: true
  },
  {
    name: 'Spotify Premium - Faktura',
    subject: 'Din Spotify Premium-abonnement er utløpt',
    body: `Hei {{name}},

Ditt Spotify Premium-abonnement utløp i går, og kontoen din er nå begrenset til gratis tjenester.

For å fortsette å nyte:
- Musikk uten reklame
- Offline-lytting
- Ubegrenset hopping

Reaktiver abonnementet ditt nå: https://spotify-renewal.com/premium/{{email}}

Spesialtilbud: 3 måneder for kun 99 kr (ordinært 349 kr)

Dette tilbudet utløper om 24 timer.

Spotify Team

---
Hvis du ikke ønsker flere e-poster fra oss, klikk her for å avmelde.`,
    template_type: 'phishing',
    is_public: true
  },
  {
    name: 'LinkedIn - Profil blir slettet',
    subject: 'Din LinkedIn-profil blir permanent slettet i morgen',
    body: `Hei {{name}},

Vi har registrert flere brudd på LinkedIn sine retningslinjer knyttet til din profil.

REGELBRUDD OPPDAGET:
- Spam-aktivitet
- Falsk profilinformasjon
- Upassende meldinger

Din profil vil bli permanent slettet i morgen kl. 12:00 med mindre du verifiserer kontoen din umiddelbart.

VERIFISER KONTOEN: https://linkedin-verification.com/secure/{{email}}

Prosessen tar kun 2 minutter og sikrer at profilen din beholdes.

LinkedIn Security Team

OBS: Dette er din siste advarsel. Kontoen slettes uten videre varsel.`,
    template_type: 'phishing',
    is_public: true
  }
]

export function SeedTemplatesComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSeeded, setIsSeeded] = useState(false)

  const seedTemplates = async () => {
    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Du må være logget inn for å legge til maler')
        return
      }

      // Check if templates already exist
      const { data: existingTemplates } = await supabase
        .from('email_templates')
        .select('name')
        .eq('user_id', user.id)

      const existingNames = existingTemplates?.map(t => t.name) || []
      const newTemplates = DEFAULT_TEMPLATES.filter(t => !existingNames.includes(t.name))

      if (newTemplates.length === 0) {
        alert('Alle standardmaler er allerede lagt til!')
        setIsSeeded(true)
        return
      }

      const templatesWithUser = newTemplates.map(template => ({
        ...template,
        user_id: user.id,
        is_public: false // Make them personal templates, not public
      }))

      const { error } = await supabase
        .from('email_templates')
        .insert(templatesWithUser)

      if (error) {
        console.error('Error seeding templates:', error)
        alert('Feil ved opprettelse av maler: ' + error.message)
        return
      }

      alert(`${newTemplates.length} nye maler ble lagt til!`)
      setIsSeeded(true)

      // Refresh the page to show new templates
      window.location.reload()
    } catch (error) {
      console.error('Error seeding templates:', error)
      alert('En uventet feil oppstod')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legg til standardmaler</CardTitle>
        <CardDescription>
          Legg til realistiske phishing-maler for sikkerhetstrening
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Dette vil legge til {DEFAULT_TEMPLATES.length} forhåndsdefinerte phishing-maler som inkluderer:
          </p>
          <ul className="text-sm space-y-1 ml-4">
            <li>• Passord utløper varsler</li>
            <li>• Microsoft 365 sikkerhetsvarsler</li>
            <li>• HR/lønnslipp meldinger</li>
            <li>• CEO/ledelse forespørsler</li>
            <li>• Bankvarsler</li>
            <li>• IT systemoppdateringer</li>
            <li>• Sosiale medier varsler</li>
          </ul>
          <Button
            onClick={seedTemplates}
            disabled={isLoading || isSeeded}
          >
            {isLoading ? 'Legger til maler...' : isSeeded ? 'Maler lagt til' : 'Legg til standardmaler'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}