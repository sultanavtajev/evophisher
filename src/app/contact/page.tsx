import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/public-layout'
import { FAQItem } from '@/components/ui/faq-item'
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Headphones,
  FileText,
  Calendar,
  Send,
  Globe,
  Shield,
  Zap
} from 'lucide-react'

export default function ContactPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />

        <div className="container mx-auto text-center relative max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
              <MessageSquare className="h-4 w-4" />
              Vi er her for å hjelpe
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Kom i{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                kontakt
              </span>{' '}
              med oss
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              Har du spørsmål om EvoPhisher eller trenger hjelp med cybersikkerhet?
              Vårt ekspertteam er klare til å hjelpe deg.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="#contact-form">
                  Send oss en melding
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Phone className="mr-2 h-5 w-5" />
                Ring oss nå
              </Button>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in-up">
              ✓ Norsk kundeservice ✓ Rask responstid ✓ Ekspertråd tilgjengelig
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Flere måter å komme i kontakt
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Velg den kontaktmetoden som passer deg best
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover text-center">
              <CardHeader>
                <Phone className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-xl">Ring oss</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Snakk direkte med våre eksperter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-semibold text-lg">+47 123 45 678</div>
                  <div className="text-sm text-muted-foreground">
                    Hverdager 08:00 - 18:00
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Support: 24/7 for Enterprise
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover text-center">
              <CardHeader>
                <Mail className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-xl">Send e-post</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Vi svarer innen 2 timer i arbeidstiden
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-semibold">hei@evophisher.no</div>
                  <div className="text-sm text-muted-foreground">
                    Generelle henvendelser
                  </div>
                  <div className="font-semibold">support@evophisher.no</div>
                  <div className="text-sm text-muted-foreground">
                    Teknisk support
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-xl">Live chat</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Øyeblikkelig hjelp gjennom vår chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Tilgjengelig i plattformen
                  </div>
                  <div className="font-semibold">Hverdager 08:00 - 18:00</div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Start chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 interactive-hover text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-xl">Book møte</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Planlegg en demo eller konsultasjon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    30 min gratis konsultasjon
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Video eller telefon
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Book nå
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Besøk vårt kontor
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Du er alltid velkommen til å besøke oss på vårt hovedkontor i Oslo.
                Vi tilbyr også møter hos deg eller via video for din bekvemmelighet.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Hovedkontor Oslo</div>
                    <div className="text-muted-foreground">
                      Storgata 123, 4. etasje<br />
                      0001 Oslo, Norge
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Åpningstider</div>
                    <div className="text-muted-foreground">
                      Mandag - Fredag: 08:00 - 18:00<br />
                      Lørdag - Søndag: Stengt
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Møterom</div>
                    <div className="text-muted-foreground">
                      3 moderne møterom tilgjengelig<br />
                      Book på forhånd for garantert plass
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button asChild>
                  <Link href="#contact-form">
                    Book et møte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Kontakt riktig team</CardTitle>
                <CardDescription>
                  Vi har spesialiserte team for å gi deg best mulig hjelp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Salg og demo</div>
                    <div className="text-sm text-muted-foreground">
                      salg@evophisher.no • +47 123 45 679
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Teknisk support</div>
                    <div className="text-sm text-muted-foreground">
                      support@evophisher.no • +47 123 45 680
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Sikkerhet</div>
                    <div className="text-sm text-muted-foreground">
                      security@evophisher.no • Kritiske henvendelser
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Juridisk og compliance</div>
                    <div className="text-sm text-muted-foreground">
                      legal@evophisher.no • GDPR og avtaler
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Send oss en melding
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fyll ut skjemaet nedenfor så kontakter vi deg så snart som mulig
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Fornavn *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Ola"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Etternavn *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Nordmann"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">E-post *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="ola@bedrift.no"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+47 123 45 678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bedrift</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Bedriftsnavn AS"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Hva kan vi hjelpe deg med? *</label>
                    <select
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Velg kategori</option>
                      <option value="demo">Book en demo</option>
                      <option value="pricing">Spørsmål om priser</option>
                      <option value="technical">Teknisk support</option>
                      <option value="security">Sikkerhetsspørsmål</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Annet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Melding *</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Beskriv hvordan vi kan hjelpe deg..."
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="mt-1"
                    />
                    <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                      Jeg ønsker å motta nyhetsbrev og oppdateringer om cybersikkerhet fra EvoPhisher
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full group">
                    Send melding
                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Ved å sende dette skjemaet godtar du våre{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      personvernregler
                    </Link>
                    {' '}og{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      vilkår for bruk
                    </Link>
                    .
                  </p>
                </form>
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
              Ofte stilte spørsmål
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Finn raskt svar på vanlige spørsmål
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Hvor raskt får jeg svar på henvendelsen min?"
              answer="Vi svarer på alle henvendelser innen 2 timer i arbeidstiden (08:00-18:00). For kritiske sikkerhetsspørsmål har vi døgnkontinuerlig beredskap med responstid på under 30 minutter."
            />

            <FAQItem
              question="Kan jeg få personlig demo av plattformen?"
              answer="Absolutt! Vi tilbyr gratis 30-minutters personlige demoer hvor vi viser plattformen tilpasset dine behov. Du kan booke direkte gjennom kalenderen vår eller kontakte salg."
            />

            <FAQItem
              question="Tilbyr dere support på norsk?"
              answer="Ja, all support tilbys på norsk av våre norske eksperter. Vi har også mulighet for support på engelsk hvis ønskelig."
            />

            <FAQItem
              question="Har dere teknisk support utenom arbeidstid?"
              answer="Professional og Enterprise-kunder får prioritert support med utvidet åpningstider. Enterprise-kunder har tilgang til 24/7 support for kritiske problemer."
            />

            <FAQItem
              question="Kan dere komme på besøk til oss?"
              answer="Vi kan absolutt besøke deg! Vi tilbyr on-site møter og implementeringsstøtte for bedrifter i Oslo-området og ved behov også andre steder i Norge."
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
              Klar til å snakke?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Vårt team er klare til å hjelpe deg med å styrke bedriftens cybersikkerhet.
              Ta kontakt i dag for en uforpliktende samtale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group text-lg px-8 py-6">
                <Phone className="mr-2 h-5 w-5" />
                Ring oss: +47 123 45 678
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/40">
                <Mail className="mr-2 h-5 w-5" />
                Send e-post
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ Gratis konsultasjon ✓ Norsk ekspertteam ✓ Rask respons
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}