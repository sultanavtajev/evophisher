import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import { FAQItem } from '@/components/ui/faq-item'
import {
  Shield,
  Lock,
  Eye,
  FileText,
  CheckCircle,
  ArrowRight,
  User,
  Database,
  Download,
  AlertTriangle,
  Mail,
  Settings,
  Clock,
  Globe,
  UserCheck,
  Trash2,
  Edit3,
  Scale,
  Target
} from 'lucide-react'

export default function GDPRPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />

        <div className="container mx-auto text-center relative max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Scale className="h-4 w-4" />
              GDPR-kompatibilitet
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Vi følger{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                GDPR
              </span>{' '}
              fullt ut
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              EuropaΥs personvernforordning (GDPR) er integrert i alt vi gjør.
              Lær hvordan vi sikrer din rett til personvern og databeskyttelse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="#your-rights">
                  Se dine GDPR-rettigheter
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Download className="mr-2 h-5 w-5" />
                Last ned GDPR-guide
              </Button>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in-up">
              ✓ Full GDPR-kompatibilitet ✓ Norsk datalagring ✓ Transparent databehandling
            </p>
          </div>
        </div>
      </section>

      {/* GDPR Principles */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GDPR-prinsippene vi følger
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi implementerer alle syv grunnleggende prinsipper i GDPR
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Scale className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Lovlighet og rettferdighet</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  All databehandling har et klart rettslig grunnlag og skjer
                  på en rettferdig og transparent måte.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Åpenhet</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Vi er transparente om hvordan vi samler inn, bruker
                  og deler personopplysninger.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Formålsbegrensning</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Data samles kun inn for spesifikke, uttrykkelige
                  og legitime formål.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Dataminimering</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Vi samler kun inn data som er nødvendig for
                  de angitte formålene.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Riktighet</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Vi sørger for at persondata er nøyaktige og
                  oppdaterte til enhver tid.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Lagringsbegrensning</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Data oppbevares kun så lenge det er nødvendig
                  for de angitte formålene.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Integritet og konfidensialitet</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Robuste sikkerhetstiltak beskytter mot uautorisert
                  tilgang og tap av data.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Processing */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vårt rettslige grunnlag for databehandling
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All behandling av persondata skjer basert på GDPR artikkel 6
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Kontraktoppfyllelse (Art. 6.1.b)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For å levere cybersikkerhetstjenester som avtalt i kundeforholdet,
                    inkludert brukeradministrasjon og rapportgenerering.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Samtykke (Art. 6.1.a)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For markedsføring, nyhetsbrev og andre frivillige tjenester
                    hvor du har gitt eksplisitt samtykke.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Legitime interesser (Art. 6.1.f)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For forbedring av tjenester, sikkerhet, fraud prevention
                    og andre legitime forretningsinteresser.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Juridisk forpliktelse (Art. 6.1.c)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For å overholde lovkrav som regnskapslovgivning,
                    anti-hvitvasking og andre juridiske forpliktelser.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Interesseavveining</CardTitle>
                <CardDescription>
                  Ved bruk av legitime interesser som rettslig grunnlag utfører vi alltid en interesseavveining
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Vår legitime interesse</div>
                      <div className="text-sm text-muted-foreground">
                        Forbedring av tjenester og sikkerhet
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Påvirkning på deg</div>
                      <div className="text-sm text-muted-foreground">
                        Minimal påvirkning på dine rettigheter
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Balanse</div>
                      <div className="text-sm text-muted-foreground">
                        Våre interesser veier ikke tyngre enn dine rettigheter
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Dine rettigheter</div>
                      <div className="text-sm text-muted-foreground">
                        Du kan motsette deg behandling når som helst
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section id="your-rights" className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dine GDPR-rettigheter
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              GDPR gir deg omfattende rettigheter over dine persondata
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til innsyn</CardTitle>
                <CardDescription>
                  Få kopi av alle persondata vi har om deg og informasjon om behandlingen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Art. 15 GDPR</p>
                <Button variant="outline" size="sm">
                  Be om innsyn
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Edit3 className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til retting</CardTitle>
                <CardDescription>
                  Korriger unøyaktige eller ufullstendige personopplysninger.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Art. 16 GDPR</p>
                <Button variant="outline" size="sm">
                  Rett data
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Trash2 className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til sletting</CardTitle>
                <CardDescription>
                  Be om sletting av persondata når vilkårene for "retten til å bli glemt" er oppfylt.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Art. 17 GDPR</p>
                <Button variant="outline" size="sm">
                  Be om sletting
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Settings className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til begrensning</CardTitle>
                <CardDescription>
                  Begrens behandlingen av persondata under spesielle omstendigheter.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Art. 18 GDPR</p>
                <Button variant="outline" size="sm">
                  Begrens behandling
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Download className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til dataportabilitet</CardTitle>
                <CardDescription>
                  Få dine data i strukturert format for overføring til andre tjenester.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Art. 20 GDPR</p>
                <Button variant="outline" size="sm">
                  Eksporter data
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til innsigelse</CardTitle>
                <CardDescription>
                  Motsett deg behandling basert på legitime interesser eller direkte markedsføring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Art. 21 GDPR</p>
                <Button variant="outline" size="sm">
                  Motsett deg
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <UserCheck className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Trekke tilbake samtykke</CardTitle>
                <CardDescription>
                  Trekk tilbake samtykke når som helst for samtykkebasert behandling.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Art. 7.3 GDPR</p>
                <Button variant="outline" size="sm">
                  Trekk samtykke
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Scale className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til å klage</CardTitle>
                <CardDescription>
                  Klage til Datatilsynet hvis du mener vi ikke overholder GDPR.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Art. 77 GDPR</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://datatilsynet.no" target="_blank">
                    Datatilsynet
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="border-0 shadow-sm max-w-2xl mx-auto">
              <CardContent className="p-6">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Responstid på forespørsler</h3>
                <p className="text-muted-foreground mb-4">
                  Vi svarer på alle GDPR-forespørsler innen 30 dager. For komplekse
                  forespørsler kan fristen forlenges med ytterligere 60 dager.
                </p>
                <Button asChild>
                  <Link href="mailto:privacy@evophisher.no">
                    <Mail className="mr-2 h-4 w-4" />
                    Send GDPR-forespørsel
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Transfers */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dataoverføringer og lagring
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi følger strenge regler for hvor og hvordan data lagres og overføres
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Datalagring</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Alle data lagres i Norge/EU
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Sikre datasentre med ISO 27001
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Redundant backup i EU/EØS
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Ingen tredjelandsoverføringer
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Tredjeparter</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Databehandleravtaler (DPA)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Kun EU/EØS-leverandører
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Regelmessige compliancesjekker
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Transparente partnerlister
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Lock className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Sikkerhetstiltak</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    End-to-end kryptering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Pseudonymisering av data
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Tilgangskontroll og logging
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Regelmessige sikkerhetstester
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GDPR FAQ
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Svar på vanlige spørsmål om GDPR og hvordan det påvirker deg
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Hva er mitt rettslige grunnlag for å bruke EvoPhisher?"
              answer="Som databehandlingsansvarlig i din organisasjon har du rettslig grunnlag basert på kontraktoppfyllelse (levering av cybersikkerhetstjenester) og legitime interesser (forbedring av organisasjonens sikkerhet). Du må sørge for at ansatte er informert om phishing-testene."
            />

            <FAQItem
              question="Hvordan kan jeg utøve mine GDPR-rettigheter?"
              answer="Du kan utøve alle GDPR-rettigheter ved å sende en e-post til privacy@evophisher.no. Vi ber om identitetsverifikasjon og svarer innen 30 dager. For komplekse forespørsler kan fristen forlenges til 90 dager med begrunnelse."
            />

            <FAQItem
              question="Deler dere data med andre land utenfor EU/EØS?"
              answer="Nei, alle persondata behandles og lagres utelukkende innenfor EU/EØS-området. Vi har ikke dataoverføringer til tredjeland og bruker kun leverandører som garanterer samme beskyttelsesnivå som GDPR."
            />

            <FAQItem
              question="Hvordan sikrer dere 'innebygd personvern' (privacy by design)?"
              answer="Personvern er integrert i hele systemarkitekturen med kryptering, dataminimering, automatisk sletting, tilgangskontroll og anonymisering. Vi gjennomfører personvernkonsekvensvurderinger (DPIA) for alle nye funksjoner."
            />

            <FAQItem
              question="Hva skjer ved et databrudd?"
              answer="Ved databrudd varsler vi Datatilsynet innen 72 timer hvis det medfører høy risiko. Berørte personer varsles uten unødig opphold. Vi har detaljerte beredskapsplaner og samarbeider med cybersikkerhetseksperter for rask respons."
            />
          </div>
        </div>
      </section>

      {/* Contact DPO */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <Card className="border-0 shadow-sm max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Kontakt vår personvernombud (DPO)</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Vår personvernombud (Data Protection Officer) er tilgjengelig for alle
                GDPR-relaterte spørsmål og forespørsler. Vi har også opprettet et
                personvernråd som møtes månedlig for å sikre kontinuerlig compliance.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Personvernombud</h4>
                  <p className="text-muted-foreground">dpo@evophisher.no</p>
                  <p className="text-muted-foreground">+47 123 45 681</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Personvernråd</h4>
                  <p className="text-muted-foreground">privacy-council@evophisher.no</p>
                  <p className="text-muted-foreground">Møtes første mandag i måneden</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="mailto:dpo@evophisher.no">
                    <Mail className="mr-2 h-4 w-4" />
                    Kontakt personvernombud
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://datatilsynet.no" target="_blank">
                    Klage til Datatilsynet
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:20px_20px]" />
        </div>

        <div className="container mx-auto text-center relative max-w-7xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trygg på vår GDPR-kompatibilitet?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start din sikre cybersikkerhetstrening i dag. Alle persondata
              behandles i full samsvar med GDPR-kravene.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Start GDPR-sikker testing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                <Download className="mr-2 h-5 w-5" />
                Last ned GDPR-compliance rapport
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ 100% GDPR-kompatibel ✓ Norsk/EU datalagring ✓ Dedikert personvernombud
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}