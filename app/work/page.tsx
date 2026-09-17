import type { Metadata } from 'next'
import { Suspense } from 'react'
import { categories, projects } from '@/data/work'
import { Page } from '@/components/primitives/Layout'
import { SectionHeader } from '@/components/type/Type'
import { WorkBrowserDraft } from '@/components/work/WorkBrowserDraft'
import { ContactBlock } from '@/components/chrome/ContactBlock'
import { ShaderBackground } from '@/components/ui/plasma-shader'

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
      {/* HERO — plasma shader behind the "Project categories" header. */}
      <section
        data-invert
        data-nav="dark"
        className="relative overflow-hidden pt-[clamp(100px,26vh,300px)] pb-[clamp(80px,12vh,160px)]"
        style={{ background: '#000', color: '#fff' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 0 }}
        >
          <ShaderBackground className="h-full w-full" />
        </div>
        <div className="relative" style={{ zIndex: 1 }}>
          <Page>
            <SectionHeader
              bold="Project"
              light="categories"
              count={String(projects.length).padStart(2, '0')}
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
