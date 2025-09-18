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
  Globe,
  Mail,
  Calendar,
  Settings,
  AlertTriangle,
  Download,
  Trash2,
  Edit3
} from 'lucide-react'

export default function PrivacyPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />

        <div className="container mx-auto text-center relative max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Shield className="h-4 w-4" />
              Din personvern er viktig for oss
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Hvordan vi{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                beskytter
              </span>{' '}
              dine data
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              Vi tar personvern på alvor og følger GDPR og norsk personvernlovgivning.
              Her finner du informasjon om hvordan vi samler inn, bruker og beskytter dine data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="#your-rights">
                  Se dine rettigheter
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Download className="mr-2 h-5 w-5" />
                Last ned PDF
              </Button>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in-up">
              Sist oppdatert: 1. januar 2024 • Gjelder fra: 1. januar 2024
            </p>
          </div>
        </div>
      </section>

      {/* Data Collection */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hvilke data samler vi inn?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi samler kun inn de dataene som er nødvendige for å levere våre tjenester
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <User className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Personopplysninger</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Navn, e-postadresse, telefonnummer og bedriftsinformasjon
                  som du oppgir ved registrering eller kontakt.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Bruksdata</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Informasjon om hvordan du bruker plattformen, inkludert
                  innlogginger, kampanjeresultater og systeminteraksjoner.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Tekniske data</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  IP-adresse, nettlesertype, enhetstype og andre tekniske
                  opplysninger for sikkerhet og funksjonalitet.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Mail className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Kommunikasjonsdata</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  E-poster, chat-meldinger og annen kommunikasjon med
                  vårt supportteam for å gi best mulig service.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Kampanjedata</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Resultater fra phishing-tester, rapporter og analyser
                  som genereres av din bruk av plattformen.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Settings className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Preferanser</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Dine innstillinger, preferanser og tilpassinger
                  av plattformen for å forbedre brukeropplevelsen.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Use Data */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hvordan bruker vi dine data?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi bruker dine data kun for legitime forretningsformål og med ditt samtykke
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Levere våre tjenester</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vi bruker dine data for å levere phishing-testtjenester, generere rapporter
                    og gi deg tilgang til plattformen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Forbedre våre tjenester</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vi analyserer bruksdata for å forbedre funksjonalitet, utvikle nye
                    funksjoner og optimalisere brukeropplevelsen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Kommunikasjon</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vi sender deg viktige oppdateringer om tjenesten, sikkerhetsvarsler
                    og svar på dine henvendelser.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sikkerhet og overholdelse</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vi bruker data for å beskytte mot misbruk, sikre systemsikkerhet
                    og overholde juridiske forpliktelser.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Rettslig grunnlag</CardTitle>
                <CardDescription>
                  Vi behandler persondata basert på følgende rettslige grunnlag i henhold til GDPR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Kontraktoppfyllelse</div>
                      <div className="text-sm text-muted-foreground">
                        For å levere tjenester som avtalt i kundeforholdet
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Samtykke</div>
                      <div className="text-sm text-muted-foreground">
                        Når du har gitt eksplisitt samtykke til behandling
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Legitime interesser</div>
                      <div className="text-sm text-muted-foreground">
                        For forbedring av tjenester og sikkerhet
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Juridisk forpliktelse</div>
                      <div className="text-sm text-muted-foreground">
                        For å overholde lovkrav og regulatoriske forpliktelser
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
              Dine rettigheter
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Du har full kontroll over dine persondata og kan utøve følgende rettigheter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til innsyn</CardTitle>
                <CardDescription>
                  Se hvilke persondata vi har om deg og hvordan de behandles.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                  Korriger feil eller utdaterte personopplysninger om deg.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  Endre data
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Trash2 className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til sletting</CardTitle>
                <CardDescription>
                  Be om sletting av dine persondata når det ikke lenger er nødvendig.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  Slett data
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Download className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Rett til dataportabilitet</CardTitle>
                <CardDescription>
                  Få dine data i et strukturert format for overføring til andre tjenester.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  Eksporter data
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              For å utøve dine rettigheter eller stille spørsmål om personvern, kontakt vår personvernansvarlig:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="mailto:privacy@evophisher.no">
                  <Mail className="mr-2 h-4 w-4" />
                  privacy@evophisher.no
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Kontakt oss
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hvordan sikrer vi dine data?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi implementerer bransjeledende sikkerhetstiltak for å beskytte dine persondata
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Lock className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Kryptering</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    AES-256 kryptering i hvile
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    TLS 1.3 for data i transit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    End-to-end kryptering
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Tilgangskontroll</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Multifaktor-autentisering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Rollebasert tilgang
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Regelmessig tilgangsrevisjon
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Overvåking</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    24/7 sikkerhetsovervåking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Automatisk trusseldeteksjon
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Incident response team
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
              Ofte stilte spørsmål om personvern
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Svar på vanlige spørsmål om hvordan vi håndterer persondata
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Hvor lenge oppbevarer dere mine data?"
              answer="Vi oppbevarer persondata kun så lenge det er nødvendig for å levere tjenester eller overholde juridiske forpliktelser. Kundedata slettes innen 90 dager etter avsluttet abonnement, med mindre annet er avtalt eller lovpålagt."
            />

            <FAQItem
              question="Deler dere mine data med tredjeparter?"
              answer="Vi deler ikke persondata med tredjeparter for markedsføringsformål. Vi kan dele data med leverandører som hjelper oss med å levere tjenester, men kun under strenge datadelingsavtaler som sikrer samme beskyttelsesnivå."
            />

            <FAQItem
              question="Kan jeg trekke tilbake samtykket mitt?"
              answer="Ja, du kan når som helst trekke tilbake samtykke til behandling av persondata. Dette kan påvirke vår evne til å levere enkelte tjenester. Kontakt oss på privacy@evophisher.no for å trekke tilbake samtykke."
            />

            <FAQItem
              question="Overføres mine data til land utenfor EU/EØS?"
              answer="Nei, alle persondata lagres og behandles utelukkende i Norge og EU/EØS-området. Vi bruker ikke tjenester som innebærer overføring av persondata til tredjeland uten tilstrekkelig beskyttelsesnivå."
            />

            <FAQItem
              question="Hvordan varsles jeg om endringer i personvernpolicyen?"
              answer="Vi varsler om vesentlige endringer via e-post minst 30 dager før endringene trer i kraft. Mindre endringer publiseres på denne siden med oppdatert dato. Vi oppfordrer deg til å sjekke denne siden regelmessig."
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <Card className="border-0 shadow-sm max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Har du spørsmål om personvern?</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Vår personvernansvarlige er tilgjengelig for å svare på alle dine spørsmål
                om hvordan vi behandler dine persondata. Du kan også klage til Datatilsynet
                hvis du mener vi ikke overholder personvernreglene.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="mailto:privacy@evophisher.no">
                    <Mail className="mr-2 h-4 w-4" />
                    Kontakt personvernansvarlig
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://datatilsynet.no" target="_blank">
                    Datatilsynet
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
              Trygg på vårt personvern?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start din gratis prøveperiode i dag og opplev selv hvor seriøst
              vi tar beskyttelsen av dine data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Start sikker testing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                <FileText className="mr-2 h-5 w-5" />
                Les våre vilkår
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ GDPR-kompatibel ✓ Norsk datalagring ✓ Full transparens
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}