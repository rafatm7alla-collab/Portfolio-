import type { Metadata } from 'next'
import { Suspense } from 'react'
import { categories, projects } from '@/data/work'
import { Page } from '@/components/primitives/Layout'
import { SectionHeader } from '@/components/type/Type'
import { WorkBrowser } from '@/components/work/WorkBrowser'
import { ContactBlock } from '@/components/chrome/ContactBlock'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Branding, campaigns, packaging, film and art direction by Rafat Mhalla.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <>
      {/*
        HERO

        The header band is cleared explicitly. The navigation is fixed and
        roughly 80px tall; the previous `pt-[26vh]` was a proportion, so on a
        short viewport 26vh fell under that and the logo landed on top of the
        headline. The floor here is above the nav's own height, so the
        headline starts below it at every breakpoint.
      */}
      <section className="pt-[clamp(148px,26vh,300px)]">
        <Page>
          <SectionHeader
            bold="Project"
            light="categories"
            count={String(projects.length).padStart(2, '0')}
            as="h1"
          />
        </Page>

        {/* useSearchParams needs a Suspense boundary on a statically
            rendered route. The fallback holds the strip's height so the
            page does not jump while it hydrates. */}
        <Suspense
          fallback={<div className="mt-[clamp(40px,7vh,88px)] h-[clamp(340px,46vh,460px)]" />}
        >
          <WorkBrowser categories={categories} projects={projects} />
        </Suspense>
      </section>

      <ContactBlock />
    </>
  )
}
