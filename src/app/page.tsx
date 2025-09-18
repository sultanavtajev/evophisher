import { PublicLayout } from '@/components/layout/public-layout'
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  StatsSection,
  TestimonialsSection,
  FAQSection,
  CTASection
} from '@/components/landing'

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </PublicLayout>
  )
}
