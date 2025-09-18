export function StatsSection() {
  const stats = [
    {
      value: '500+',
      label: 'Bedrifter beskyttet'
    },
    {
      value: '50K+',
      label: 'Ansatte trent'
    },
    {
      value: '95%',
      label: 'Forbedret sikkerhet'
    }
  ]

  return (
    <section className="py-20 px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto text-center max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Bedrifter stoler på EvoPhisher
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-lg text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}