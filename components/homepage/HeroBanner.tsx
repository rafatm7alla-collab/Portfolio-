'use client'

import NextImage from 'next/image'
import { profile } from '@/data/profile'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { DisplayStack, Meta, Micro } from '@/components/type/Type'

export function HeroBanner({ hasLogo }: { hasLogo: boolean }) {
  return (
    <>
      <div
        className="relative mt-[clamp(72px,9vh,104px)] overflow-hidden"
        style={{ minHeight: 'clamp(440px, 62vh, 700px)' }}
      >
        {/* Portrait — always visible, full color */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: "url('/hero/portrait.jpg')",
            backgroundPosition: 'right center',
            backgroundSize: 'cover',
          }}
        />

        {/* Content overlay */}
        <section
          data-nav="light"
          className="absolute inset-0 z-[2] flex flex-col justify-center overflow-hidden"
        >
          <Page className="absolute inset-x-0 top-0 pt-[clamp(28px,4vh,48px)]">
            <Reveal>
              <Meta
                as="p"
                style={{
                  letterSpacing: '0.18em',
                  color: 'black',
                }}
              >
                Creative Director · Art Director
              </Meta>
            </Reveal>
          </Page>

          <Page>
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-[clamp(20px,4vw,72px)]">
              {hasLogo && (
                <Reveal className="shrink-0">
                  <div className="relative aspect-[3800/2000] w-[clamp(140px,19vw,340px)]">
                    <NextImage
                      src="/hero/RAFAT LOGO white.png"
                      alt={profile.heroLogo.alt}
                      fill
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 40vw, 17vw"
                      className="object-contain"
                      style={{ filter: 'invert(1)' }}
                    />
                  </div>
                </Reveal>
              )}
            </div>
          </Page>
        </section>
      </div>

      {/* Lede section below */}
      <div className="pt-[clamp(36px,5vh,56px)]">
        <Page>
          <div className="grid-page">
            <Reveal delay={320} className="col-span-4 md:col-span-5 lg:col-span-5">
              <p className="t-lede">{profile.heroSupporting}</p>
            </Reveal>
            <Reveal
              delay={400}
              className="col-span-4 mt-6 md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9"
            >
              <div className="flex items-baseline justify-between md:justify-end md:gap-10">
                <Micro as="p" secondary>
                  {profile.location} · Available {new Date().getFullYear()}
                </Micro>
                <Micro as="p" secondary>
                  ({profile.yearsExperience}+ Years)
                </Micro>
              </div>
            </Reveal>
          </div>
        </Page>
      </div>
    </>
  )
}
