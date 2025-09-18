import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import { FAQItem } from '@/components/ui/faq-item'
import {
  Shield,
  Lock,
  Eye,
  Server,
  CheckCircle,
  ArrowRight,
  FileText,
  Key,
  Database,
  Cloud,
  UserCheck,
  AlertTriangle,
  Award,
  Globe,
  Zap,
  Monitor
} from 'lucide-react'

export default function SecurityPage() {
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
              Sikkerhet du kan stole på
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Dine data er{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                100% sikre
              </span>{' '}
              hos oss
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              Vi tar datasikkerhet på største alvor. Lær om våre omfattende
              sikkerhetstiltak og hvordan vi beskytter din bedrifts sensitive informasjon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="/contact">
                  Kontakt sikkerhetsteamet
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <FileText className="mr-2 h-5 w-5" />
                Last ned sikkerhetsdokument
              </Button>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in-up">
              ✓ ISO 27001 sertifisert ✓ GDPR-kompatibel ✓ Norsk datalagring
            </p>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sikkerhet på alle nivåer
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fra infrastruktur til applikasjon - vi implementerer sikkerhet i hver del av systemet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Cloud className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Infrastruktursikkerhet</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Hosting i sikre datasentre i Norge med fysisk sikkerhet,
                  redundans og 24/7 overvåking av all infrastruktur.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Datakryptering</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  All data krypteres med AES-256 standard både i hvile og under transport.
                  End-to-end kryptering sikrer at kun autoriserte personer har tilgang.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <UserCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Tilgangskontroll</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Rollebasert tilgangskontroll med multifaktor-autentisering
                  og prinsippet om minste tilgang for alle systemkomponenter.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Monitor className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Kontinuerlig overvåking</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  24/7 sikkerheetsovervåking med automatisk trusseldeteksjon
                  og umiddelbar respons på alle sikkerhetshendelser.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Backup og gjenoppretting</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Automatiske, krypterte backups med testing av gjenopprettingsprosedyrer
                  og geografisk distribuerte kopier.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Logging og revisjon</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Omfattende logging av alle systemaktiviteter med
                  manipuleringssikre logger for fullstendig sporbarhet.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sertifiseringer og compliance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi overholder de strengeste sikkerhetsstandardene og reguleringskravene
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">ISO 27001:2013</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sertifisert etter den internasjonale standarden for informasjonssikkerhet.
                    Årlige revisjoner sikrer kontinuerlig forbedring av våre prosesser.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">GDPR-kompatibel</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Full overholdelse av EU's personvernforordning med innebygd
                    personvern og dataportabilitet.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">SOC 2 Type II</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Uavhengig verifikasjon av våre sikkerhetskontroller gjennom
                    omfattende tredjepartsrevisjon.
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
                  <h3 className="text-xl font-semibold mb-2">Norsk personvernlov</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Overholder alle krav i norsk personvernlovgivning med
                    datalagring eksklusivt på norsk territorium.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Sikkerhetsprosesser</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Regelmessige penetrasjonstester</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Kvartalsvise sikkerhetsrevisjoner</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Kontinuerlig sårbarhetsscanning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Oppdatert incident response plan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Ansatttrening i cybersikkerhet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Zero-trust nettverksarkitektur</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hvordan vi beskytter dine data
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Detaljert oversikt over våre databeskyttelsestiltak
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Key className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Krypteringsnøkler</CardTitle>
                <CardDescription>
                  Alle krypteringsnøkler roteres regelmessig og lagres i dedikerte hardware security modules (HSM).
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Server className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Datasenter</CardTitle>
                <CardDescription>
                  Tier 3+ datasenter i Norge med biometrisk tilgangskontroll og 24/7 fysisk sikkerhet.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Nettverk</CardTitle>
                <CardDescription>
                  Avanserte brannmurer, DDoS-beskyttelse og nettverkssegmentering for maksimal sikkerhet.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Incident Response</CardTitle>
                <CardDescription>
                  Dedikert sikkerhetsteam med 15-minutters responstid på kritiske sikkerhetshendelser.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Security FAQ */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ofte stilte spørsmål om sikkerhet
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Svar på de mest vanlige spørsmålene om vår sikkerhet
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Hvor lagres dataene mine?"
              answer="All data lagres eksklusivt i sikre datasentre på norsk territorium. Vi bruker ikke cloud-tjenester utenfor Norge for datalagring, og all kommunikasjon krypteres med TLS 1.3."
            />

            <FAQItem
              question="Hvem har tilgang til mine data?"
              answer="Kun autorisert personell med relevant behov har tilgang til kundedata. All tilgang logges og overvåkes. Vi har strenge retningslinjer for databehandling og alle ansatte signerer taushetserklæringer."
            />

            <FAQItem
              question="Hvordan håndterer dere databrudder?"
              answer="Vi har en omfattende incident response plan som aktiveres umiddelbart ved mistanke om databrudd. Kunder varsles innen 24 timer, og vi samarbeider med relevante myndigheter i henhold til GDPR-kravene."
            />

            <FAQItem
              question="Kan jeg få mine data slettet?"
              answer="Ja, du har full kontroll over dine data. Du kan be om sletting av alle data gjennom vår plattform eller ved å kontakte support. Sletting skjer innen 30 dager etter forespørsel."
            />

            <FAQItem
              question="Hvilke sikkerhetstester gjennomfører dere?"
              answer="Vi gjennomfører kvartalsvise penetrasjonstester, månedlige sårbarhetsscanning, og årlige eksterne sikkerhetsrevisjoner. Alle kritiske sårbarheter adresseres innen 24 timer."
            />
          </div>
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
              Trygg på våre sikkerhetstiltak?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start din gratis prøveperiode i dag og opplev selv hvor sikkert
              og pålitelig EvoPhisher er for din bedrift.
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
                Last ned sikkerhetsdokument
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ Ingen kredittkort påkrevd ✓ 14 dagers gratis tilgang ✓ Fullt sikker testing
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}