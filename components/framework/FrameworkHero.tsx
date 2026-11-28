'use client'

import { Reveal } from '@/components/primitives/Reveal'
import { HeroFigure } from './HeroFigure'
import { Arrow } from '@/components/ui/Arrow'
import { scrollToId } from './scrollTo'
import { useLocale } from '@/components/i18n/LocaleProvider'
import { frameworkText } from '@/data/framework-i18n'

/**
 * The hero. Type on the left margin; on the right, the five stage marks
 * drawn as one construction (HeroFigure), arriving layer by layer and then
 * moving slowly on their own: triangle turning anticlockwise, the line clockwise, the big circle
 * rolling round the ring, the small one trying to climb.
 */
export function FrameworkHero() {
  const x = frameworkText(useLocale())
  return (
    <section className="fw-hero page">
      <div className="fw-hero-grid">
        <div className="fw-hero-copy">
          <Reveal>
            <p className="t-meta">{x.heroEyebrow}</p>
          </Reveal>

          <h1 className="fw-hero-title">
            <Reveal as="span" delay={80} className="block uppercase">
              {x.heroTitle[0]}
            </Reveal>
            <Reveal as="span" delay={160} className="t-light block">
              {x.heroTitle[1]}
            </Reveal>
            <Reveal as="span" delay={240} className="t-light block">
              {x.heroTitle[2]}
            </Reveal>
          </h1>

          <Reveal delay={320} className="fw-hero-text">
            <p className="t-lede">
              {x.heroLede}
            </p>
            <p className="t-body ink-secondary mt-6">
              {x.heroBody}
            </p>
          </Reveal>

          <Reveal delay={400} className="mt-[clamp(32px,5vh,56px)]">
            <a
              href="#framework"
              className="fw-cta-link"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('framework')
              }}
            >
              {x.explore} <Arrow direction="down-right" className="fw-arrow-down" />
            </a>
          </Reveal>
        </div>

        <div className="fw-hero-mark">
          <div className="fw-hero-mark-inner">
            <HeroFigure />
          </div>
        </div>
      </div>
    </section>
  )
}
