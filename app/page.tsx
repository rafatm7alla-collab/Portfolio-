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
import { ClientTicker } from '@/components/homepage/ClientTicker'
import '@/components/homepage/SelectedWorkHeader.css'
import { getLocale } from '@/lib/i18n-server'
import { localeHref, type Locale } from '@/lib/i18n'
import { t } from '@/data/i18n'

/**
 * EXPERIMENT TOGGLE — flip to 'original' to restore the previous
 * PortfolioShowcase presentation. Both components remain in the repo.
 */
const SELECTED_WORK_VARIANT: 'original' | 'mosaic' = 'mosaic'

export default async function Home() {
  const locale = await getLocale()
  const hasLogo = publicAssetExists(profile.heroLogo.src)

  return (
    <>
      <HeroBanner hasLogo={hasLogo} />
      <SelectedWork locale={locale} />
      <AboutBlock locale={locale} />
      <ClientStrip locale={locale} />
      <ContactBlock />
    </>
  )
}

/* ─── SELECTED WORK ──────────────────────────────────────────────── */

function SelectedWork({ locale }: { locale: Locale }) {
  const d = t(locale).home
  return (
    <section aria-labelledby="selected-work">
      <div className="sw-header-stack-wrapper">
        <div className="sw-header-sticky">
          <Page>
            <SectionHeader
              bold={d.selectedBold}
              light={d.selectedLight}
            />
            <Rule className="mt-[clamp(20px,3vw,40px)]" />
          </Page>
        </div>
      </div>

      {SELECTED_WORK_VARIANT === 'mosaic' ? (
        <SelectedWorkMosaic projects={featuredProjects} />
      ) : (
        <PortfolioShowcase projects={featuredProjects} />
      )}

    </section>
  )
}

/* ─── CLIENTS ────────────────────────────────────────────────────── */

const CLIENTS = [
  'National Bank of Iraq',
  'Toyota Iraq',
  'Lexus Iraq',
  'Land Rover',
  'Mövenpick Hotels & Resorts',
  'Al Zaytoon Residences',
  'Sardar Group',
  'International Free Company',
  'DubaIraq',
  'Vision House',
  'Praline',
  'FM Power',
] as const

function ClientStrip({ locale }: { locale: Locale }) {
  return (
    <section aria-label={t(locale).home.clients} className="py-[clamp(14px,2.2vh,24px)]">
      <ClientTicker names={CLIENTS} />
    </section>
  )
}

/* ─── ABOUT ──────────────────────────────────────────────────────── */

function AboutBlock({ locale }: { locale: Locale }) {
  const d = t(locale)
  return (
    <section data-invert data-nav="dark" className="mt-[clamp(48px,8vh,112px)] py-[var(--section-gap)]">
      <Page>
        <Reveal delay={80}>
          <div className="grid-page">
            <p className="t-headline col-span-4 md:col-span-7 lg:col-span-8">
              <strong className="font-bold">{d.home.aboutStrong}</strong>
              {d.home.aboutRest}
            </p>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-[clamp(48px,8vw,120px)]">
          <div className="flex justify-start">
            <Link href={localeHref('/about', locale)} className="t-meta link">
              {d.home.readMore} {d.arrow}
            </Link>
          </div>
        </Reveal>
      </Page>
    </section>
  )
}
