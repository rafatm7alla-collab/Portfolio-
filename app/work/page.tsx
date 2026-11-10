import type { Metadata } from 'next'
import { Suspense } from 'react'
import { categories, projects } from '@/data/work'
import { Page } from '@/components/primitives/Layout'
import { SectionHeader } from '@/components/type/Type'
import { WorkBrowserDraft } from '@/components/work/WorkBrowserDraft'
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
      {/* HERO — plain white; the plasma is reserved for the homepage banner. */}
      <section className="relative pt-[clamp(100px,26vh,300px)] pb-[clamp(40px,6vh,80px)]">
        <div className="relative">
          <Page>
            <SectionHeader
              bold="Project"
              light="categories"
              as="h1"
            />
          </Page>
        </div>
      </section>

      {/* CATEGORIES — solid white, black text and icons, no shader. */}
      <section style={{ background: '#fff', color: '#000' }}>
        <Suspense
          fallback={<div className="h-[clamp(340px,46vh,460px)]" />}
        >
          <WorkBrowserDraft categories={categories} projects={projects} />
        </Suspense>
      </section>

      {/* CONTACT — white background, black text, no shader. */}
      <section style={{ background: '#fff', color: '#000' }}>
        <ContactBlock />
      </section>
    </>
  )
}
