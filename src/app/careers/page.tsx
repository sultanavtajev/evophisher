import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import { FAQItem } from '@/components/ui/faq-item'
import {
  Users,
  Heart,
  Coffee,
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Globe,
  Award,
  Code,
  Shield,
  Headphones,
  PieChart,
  Rocket,
  Target,
  Star,
  CheckCircle
} from 'lucide-react'

export default function CareersPage() {
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
              Bli en del av teamet
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Bygg{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                fremtiden
              </span>{' '}
              for cybersikkerhet
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              Bli med oss på reisen for å gjøre cybersikkerhet tilgjengelig for alle.
              Vi søker lidenskapelige mennesker som vil gjøre en forskjell.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="#open-positions">
                  Se ledige stillinger
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Møt teamet
              </Button>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in-up">
              ✓ Konkurransedyktige lønninger ✓ Fleksible arbeidsforhold ✓ Innovative prosjekter
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hvorfor jobber folk hos oss?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi tror på å skape et arbeidsmiljø hvor alle kan blomstre og gjøre sitt beste arbeid
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Rocket className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Innovasjon og vekst</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Arbeid med banebrytende teknologi og vær med på å forme fremtiden
                  for cybersikkerhet i Norge og resten av verden.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Flott arbeidskultur</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Vi verdsetter åpenhet, samarbeid og respekt. Teamet vårt
                  er vårt viktigste konkurransefortrinn.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Karriereutvikling</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Kontinuerlig læring og utvikling med dedikert budget for
                  kurs, konferanser og sertifiseringer.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Fleksibel arbeidsdag</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Hybrid arbeidsmodell med mulighet for hjemmekontor.
                  Vi fokuserer på resultater, ikke timer.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Konkurransedyktige fordeler</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Omfattende fordeler inkludert pensjon, forsikring,
                  treningsstøtte og teambuilding-aktiviteter.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Meningsfylt arbeid</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Bidra til å beskytte norske bedrifter mot cybertrusler
                  og gjør en reell forskjell i samfunnet.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Våre fordeler og goder
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi investerer i våre ansatte fordi vi vet at glade medarbeidere skaper de beste resultatene
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fleksible arbeidsforhold</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Hybrid arbeidsmodell med mulighet for 60% hjemmekontor. Fleksibel arbeidstid
                    mellom 07:00-18:00 så lenge du dekker kjernetiden 09:00-15:00.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Læring og utvikling</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Kr 25,000 årlig i kompetansebudsjett per ansatt. Deltakelse på konferanser,
                    online kurs og sertifiseringer fullfinansiert av bedriften.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Helse og velvære</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Utvidet helseforsikring, treningsstøtte på kr 5,000 årlig,
                    massasje på kontoret og mentale helsetjenester.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Moderne arbeidssted</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sentralt kontor i Oslo med alle moderne fasiliteter, åpen kontorlandskap,
                    stille soner og fullstendig utstyrt kjøkken.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Økonomiske fordeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Konkurransedyktig lønn med årlig justering</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Bonusordning basert på selskapsresultater</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Pensjonssparing 7% (2% egeninnskudd + 5% arbeidsgiver)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Telefon, laptop og nødvendig utstyr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Fri internett hjemme opp til kr 500/måned</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Kollektivtransport eller parkering dekket</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>5 uker ferie + fellesfridager</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ledige stillinger
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi vokser raskt og søker talentfulle mennesker til vårt team
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Senior Frontend Utvikler</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        Utvikling
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Oslo/Hybrid
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Heltid
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Søk nå</Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Vi søker en erfaren frontend-utvikler til å bygge brukergrensesnitt for vår
                  cybersikkerhetsplattform. Du vil jobbe med React, TypeScript og moderne verktøy.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">TypeScript</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Next.js</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Tailwind CSS</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Cybersikkerhet Spesialist</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        Sikkerhet
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Oslo/Hybrid
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Heltid
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Søk nå</Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Bli med vårt sikkerhetsteam og hjelp bedrifter med å forbedre sin cybersikkerhet.
                  Du vil jobbe med phishing-simulasjoner og sikkerhetsanalyse.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Penetrasjonstesting</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">CISSP</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Incident Response</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Customer Success Manager</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Headphones className="h-4 w-4" />
                        Kundesuksess
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Oslo/Hybrid
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Heltid
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Søk nå</Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Hjelp våre enterprise-kunder med å få maksimal verdi av plattformen.
                  Du vil bygge sterke relasjoner og drive kundetilfredshet.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Kundeservice</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">B2B SaaS</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Norsk</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Engelsk</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Data Analyst</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <PieChart className="h-4 w-4" />
                        Analyse
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Oslo/Remote
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Heltid
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Søk nå</Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Analyser store datamengder for å gi innsikt i cybersikkerhetstrender
                  og forbedre våre produkter og tjenester.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">SQL</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Tableau</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Machine Learning</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Ser du ikke en stilling som passer deg? Vi er alltid interessert i å høre fra talentfulle personer.
            </p>
            <Button variant="outline" size="lg">
              Send oss din CV
            </Button>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Våre verdier i praksis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Våre verdier styrer hvordan vi jobber sammen og behandler hverandre
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Star className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Kvalitet først</CardTitle>
                <CardDescription>
                  Vi leverer ikke bare kode - vi leverer løsninger som endrer liv.
                  Kvalitet er ikke noe vi legger til etterpå, det er fundamentet i alt vi gjør.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Team over individ</CardTitle>
                <CardDescription>
                  Vi vinner sammen eller taper sammen. Samarbeid og åpen kommunikasjon
                  gjør oss sterkere som team.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm text-center">
              <CardHeader>
                <Rocket className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle>Kontinuerlig forbedring</CardTitle>
                <CardDescription>
                  Vi søker alltid etter måter å bli bedre på. Læring og utvikling
                  er en del av hverdagen, ikke bare en bonus.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ofte stilte spørsmål
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Svar på vanlige spørsmål om å jobbe hos EvoPhisher
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Hvordan er søknadsprosessen?"
              answer="Vår prosess består av en første telefonsamtale, teknisk intervju/case (avhengig av rolle), og et kulturelt møte med teamet. Vi gir tilbakemelding på alle trinn og hele prosessen tar typisk 2-3 uker."
            />

            <FAQItem
              question="Tilbyr dere mulighet for hjemmekontor?"
              answer="Ja! Vi har en hybrid arbeidsmodell hvor du kan jobbe hjemmefra opptil 3 dager i uken. Vi har også fullt remote-stillinger for enkelte roller som ikke krever daglig tilstedeværelse på kontoret."
            />

            <FAQItem
              question="Hvordan støtter dere faglig utvikling?"
              answer="Alle ansatte har et årlig kompetansebudsjett på kr 25,000 for kurs, konferanser og sertifiseringer. Vi oppmuntrer også til interne kunnskapsdeling og har faste tech talks hver måned."
            />

            <FAQItem
              question="Hva er forventningene til erfaring?"
              answer="Det varierer per rolle, men vi verdsetter entusiasme og lærevillighet like høyt som erfaring. For seniorroller forventer vi 5+ års relevant erfaring, mens for junior-stillinger er 1-2 år ofte nok."
            />

            <FAQItem
              question="Hvordan er arbeidsmiljøet?"
              answer="Vi har en åpen og inkluderende kultur hvor alle stemmer høres. Vi verdsetter work-life balance og har fleksible arbeidsordninger. Teambuilding, sosiale arrangement og felles lunsjer er viktige deler av hverdagen."
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
              Klar til å bli en del av teamet?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Vi ser frem til å høre fra deg! Send oss din søknad eller ta kontakt
              hvis du har spørsmål om karrieremuligheter hos EvoPhisher.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6">
                <Briefcase className="mr-2 h-5 w-5" />
                Se alle stillinger
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                Send spontansøknad
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ Rask tilbakemelding ✓ Transparent prosess ✓ Åpen for mangfold
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}