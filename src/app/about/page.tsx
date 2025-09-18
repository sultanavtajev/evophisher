import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import {
  Shield,
  Users,
  Target,
  Award,
  ArrowRight,
  MapPin,
  Calendar,
  TrendingUp,
  Globe,
  Heart,
  Lightbulb,
  Zap
} from 'lucide-react'

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />

        <div className="container mx-auto text-center relative max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Heart className="h-4 w-4" />
              Vår historie og misjon
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Vi bygger{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                tryggere
              </span>{' '}
              digitale arbeidsplasser
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              EvoPhisher ble grunnlagt med en visjon om å gjøre cybersikkerhet tilgjengelig
              og forståelig for alle bedrifter, uansett størrelse eller bransje.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="/contact">
                  Kom i kontakt med oss
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Møt teamet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Vår misjon
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Vi tror at cybersikkerhet ikke skal være forbeholdt store selskaper med store IT-budsjetter.
                Vår misjon er å demokratisere tilgangen til profesjonell phishing-testing og gjøre det
                enkelt for alle bedrifter å beskytte seg mot cybertrusler.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2019</div>
                  <div className="text-sm text-muted-foreground">Grunnlagt</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Bedrifter</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Ansatte trent</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <Lightbulb className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Innovasjon</CardTitle>
                  <CardDescription>
                    Vi utvikler kontinuerlig nye metoder for å gjøre cybersikkerhet mer effektivt og tilgjengelig.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Sikkerhet først</CardTitle>
                  <CardDescription>
                    All utvikling skjer med sikkerhet som hovedprioritet, og vi følger de høyeste standardene.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Kundefokus</CardTitle>
                  <CardDescription>
                    Våre kunder står i sentrum av alt vi gjør, og deres suksess er vår suksess.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <Globe className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Tilgjengelighet</CardTitle>
                  <CardDescription>
                    Vi jobber for å gjøre cybersikkerhet tilgjengelig for alle, uansett størrelse eller budsjett.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vår reise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fra en idé til Norges ledende phishing-testplattform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2019 - Grunnleggelsen</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    EvoPhisher ble grunnlagt av et team av cybersikkerhetseksperter som så behovet
                    for bedre og mer tilgjengelige phishing-testverktøy i det norske markedet.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2020 - Første versjon</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lansering av den første versjonen av plattformen med grunnleggende
                    phishing-testfunksjonalitet og rapportering.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2021 - Rask vekst</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Oppnådde 100+ bedriftskunder og lanserte avanserte rapporteringsverktøy
                    og automatiserte kampanjefunksjoner.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2022 - Anerkjennelse</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Mottok "Beste Cybersikkerhetsløsning" prisen på Norwegian Tech Awards
                    og utvidet til 300+ bedriftskunder.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2023 - Ekspansjon</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lanserte API-integrasjoner og enterprise-funksjoner. Nådde 500+ bedrifter
                    og etablerte partnerskaper med ledende IT-sikkerhetsleverandører.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2024 - Fremtiden</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fortsetter å innovere med AI-drevne phishing-tester og utvidet
                    nordisk tilstedeværelse. Målet er å nå 1000+ bedriftskunder innen årets slutt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Basert i Oslo, tjener hele Norge
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Hovedkontoret vårt ligger i hjertet av Oslo, men vi betjener bedrifter
                over hele Norge. Med norsk support og forståelse for lokale behov,
                er vi den foretrukne partneren for norske bedrifter.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">EvoPhisher AS</div>
                  <div className="text-muted-foreground">Storgata 123, 0001 Oslo</div>
                </div>
              </div>
              <Button asChild>
                <Link href="/contact">
                  Besøk oss
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support tilgjengelig</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Norsk eid</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">GDPR</div>
                    <div className="text-sm text-muted-foreground">Kompatibel</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">ISO</div>
                    <div className="text-sm text-muted-foreground">27001 sertifisert</div>
                  </div>
                </div>
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
              Vil du være en del av vår reise?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Vi søker alltid etter talentfulle personer som deler vår passion
              for cybersikkerhet og kundeservice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6" asChild>
                <Link href="/careers">
                  Se ledige stillinger
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                Kontakt oss
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}