import Link from 'next/link'
import NextImage from 'next/image'
import { publicAssetExists } from '@/lib/asset'
import { profile } from '@/data/profile'
import { projects, featuredProjects } from '@/data/projects'
import { Page, Rule } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { DisplayStack, Meta, Micro, SectionHeader } from '@/components/type/Type'
import { ContactBlock } from '@/components/chrome/ContactBlock'
import { HeroBanner } from '@/components/homepage/HeroBanner'
import { PortfolioShowcase } from '@/components/homepage/PortfolioShowcase'
import { SelectedWorkMosaic } from '@/components/homepage/SelectedWorkMosaic'
import '@/components/homepage/SelectedWorkHeader.css'

/**
 * EXPERIMENT TOGGLE — flip to 'original' to restore the previous
 * PortfolioShowcase presentation. Both components remain in the repo.
 */
const SELECTED_WORK_VARIANT: 'original' | 'mosaic' = 'mosaic'

export default function Home() {
  const hasLogo = publicAssetExists(profile.heroLogo.src)

  return (
    <>
      <HeroBanner hasLogo={hasLogo} />
      <SelectedWork />
      <AboutBlock />
      <ContactBlock />
    </>
  )
}

/* ─── SELECTED WORK ──────────────────────────────────────────────── */

function SelectedWork() {
  return (
    <section aria-labelledby="selected-work">
      <div className="sw-header-stack-wrapper">
        <div className="sw-header-sticky">
          <Page>
            <SectionHeader
              bold="Selected"
              light="projects"
              count={String(featuredProjects.length).padStart(2, '0')}
            />
            <Rule className="mt-[clamp(40px,6vw,80px)]" />
          </Page>
        </div>
      </div>

      {SELECTED_WORK_VARIANT === 'mosaic' ? (
        <SelectedWorkMosaic projects={featuredProjects} />
      ) : (
        <PortfolioShowcase projects={featuredProjects} />
      )}

      <Page>
        <div className="flex justify-end pb-[var(--section-gap)]">
          <Link href="/work" className="t-meta link">
            All work ({String(projects.length).padStart(2, '0')}) →
          </Link>
        </div>
      </Page>
    </section>
  )
}

/* ─── ABOUT ──────────────────────────────────────────────────────── */

function AboutBlock() {
  return (
    <section data-invert data-nav="dark" className="py-[var(--section-gap)]">
      <Page>
        <Reveal>
          <Meta as="p" secondary>
            (About)
          </Meta>
        </Reveal>

        <Reveal delay={80} className="mt-[clamp(32px,5vw,64px)]">
          <div className="grid-page">
            <p className="t-headline col-span-4 md:col-span-7 lg:col-span-8">
              {profile.aboutStatement}
            </p>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-[clamp(48px,8vw,120px)]">
          <div className="flex justify-end">
            <Link href="/about" className="t-meta link">
              Read more →
            </Link>
          </div>
        </Reveal>
      </Page>
    </section>
  )
}
