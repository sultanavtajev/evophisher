import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
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
  )
}