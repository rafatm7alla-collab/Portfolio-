import type { Metadata } from 'next'
import { FrameworkHero } from '@/components/framework/FrameworkHero'
import { FrameworkStages } from '@/components/framework/FrameworkStages'
import {
  EngagementSection,
  FinalCtaSection,
  PartnershipSection,
  SelectedWorkSection,
} from '@/components/framework/FrameworkSections'
import { BookingProvider } from '@/components/framework/BookingContext'
import '@/components/framework/framework.css'

export const metadata: Metadata = {
  title: 'Framework',
  description:
    'Beyond design: a five-stage brand framework (Discover, Define, Design, Activate, Evolve) for building, launching and evolving brands with purpose.',
  alternates: { canonical: '/framework' },
}

export default function FrameworkPage() {
  return (
    <BookingProvider>
      <FrameworkHero />
      <FrameworkStages />
      <PartnershipSection />
      <EngagementSection />
      <SelectedWorkSection />
      <FinalCtaSection />
    </BookingProvider>
  )
}
