import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      text: 'EvoPhisher har virkelig endret måten vi tenker på cybersikkerhet. Våre ansatte er nå mye mer oppmerksomme på phishing-forsøk.',
      author: {
        name: 'Magnus Hansen',
        title: 'IT-sjef, TechCorp AS',
        initials: 'MH'
      }
    },
    {
      rating: 5,
      text: 'Implementeringen var smertefri og resultatene var synlige allerede etter første kampanje. Anbefales på det sterkeste!',
      author: {
        name: 'Lisa Karlsen',
        title: 'CISO, SecureBank',
        initials: 'LK'
      }
    },
    {
      rating: 5,
      text: 'Rapportene er fantastiske og gir oss eksakt den innsikten vi trenger for å forbedre vår sikkerhetskultur.',
      author: {
        name: 'Per Andersen',
        title: 'Sikkerhetsleder, DataFlow',
        initials: 'PA'
      }
    }
  ]

  return (
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
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">{testimonial.author.initials}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.author.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}