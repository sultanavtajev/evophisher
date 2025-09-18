import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import {
  Shield,
  Users,
  BarChart3,
  Clock,
  Lock,
  CheckCircle,
  ArrowRight,
  Mail,
  Target,
  TrendingUp,
  Globe,
  Zap,
  FileText,
  Settings,
  Eye,
  AlertTriangle,
  Smartphone,
  Monitor,
  Database,
  Cloud,
  MessageSquare,
  Calendar,
  Download,
  Filter
} from 'lucide-react'

export default function FeaturesPage() {
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
              Komplett phishing-testplattform
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Kraftige funksjoner for{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                cybersikkerhet
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              Utforsk alle funksjonene som gjør EvoPhisher til Norges mest avanserte
              plattform for phishing-testing og sikkerhetstrening.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Prøv alle funksjoner gratis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Se demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kjernefunksjoner
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Alt du trenger for effektiv phishing-testing og sikkerhetstrening
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Realistiske phishing-tester</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Profesjonelle phishing-simulasjoner som etterligner reelle cybertrusler.
                  Tilpassbare maler for alle bransjer og risikonivåer.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Ansatthåndtering</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Enkelt administrer alle ansatte, grupper og avdelinger.
                  Spor individuelle fremgang og identifiser treningsbehov.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Avanserte rapporter</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Detaljerte analyser og innsikt i organisasjonens sårbarheter.
                  Eksporter data i multiple formater for videre analyse.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Automatiserte kampanjer</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Planlegg og kjør regelmessige phishing-tester automatisk.
                  Tilpassbare tidsplaner og frekvens for optimal trening.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Sikkerhet og personvern</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  GDPR-kompatibel datahåndtering med høyeste sikkerhetsstandarder.
                  All data krypteres og lagres sikkert i Norge.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Enkel implementering</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Kom i gang på minutter med vår intuitive grensesnitt.
                  Omfattende onboarding og norsk kundesupport.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Avanserte funksjoner
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kraftige verktøy for dybdegående sikkerhetstrening og analyse
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multispråklig støtte</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Phishing-tester på norsk, engelsk og andre språk.
                    Tilpass innhold til din organisasjons språkbehov.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sanntidsovervåking</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Live dashboard med sanntidsdata om kampanjeresultater.
                    Få umiddelbare varslinger om kritiske hendelser.
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
                  <h3 className="text-xl font-semibold mb-2">Tilpassbare maler</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lag egne phishing-maler eller tilpass eksisterende.
                    Bransjespesifikke maler for maksimal relevans.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">API-integrasjon</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Robust REST API for integrasjon med eksisterende systemer.
                    Automatiser prosesser og synkroniser data.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Detaljert sporing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Spor hver interaksjon med phishing-e-poster.
                    Se nøyaktig når og hvordan ansatte responderer.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Risikovurdering</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Automatisk vurdering av organisasjonens risikonivå.
                    Få anbefalinger for forbedring av sikkerhetsholdning.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mobiltilpasset</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fullt responsiv plattform som fungerer perfekt på alle enheter.
                    Test og administrer fra hvor som helst.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Monitor className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dashboard-integrasjon</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Integrer med eksisterende sikkerhetsdashboards.
                    Sentralisert visning av alle sikkerhetsmetriker.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tekniske spesifikasjoner
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Robuste tekniske funksjoner for bedrifter som krever det beste
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Database className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Skalerbar arkitektur</CardTitle>
                <CardDescription>
                  Håndterer fra 10 til 100,000+ ansatte. Cloud-basert infrastruktur som skalerer automatisk.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Cloud className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>99.9% oppetid</CardTitle>
                <CardDescription>
                  Høy tilgjengelighet med redundante systemer. Automatisk backup og disaster recovery.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Sanntids-notifikasjoner til eksterne systemer. Automatiser workflows og integrasjoner.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Avansert planlegging</CardTitle>
                <CardDescription>
                  Komplekse kampanjeplaner med betingelser. Tidssoner og arbeidskalender-støtte.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Reporting Features */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rapportering og analyse
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Få dype innsikter i organisasjonens sikkerhetsstatus
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Download className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Eksportfunksjoner</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    PDF-rapporter for ledelsen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Excel-filer for dataanalyse
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    CSV-eksport for integrasjoner
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    JSON API-data
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Trendanalyse</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Historiske trender
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Forbedringssporing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Benchmarking mot bransjen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Prediktiv analyse
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Filter className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Tilpassede visninger</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Avdeling-spesifikke rapporter
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Tilpassbare dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Rolle-baserte visninger
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Interaktive grafer
                  </li>
                </ul>
              </CardContent>
            </Card>
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
              Utforsk alle funksjoner i dag
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Få tilgang til alle avanserte funksjoner med vår gratis prøveperiode.
              Ingen begrensninger, full funksjonalitet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Start din gratis prøveperiode
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                Book personlig demo
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ Alle funksjoner inkludert ✓ 14 dager gratis ✓ Norsk support
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}