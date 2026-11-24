'use client'

import { Reveal } from '@/components/primitives/Reveal'
import { HeroFigure } from './HeroFigure'
import { Arrow } from '@/components/ui/Arrow'
import { scrollToId } from './scrollTo'

/**
 * The hero. Type on the left margin; on the right, the five stage marks
 * drawn as one construction (HeroFigure), arriving layer by layer and then
 * moving slowly on their own: triangle turning anticlockwise, the line clockwise, the big circle
 * rolling round the ring, the small one trying to climb.
 */
export function FrameworkHero() {
  return (
    <section className="fw-hero page">
      <div className="fw-hero-grid">
        <div className="fw-hero-copy">
          <Reveal>
            <p className="t-meta">Brand Framework — 01</p>
          </Reveal>

          <h1 className="fw-hero-title">
            <Reveal as="span" delay={80} className="block uppercase">
              Beyond Design.
            </Reveal>
            <Reveal as="span" delay={160} className="t-light block">
              Building Brands
            </Reveal>
            <Reveal as="span" delay={240} className="t-light block">
              with Purpose.
            </Reveal>
          </h1>

          <Reveal delay={320} className="fw-hero-text">
            <p className="t-lede">
              I combine strategic thinking, creative direction and integrated execution to build
              distinctive brands that create meaningful value for people, businesses and
              long-term growth.
            </p>
            <p className="t-body ink-secondary mt-6">
              From the first strategic conversation to the final brand experience, every
              creative decision is connected to a bigger purpose.
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
              Explore the Framework <Arrow direction="down-right" className="fw-arrow-down" />
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
