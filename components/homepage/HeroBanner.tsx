'use client'

import { useState, useEffect, useRef } from 'react'
import NextImage from 'next/image'
import { profile } from '@/data/profile'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { DisplayStack, Meta, Micro } from '@/components/type/Type'

export function HeroBanner({ hasLogo }: { hasLogo: boolean }) {
  const [isClicked, setIsClicked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    e.stopPropagation()
    setIsClicked(true)
  }

  const handleClickAway = () => {
    setIsClicked(false)
  }

  useEffect(() => {
    if (isClicked) {
      document.addEventListener('click', handleClickAway)
      return () => {
        document.removeEventListener('click', handleClickAway)
      }
    }
  }, [isClicked])

  return (
    <>
      <div
        ref={bannerRef}
        onClick={handleClick}
        className="relative mt-[clamp(72px,9vh,104px)] overflow-hidden cursor-pointer"
        style={{ minHeight: 'clamp(440px, 62vh, 700px)' }}
      >
        {/* Portrait layer — always behind */}
        {!isMobile && (
          <div
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: "url('/hero/portrait.jpg')",
              backgroundPosition: 'right center',
              backgroundSize: 'cover',
            }}
          />
        )}

        {/* Banner layer — shows black by default, transparent when clicked */}
        <section
          data-invert={!isClicked}
          data-nav={isClicked ? "light" : "dark"}
          className="absolute inset-0 z-[2] flex flex-col justify-center overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: isClicked ? 'transparent' : 'black',
          }}
        >
          <Page className="absolute inset-x-0 top-0 pt-[clamp(28px,4vh,48px)]">
            <Reveal>
              <Meta
                as="p"
                style={{
                  letterSpacing: '0.18em',
                  color: isClicked ? 'black' : 'white',
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
                      style={{
                        filter: isClicked ? 'invert(1)' : 'none',
                      }}
                    />
                  </div>
                </Reveal>
              )}

              <div
                aria-hidden="true"
                className="w-px shrink-0"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.45)',
                  height: 'clamp(80px, 22vw, 180px)',
                  alignSelf: 'center',
                  opacity: isClicked ? 0 : 1,
                  visibility: isClicked ? 'hidden' : 'visible',
                }}
              />

              <Reveal delay={160} className="shrink-0">
                <div style={{ color: 'white', opacity: isClicked ? 0 : 1, visibility: isClicked ? 'hidden' : 'visible' }}>
                  <DisplayStack
                    as="h1"
                    lines={profile.heroName}
                    size="l"
                    delay={160}
                  />
                </div>
              </Reveal>
            </div>
          </Page>
        </section>
      </div>

      {/* Lede section below */}
      <div className="pt-[clamp(28px,4vh,48px)]">
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
