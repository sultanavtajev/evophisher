import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
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
  )
}