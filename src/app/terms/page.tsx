import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import { FAQItem } from '@/components/ui/faq-item'
import {
  FileText,
  Shield,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Clock,
  Lock,
  Globe,
  Mail,
  Download,
  Scale,
  UserX,
  Gavel
} from 'lucide-react'

export default function TermsPage() {
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
              Vilkår og betingelser
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Våre{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                vilkår
              </span>{' '}
              og betingelser
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              Her finner du alle vilkår og betingelser for bruk av EvoPhisher.
              Vi har gjort vårt beste for å gjøre dem klare og forståelige.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="#key-terms">
                  Se hovedpunktene
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

      {/* Key Terms Overview */}
      <section id="key-terms" className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hovedpunkter i våre vilkår
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              De viktigste punktene du bør vite om når du bruker EvoPhisher
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Bruk av tjenesten</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Du må være over 18 år og representere en legitim organisasjon.
                  Tjenesten skal kun brukes til cybersikkerhetstrening.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Betaling og fakturering</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Månedlig eller årlig fakturering. Priser eksklusiv moms.
                  14 dagers gratis prøveperiode uten bindinger.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Ansvar og begrensninger</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Vi leverer tjenesten "som den er" og kan ikke holdes ansvarlige
                  for indirekte skader eller tap.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Konfidensialitet</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Begge parter forplikter seg til å holde konfidensielle
                  opplysninger hemmelig.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Oppsigelse</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Begge parter kan si opp avtalen med 30 dagers varsel.
                  Ingen bindingstid utover første måned.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Gjeldende lov</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Avtalen er underlagt norsk lov og eventuelle tvister
                  behandles av norske domstoler.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Detaljerte vilkår
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fullstendig oversikt over alle vilkår og betingelser
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  1. Definisjoner og tolkninger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p><strong>"Tjenesten"</strong> refererer til EvoPhisher-plattformen og alle tilhørende tjenester.</p>
                <p><strong>"Kunden"</strong> refererer til organisasjonen eller personen som bruker tjenesten.</p>
                <p><strong>"Leverandøren"</strong> refererer til EvoPhisher AS, organisasjonsnummer 123 456 789.</p>
                <p><strong>"Persondata"</strong> har samme betydning som definert i GDPR.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  2. Bruk av tjenesten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Ved å bruke tjenesten samtykker du til å:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kun bruke tjenesten til legitime cybersikkerhetstrening</li>
                  <li>Ikke misbruke eller forsøke å hacke systemet</li>
                  <li>Ikke dele tilgangsopplysninger med uautoriserte personer</li>
                  <li>Overholde alle gjeldende lover og forskrifter</li>
                  <li>Respektere andre brukeres rettigheter og personvern</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                  3. Betaling og fakturering
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Alle priser er oppgitt eksklusive merverdiavgift (moms) med mindre annet er oppgitt.</p>
                <p>Fakturering skjer månedlig eller årlig avhengig av valgt plan. Betaling forfaller innen 14 dager.</p>
                <p>Ved forsinket betaling kan vi suspendere tilgangen til tjenesten etter skriftlig varsel.</p>
                <p>Priser kan endres med 60 dagers skriftlig varsel. Eksisterende kunder får 90 dager til å akseptere eller si opp.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  4. Ansvar og begrensninger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Tjenesten leveres "som den er" uten garantier av noe slag, verken uttrykkelige eller underforståtte.</p>
                <p>Vi kan ikke garantere at tjenesten vil være feilfri, sikker eller tilgjengelig til enhver tid.</p>
                <p>Vårt maksimale ansvar er begrenset til beløpet betalt for tjenesten de siste 12 månedene.</p>
                <p>Vi er ikke ansvarlige for indirekte, spesielle eller følgeskader av noe slag.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <UserX className="h-6 w-6 text-primary" />
                  5. Oppsigelse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Du kan si opp abonnementet når som helst med 30 dagers skriftlig varsel.</p>
                <p>Vi kan si opp avtalen umiddelbart ved brudd på vilkårene eller forsinket betaling.</p>
                <p>Ved oppsigelse mister du tilgang til alle data etter 90 dager, med mindre annet er avtalt.</p>
                <p>Refusjon gis kun i spesielle tilfeller etter individuell vurdering.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Gavel className="h-6 w-6 text-primary" />
                  6. Gjeldende lov og verneting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Denne avtalen er underlagt og skal tolkes i henhold til norsk lov.</p>
                <p>Eventuelle tvister skal løses gjennom forhandlinger. Hvis dette ikke lykkes, skal tvisten avgjøres ved ordinære domstoler.</p>
                <p>Oslo tingrett er eksklusivt verneting for alle tvister relatert til denne avtalen.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Acceptable Use */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Akseptabel bruk
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Retningslinjer for riktig og ansvarlig bruk av EvoPhisher
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
                <CardTitle className="text-xl text-green-700">Tillatt bruk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cybersikkerhetstrening av egne ansatte</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Testing av sikkerhetsbevissthet</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Utdanning og opplæring</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Forskning og analyse (med samtykke)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Compliance-testing</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
                <CardTitle className="text-xl text-red-700">Forbudt bruk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span>Ekte phishing-angrep eller svindel</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span>Testing uten samtykke fra målgruppen</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span>Deling av tilgang med tredjepart</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span>Forsøk på å hacke systemet</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span>Brudd på personvernlover</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="border-0 shadow-sm max-w-2xl mx-auto">
              <CardContent className="p-6">
                <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Viktig merknad</h3>
                <p className="text-muted-foreground">
                  Brudd på disse retningslinjene kan føre til umiddelbar suspensjon av kontoen
                  og juridiske konsekvenser. Kontakt oss hvis du er usikker på om din bruk er akseptabel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ofte stilte spørsmål om vilkår
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Svar på vanlige spørsmål om våre vilkår og betingelser
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Kan jeg avbryte abonnementet når som helst?"
              answer="Ja, du kan avbryte abonnementet når som helst med 30 dagers skriftlig varsel. Det er ingen bindingstid utover første måned, og du beholder tilgang til tjenesten til utløp av betalingsperioden."
            />

            <FAQItem
              question="Hva skjer hvis jeg ikke betaler regningen i tide?"
              answer="Ved forsinket betaling sender vi først en betalingspåminnelse. Hvis betalingen fortsatt uteblir etter 14 dager, kan vi suspendere tilgangen til tjenesten. Ved betaling gjenopprettes tilgangen umiddelbart."
            />

            <FAQItem
              question="Kan dere endre vilkårene uten varsel?"
              answer="Nei, vi endrer aldri vilkårene uten forhåndsvarsel. Ved vesentlige endringer gir vi minst 60 dagers skriftlig varsel, og du har rett til å si opp avtalen hvis du ikke aksepterer endringene."
            />

            <FAQItem
              question="Er jeg ansvarlig hvis ansatte misbruker systemet?"
              answer="Som kunde er du ansvarlig for å sikre at alle brukere overholder vilkårene. Vi anbefaler å informere ansatte om akseptabel bruk og å ha interne retningslinjer for bruk av tjenesten."
            />

            <FAQItem
              question="Hva er deres ansvar ved systemnedetid?"
              answer="Vi jobber for høyest mulig oppetid, men kan ikke garantere 100% tilgjengelighet. Ved planlagt vedlikehold varsles det i forkant. Ved uplanlagte nedetider arbeider vi raskt for å gjenopprette tjenesten, men vi gir ikke kompensasjon for kortvarige avbrudd."
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <Card className="border-0 shadow-sm max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Spørsmål om vilkårene?</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Hvis du har spørsmål om våre vilkår og betingelser eller trenger juridisk
                avklaring, kan du kontakte vårt juridiske team. Vi hjelper gjerne med å
                forklare eventuelle uklarheter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="mailto:legal@evophisher.no">
                    <Mail className="mr-2 h-4 w-4" />
                    Kontakt juridisk team
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Generell kontakt
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
              Klar til å komme i gang?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Ved å registrere deg godtar du våre vilkår og betingelser.
              Start din gratis prøveperiode i dag.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Godta vilkår og start
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                <FileText className="mr-2 h-5 w-5" />
                Les personvernpolicy
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ Transparente vilkår ✓ Ingen skjulte gebyrer ✓ Norsk juridisk ramme
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}