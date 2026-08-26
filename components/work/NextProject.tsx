'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { useState } from 'react'
import type { Project } from '@/types/project'
import { Page } from '@/components/primitives/Layout'
import { Meta, PlaceholderTag } from '@/components/type/Type'

/**
 * Full viewport, inverted. On hover the next project's hero image fades
 * up from 0 to 100% behind the title over 600ms; the title stays legible
 * via mix-blend-mode: difference.
 *
 * One move. It is the last thing on the page, so it carries the weight.
 */
export function NextProject({ project }: { project: Project }) {
  const [hover, setHover] = useState(false)

  /**
   * Prefer the project's dedicated next-cover. Reusing the hero meant the
   * foot of a case study showed a cover the visitor had just scrolled past
   * on the way in — this is the one place a project needs a second face.
   * Drop "next cover.jpg" into the project's folder and it is picked up.
   */
  const cover =
    project.nextCover && project.nextCover.src !== ''
      ? project.nextCover
      : project.hero.image
  const hasImage = Boolean(cover && cover.src !== '')

  return (
    <section data-invert data-nav="dark" className="relative overflow-hidden">
      <Link
        href={`/work/${project.slug}`}
        className="relative block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        {hasImage && (
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ opacity: hover ? 1 : 0 }}
          >
            <NextImage
              src={cover!.src}
              alt=""
              fill
              sizes="100vw"
              unoptimized={cover!.unoptimized}
              className="object-cover"
            />
          </div>
        )}

        <Page>
          <div className="relative flex min-h-[78vh] flex-col justify-between py-[clamp(64px,10vh,140px)]">
            <Meta as="p" style={{ mixBlendMode: 'difference', color: '#fff' }}>
              Next
            </Meta>

            <div style={{ mixBlendMode: 'difference', color: '#fff' }}>
              <h2 className="t-display-xl">{project.title}</h2>
              <div className="mt-8 flex items-center gap-6">
                <Meta as="p">
                  {[project.category, project.year].filter(Boolean).join(' · ')}
                </Meta>
                {project.isPlaceholder && <PlaceholderTag />}
              </div>
            </div>
          </div>
        </Page>
      </Link>
    </section>
  )
}
