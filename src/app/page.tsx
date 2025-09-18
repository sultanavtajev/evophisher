import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import { FAQItem } from '@/components/ui/faq-item'
import { Shield, Users, BarChart3, Clock, Lock, CheckCircle, ArrowRight, Mail, Target, TrendingUp, Star, Quote } from 'lucide-react'

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />

        <div className="container mx-auto text-center relative max-w-7xl">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Shield className="h-4 w-4" />
              Norges ledende phishing-testplattform
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Styrk bedriftens{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                cybersikkerhet
              </span>{' '}
              med realistiske phishing-tester
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              Test og træn dine ansattes evne til å gjenkjenne phishing-angrep.
              Få innsikt i sårbarheter og bygg en sterkere sikkerhetskultur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Start gratis prøveperiode
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <div className="flex items-center gap-2">
                  Se demo
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in-up">
              ✓ Ingen kredittkort påkrevd ✓ 14 dagers gratis prøveperiode ✓ Oppstart på under 5 minutter
            </p>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-8 h-8 bg-secondary/20 rounded-full animate-float-delayed" />
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent/15 rounded-full animate-float" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Alt du trenger for effektiv sikkerhetstrening
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vår plattform gir deg verktøyene for å teste, analysere og forbedre
              dine ansattes bevissthet rundt cybertrusler.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Realistiske simulering</CardTitle>
                <CardDescription>
                  Professionelle phishing-tester som etterligner reelle trusler
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Enkel ansatthåndtering</CardTitle>
                <CardDescription>
                  Administrer alle dine ansatte og deres treningsstatus på ett sted
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Detaljerte rapporter</CardTitle>
                <CardDescription>
                  Få innsikt i resultater og identifiser områder for forbedring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Automatiserte kampanjer</CardTitle>
                <CardDescription>
                  Sett opp regelmessige tester som kjører automatisk
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Lock className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Sikker og privat</CardTitle>
                <CardDescription>
                  All data behandles i henhold til GDPR og høyeste sikkerhetsstandarder
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Enkel implementering</CardTitle>
                <CardDescription>
                  Kom i gang på minutter med vår intuitive grensesnitt
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Slik fungerer det
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              En enkel tre-stegs prosess for å implementere effektiv sikkerhetstrening
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sett opp kampanje</h3>
              <p className="text-muted-foreground leading-relaxed">
                Velg fra våre forhåndsdefinerte phishing-maler eller lag dine egne tilpassede tester som passer din bedrift.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Send til ansatte</h3>
              <p className="text-muted-foreground leading-relaxed">
                Distribuer sikre phishing-tester til dine ansatte og overvåk deres responser i sanntid.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Analyser resultater</h3>
              <p className="text-muted-foreground leading-relaxed">
                Få detaljerte rapporter og innsikt for å forbedre sikkerhetsrutiner og identifisere treningsbehov.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto text-center max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Bedrifter stoler på EvoPhisher
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-lg text-muted-foreground">Bedrifter beskyttet</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-lg text-muted-foreground">Ansatte trent</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-lg text-muted-foreground">Forbedret sikkerhet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hva kundene våre sier
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bedrifter over hele Norge bruker EvoPhisher for å styrke sin cybersikkerhet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "EvoPhisher har virkelig endret måten vi tenker på cybersikkerhet. Våre ansatte er nå mye mer oppmerksomme på phishing-forsøk."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">MH</span>
                  </div>
                  <div>
                    <div className="font-semibold">Magnus Hansen</div>
                    <div className="text-sm text-muted-foreground">IT-sjef, TechCorp AS</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Implementeringen var smertefri og resultatene var synlige allerede etter første kampanje. Anbefales på det sterkeste!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">LK</span>
                  </div>
                  <div>
                    <div className="font-semibold">Lisa Karlsen</div>
                    <div className="text-sm text-muted-foreground">CISO, SecureBank</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Rapportene er fantastiske og gir oss eksakt den innsikten vi trenger for å forbedre vår sikkerhetskultur."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">PA</span>
                  </div>
                  <div>
                    <div className="font-semibold">Per Andersen</div>
                    <div className="text-sm text-muted-foreground">Sikkerhetsleder, DataFlow</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ofte stilte spørsmål
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Alt du trenger å vite om EvoPhisher
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Hvor sikre er phishing-testene?"
              answer="Alle våre phishing-tester er helt sikre og inneholder ingen skadelig kode. De er designet utelukkende for opplæring og testing, og all data håndteres i henhold til GDPR."
            />

            <FAQItem
              question="Kan jeg tilpasse phishing-malene?"
              answer="Ja! Du kan velge fra våre forhåndsdefinerte maler eller lage helt egne tilpassede phishing-tester som passer din bedrifts spesifikke behov og bransje."
            />

            <FAQItem
              question="Hvor ofte bør vi kjøre phishing-tester?"
              answer="Vi anbefaler månedlige eller kvartalsvise tester avhengig av din bedrifts risikoprofil. Vår plattform støtter automatiserte kampanjer som kan settes opp til å kjøre regelmessig."
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
              Klar til å styrke din cybersikkerhet?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Bli med tusenvis av bedrifter som bruker EvoPhisher for å beskytte seg mot cybertrusler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Start din gratis prøveperiode
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                Snakk med ekspert
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ Oppstart på 5 minutter ✓ Ingen bindingstid ✓ Norsk support
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
