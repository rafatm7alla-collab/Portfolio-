'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Img } from '@/types/project'
import { Page } from '@/components/primitives/Layout'
import { Meta, Micro } from '@/components/type/Type'

/**
 * CLOSER LOOK — horizontal gallery for a single project.
 *
 * A native `overflow-x` track with scroll snapping. Deliberately NOT a
 * carousel library and not scroll-jacked: a trackpad, a touch swipe, a
 * shift-wheel and the keyboard all drive it exactly as the browser intends,
 * and it still scrolls with JavaScript disabled — the arrows are an
 * enhancement, not the mechanism.
 *
 * The track bleeds off the right edge so the row visibly continues past the
 * viewport. That, rather than any control, is what says "there is more here".
 *
 * Ends on an inverted panel linking into the full case study.
 */
export function CloserLook({
  slug,
  title,
  images,
  eyebrow,
}: {
  slug: string
  title: string
  images: Img[]
  eyebrow?: string | null
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    // scroll-padding-inline-start makes 0 a valid resting position, so a
    // small tolerance is all that is needed here.
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const step = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const panel = el.querySelector<HTMLElement>('[data-panel]')
    const distance = panel ? panel.offsetWidth + 16 : el.clientWidth * 0.8
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({
      left: distance * direction,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      className="pb-[var(--section-gap)] pt-[var(--section-gap)]"
      aria-labelledby="closer-look"
    >
      <Page>
        <header className="flex items-end justify-between gap-6">
          <h2 id="closer-look" className="t-display-l">
            <span className="block uppercase">A closer</span>
            <span className="t-light block pl-[0.32em]">look</span>
          </h2>
          <div className="shrink-0 text-right">
            <Meta as="p">{title}</Meta>
            {eyebrow && (
              <Meta as="p" secondary className="mt-1">
                {eyebrow}
              </Meta>
            )}
          </div>
        </header>
      </Page>

      {/* Bleeds right: the row continues past the edge of the page. */}
      <div
        ref={trackRef}
        onScroll={sync}
        tabIndex={0}
        role="group"
        aria-label={`${title} — image gallery, scroll horizontally`}
        className="closer-track mt-[clamp(32px,5vh,64px)] flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        style={{
          paddingInlineStart: 'var(--page-margin)',
          paddingInlineEnd: 'var(--page-margin)',
          // Without this the snap point ignores the padding: the track rests
          // with the padding already scrolled past, so the first panel sat
          // flush against the viewport edge instead of on the page margin.
          scrollPaddingInlineStart: 'var(--page-margin)',
        }}
      >
        {images.map((image, i) => (
          <figure
            key={image.src || `${image.alt}-${i}`}
            data-panel
            className="w-[78vw] shrink-0 snap-start md:w-[46vw] lg:w-[32vw]"
          >
            {/* Fixed frame, image scales inside it. The frame never moves. */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {image.src ? (
                <NextImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 78vw, (max-width: 1024px) 46vw, 32vw"
                  unoptimized={image.unoptimized}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#d6d6d6]">
                  <span className="t-micro px-4 text-center text-[#8a8a8a]">
                    {image.alt}
                  </span>
                </div>
              )}
            </div>
            <figcaption className="mt-4">
              <Micro secondary>
                {String(i + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </Micro>
            </figcaption>
          </figure>
        ))}

        {/* Closing panel — the way into the case study. */}
        <div data-panel className="w-[78vw] shrink-0 snap-start md:w-[46vw] lg:w-[32vw]">
          <Link
            href={`/work/${slug}`}
            data-invert
            className="group flex aspect-[4/3] flex-col justify-between p-8"
          >
            <Meta as="span" secondary>
              Full project
            </Meta>
            <span className="t-display-s block">
              Check the full
              <br />
              project{' '}
              <span className="inline-block transition-transform duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
          <div className="mt-4">
            <Micro secondary>{title}</Micro>
          </div>
        </div>
      </div>

      <Page>
        <div className="mt-5 flex items-baseline justify-between">
          <Micro as="span" secondary>
            ({String(images.length).padStart(2, '0')}) Images
          </Micro>

          {/* Text glyphs, not icon buttons — §09 permits → and ↓ only. */}
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Previous images"
              className="t-meta link disabled:pointer-events-none disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Next images"
              className="t-meta link disabled:pointer-events-none disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </Page>

      <style>{`
        /* The scrollbar is noise in an editorial layout, but the track stays
           natively scrollable — this hides the bar, never the behaviour. */
        .closer-track { scrollbar-width: none; }
        .closer-track::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
