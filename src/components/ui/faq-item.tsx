'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader
        className="cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-left group-hover:text-primary transition-colors">
            {question}
          </CardTitle>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="animate-fade-in">
          <p className="text-muted-foreground leading-relaxed">
            {answer}
          </p>
        </CardContent>
      )}
    </Card>
  )
}