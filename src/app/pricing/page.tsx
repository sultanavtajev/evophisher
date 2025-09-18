import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import { FAQItem } from '@/components/ui/faq-item'
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Building2,
  Zap,
  Crown,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Clock,
  X
} from 'lucide-react'

export default function PricingPage() {
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
              Enkel og transparent prising
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Velg planen som passer{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                din bedrift
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              Transparent prising uten skjulte kostnader. Start gratis og oppgrader
              når du er klar til å skalere din cybersikkerhet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Start gratis i dag
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Se demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in-up">
              ✓ Ingen kredittkort påkrevd ✓ 14 dagers gratis prøveperiode ✓ Avbryt når som helst
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Priser som vokser med bedriften din
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fra små team til store organisasjoner - vi har en plan som passer alle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-2 border-border hover:border-primary/50 transition-all duration-300 relative">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <CardDescription className="text-base">
                  Perfekt for små team som vil komme i gang
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">Kr 99</div>
                  <div className="text-muted-foreground">per ansatt/måned</div>
                  <div className="text-sm text-muted-foreground mt-1">Minimum 10 ansatte</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Opptil 50 ansatte</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Månedlige phishing-kampanjer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Grunnleggende rapporter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>E-post support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>5 phishing-maler</span>
                  </div>
                </div>
                <Button className="w-full mt-8" asChild>
                  <Link href="/auth/signup?plan=starter">
                    Start gratis prøveperiode
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-2 border-primary shadow-lg relative scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Mest populær
                </div>
              </div>
              <CardHeader className="text-center pb-8 pt-12">
                <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription className="text-base">
                  For voksende bedrifter med høyere sikkerhetskrav
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">Kr 149</div>
                  <div className="text-muted-foreground">per ansatt/måned</div>
                  <div className="text-sm text-muted-foreground mt-1">Minimum 25 ansatte</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Opptil 500 ansatte</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Ukentlige phishing-kampanjer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Avanserte rapporter og analyser</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Prioritert e-post og chat support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>20+ phishing-maler</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Tilpassede maler</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>API-tilgang</span>
                  </div>
                </div>
                <Button className="w-full mt-8" asChild>
                  <Link href="/auth/signup?plan=professional">
                    Start gratis prøveperiode
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-border hover:border-primary/50 transition-all duration-300 relative">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-4">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription className="text-base">
                  For store organisasjoner med komplekse behov
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">Tilpasset</div>
                  <div className="text-muted-foreground">kontakt oss for pris</div>
                  <div className="text-sm text-muted-foreground mt-1">500+ ansatte</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Ubegrenset antall ansatte</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Daglige kampanjer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Tilpassede dashboards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Dedikert kundesuksess manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Ubegrenset maler og tilpasninger</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Avansert API og integrasjoner</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>On-premise deployment</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-8">
                  Kontakt salg
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sammenlign alle funksjoner
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Se nøyaktig hva som er inkludert i hver plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Funksjoner</th>
                  <th className="text-center p-4 font-semibold">Starter</th>
                  <th className="text-center p-4 font-semibold">Professional</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium">Antall ansatte</td>
                  <td className="p-4 text-center">Opptil 50</td>
                  <td className="p-4 text-center">Opptil 500</td>
                  <td className="p-4 text-center">Ubegrenset</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-4 font-medium">Phishing-kampanjer</td>
                  <td className="p-4 text-center">Månedlig</td>
                  <td className="p-4 text-center">Ukentlig</td>
                  <td className="p-4 text-center">Daglig</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Phishing-maler</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center">20+</td>
                  <td className="p-4 text-center">Ubegrenset</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-4 font-medium">Tilpassede maler</td>
                  <td className="p-4 text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">API-tilgang</td>
                  <td className="p-4 text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-4 font-medium">Support</td>
                  <td className="p-4 text-center">E-post</td>
                  <td className="p-4 text-center">E-post + Chat</td>
                  <td className="p-4 text-center">Dedikert manager</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ofte stilte spørsmål om priser
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Alt du lurer på om våre priser og planer
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Kan jeg endre plan når som helst?"
              answer="Ja! Du kan oppgradere eller nedgradere planen din når som helst. Endringer trer i kraft ved neste faktureringsperiode."
            />

            <FAQItem
              question="Hva skjer hvis jeg overskrider antall ansatte?"
              answer="Vi varsler deg på forhånd hvis du nærmer deg grensen. Du kan enkelt oppgradere til en høyere plan eller vi kan tilby fleksible løsninger for din situasjon."
            />

            <FAQItem
              question="Tilbyr dere rabatter for årlige abonnement?"
              answer="Ja! Vi tilbyr 20% rabatt på alle planer ved årlig forhåndsbetaling. Kontakt oss for mer informasjon om årlige avtaler."
            />

            <FAQItem
              question="Er det noen oppstartskostnader?"
              answer="Nei, det er ingen oppstartskostnader eller skjulte gebyrer. Du betaler kun den månedlige prisen basert på antall ansatte og valgt plan."
            />

            <FAQItem
              question="Kan jeg avbryte abonnementet når som helst?"
              answer="Ja, du kan avbryte abonnementet når som helst uten bindingstid. Avbestillingen trer i kraft ved slutten av din nåværende faktureringsperiode."
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
              Klar til å beskytte din bedrift?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start din gratis prøveperiode i dag. Ingen kredittkort påkrevd,
              full tilgang til alle funksjoner i 14 dager.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6" asChild>
                <Link href="/auth/signup">
                  Start gratis prøveperiode
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                <Phone className="mr-2 h-5 w-5" />
                Ring oss: +47 123 45 678
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ Norsk support ✓ GDPR-kompatibel ✓ Trygg datahåndtering
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}