import type { Metadata } from 'next'
import Image from 'next/image'
import { profile } from '@/data/profile'
import { services } from '@/data/services'
import { publicAssetExists } from '@/lib/asset'
import { PortraitPanel, PortraitBand } from '@/components/media/HeroPortrait'
import { Page, Rule } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta, Micro, SectionHeader } from '@/components/type/Type'
import { ContactBlock } from '@/components/chrome/ContactBlock'

export const metadata: Metadata = {
  title: 'About',
  description: `${profile.name} — ${profile.title}. ${profile.yearsExperience}+ years across branding, campaigns and digital.`,
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  const hasPortrait = publicAssetExists(profile.aboutPortrait.src)

  return (
    <>
      {/* ─── Banner ──────────────────────────────────────────────────
          Same split as the homepage: type on white in the left half,
          portrait in the right. The biography moves into its own section
          below — it used to occupy columns 6–12, which is precisely where
          the panel now sits. */}
      <section className="relative flex min-h-[72vh] flex-col justify-between overflow-hidden pb-[clamp(28px,4vh,56px)] pt-[clamp(96px,13vh,150px)]">
        {hasPortrait && <PortraitPanel portrait={profile.aboutPortrait} priority />}

        <Page className="relative z-10">
          <Reveal>
            <h1 className="t-display-xl uppercase">About</h1>
          </Reveal>
        </Page>

        <Page className="relative z-10">
          <Reveal delay={80} className="pt-[clamp(32px,5vh,72px)]">
            <Meta as="p">{profile.name}</Meta>
            <Meta as="p" secondary className="mt-2">
              {profile.title}
            </Meta>
            {profile.locations.map((place) => (
              <Meta as="p" secondary className="mt-2" key={place.city}>
                {place.city}, {place.country}
              </Meta>
            ))}
          </Reveal>
        </Page>
      </section>

      {hasPortrait && <PortraitBand portrait={profile.aboutPortrait} priority />}

      {/* ─── Biography ───────────────────────────────────────────── */}
      <section className="pt-[var(--section-gap)]">
        <Page>
          <div className="grid-page">
            <Reveal className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-4">
              {profile.aboutBody.map((paragraph, i) => (
                <p key={i} className={i === 0 ? 't-headline' : 't-body mt-14 font-light'}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Page>
      </section>

      {/* ─── Services ────────────────────────────────────────────── */}
      <section className="pt-[var(--section-gap)]" aria-labelledby="services">
        <Page>
          <SectionHeader bold="What" light="I do" count="06" />
          <Rule className="mt-[clamp(40px,6vw,80px)]" />

          <ul className="mt-[clamp(40px,6vw,80px)]">
            {services.map((service, i) => (
              <li key={service.number}>
                <Reveal delay={i * 60}>
                  <div className="grid-page gap-y-4 py-8">
                    <Micro
                      as="span"
                      secondary
                      className="col-span-1 md:col-span-1 lg:col-span-1"
                    >
                      {service.number}
                    </Micro>

                    <h3 className="col-span-3 text-[clamp(1.5rem,3.2vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.03em] md:col-span-3 lg:col-span-5">
                      {service.title}
                    </h3>

                    <p className="t-body col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8">
                      {service.description}
                    </p>
                  </div>
                  {i < services.length - 1 && <Rule />}
                </Reveal>
              </li>
            ))}
          </ul>
        </Page>
      </section>

      {/* ─── Brands ──────────────────────────────────────────────── */}
      <section className="pt-[var(--section-gap)]" aria-labelledby="brands">
        <Page>
          <Reveal>
            <div className="space-y-0">
              <h2 className="text-[clamp(2.5rem,5.2vw,4.5rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]">
                Brands
              </h2>
              <h2 className="text-[clamp(1.8rem,3.8vw,3.2rem)] font-thin leading-[1.1] tracking-[-0.01em]">
                I worked with
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-[clamp(32px,5vw,64px)]">
            <div className="w-full">
              <Image
                src="/hero/brands i worked with.jpg"
                alt="Brands I worked with"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority={false}
              />
            </div>
          </Reveal>
        </Page>
      </section>

      <ContactBlock label="Contact" />
    </>
  )
}
