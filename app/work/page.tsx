import type { Metadata } from 'next'
import { Suspense } from 'react'
import { categories, projects } from '@/data/work'
import { Page } from '@/components/primitives/Layout'
import { SectionHeader } from '@/components/type/Type'
import { WorkBrowserDraft } from '@/components/work/WorkBrowserDraft'
import { ContactBlock } from '@/components/chrome/ContactBlock'
import { WorkHeroPanel } from '@/components/work/WorkHeroPanel'
import { WorkWarpSection } from '@/components/work/WorkWarpSection'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Branding, campaigns, packaging, film and art direction by Rafat Mhalla.',
  alternates: { canonical: '/work' },
}

// The warp carousel's cards: every project with a still cover (no GIFs).
const warpItems = projects
  .filter((p) => p.cover && !p.cover.endsWith('.gif'))
  .map((p) => ({
    title: p.title,
    meta: [categories.find((c) => c.id === p.categories[0])?.label, p.year].filter(Boolean).join(' · '),
    href: p.href,
    cover: p.cover!,
  }))

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
      {/* HERO — the contact page's silver plasma panel, shorter, title only. */}
      <section className="pt-[clamp(96px,14vh,150px)] pb-[clamp(40px,6vh,80px)]">
        <Page>
          <WorkHeroPanel>
            <SectionHeader bold="Project" light="categories" as="h1" />
          </WorkHeroPanel>
        </Page>
      </section>

      {/* PROJECT PREVIEW — scroll drives the warp carousel (desktop). */}
      <WorkWarpSection items={warpItems} />

      {/* CATEGORIES — solid white, black text and icons, no shader. */}
      <section style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
        <Suspense
          fallback={<div className="h-[clamp(340px,46vh,460px)]" />}
        >
          <WorkBrowserDraft categories={categories} projects={projects} />
        </Suspense>
      </section>

      {/* CONTACT — white background, black text, no shader. */}
      <section style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
        <ContactBlock />
      </section>
    </>
  )
}
