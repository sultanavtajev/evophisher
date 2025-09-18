import { FAQItem } from '@/components/ui/faq-item'

export function FAQSection() {
  const faqs = [
    {
      question: 'Hvor sikre er phishing-testene?',
      answer: 'Alle våre phishing-tester er helt sikre og inneholder ingen skadelig kode. De er designet utelukkende for opplæring og testing, og all data håndteres i henhold til GDPR.'
    },
    {
      question: 'Kan jeg tilpasse phishing-malene?',
      answer: 'Ja! Du kan velge fra våre forhåndsdefinerte maler eller lage helt egne tilpassede phishing-tester som passer din bedrifts spesifikke behov og bransje.'
    },
    {
      question: 'Hvor ofte bør vi kjøre phishing-tester?',
      answer: 'Vi anbefaler månedlige eller kvartalsvise tester avhengig av din bedrifts risikoprofil. Vår plattform støtter automatiserte kampanjer som kan settes opp til å kjøre regelmessig.'
    }
  ]

  return (
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
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  )
}