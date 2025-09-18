import { Target, Mail, TrendingUp } from 'lucide-react'

export function HowItWorksSection() {
  const steps = [
    {
      icon: Target,
      number: 1,
      title: 'Sett opp kampanje',
      description: 'Velg fra våre forhåndsdefinerte phishing-maler eller lag dine egne tilpassede tester som passer din bedrift.'
    },
    {
      icon: Mail,
      number: 2,
      title: 'Send til ansatte',
      description: 'Distribuer sikre phishing-tester til dine ansatte og overvåk deres responser i sanntid.'
    },
    {
      icon: TrendingUp,
      number: 3,
      title: 'Analyser resultater',
      description: 'Få detaljerte rapporter og innsikt for å forbedre sikkerhetsrutiner og identifisere treningsbehov.'
    }
  ]

  return (
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
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}