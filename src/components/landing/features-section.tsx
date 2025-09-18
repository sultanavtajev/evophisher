import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Users, BarChart3, Clock, Lock, CheckCircle } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Realistiske simulering',
      description: 'Professionelle phishing-tester som etterligner reelle trusler'
    },
    {
      icon: Users,
      title: 'Enkel ansatthåndtering',
      description: 'Administrer alle dine ansatte og deres treningsstatus på ett sted'
    },
    {
      icon: BarChart3,
      title: 'Detaljerte rapporter',
      description: 'Få innsikt i resultater og identifiser områder for forbedring'
    },
    {
      icon: Clock,
      title: 'Automatiserte kampanjer',
      description: 'Sett opp regelmessige tester som kjører automatisk'
    },
    {
      icon: Lock,
      title: 'Sikker og privat',
      description: 'All data behandles i henhold til GDPR og høyeste sikkerhetsstandarder'
    },
    {
      icon: CheckCircle,
      title: 'Enkel implementering',
      description: 'Kom i gang på minutter med vår intuitive grensesnitt'
    }
  ]

  return (
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
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}