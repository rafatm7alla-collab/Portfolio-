import Link from 'next/link'
import type { Project } from '@/types/project'
import { Image } from '@/components/media/Image'
import { ScrollScale } from '@/components/media/ScrollScale'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta, Micro, PlaceholderTag } from '@/components/type/Type'

export type FeatureLayout =
  | 'bleed'
  | 'type-left'
  | 'type-right'
  | 'inset'
  | 'pair'

/**
 * Rhythm law (DIRECTION.md §02): no two consecutive projects share a
 * layout. The cycle is fixed and derived from position, not stored in
 * data — so reordering projects reorders the rhythm automatically.
 */
const CYCLE: FeatureLayout[] = [
  'bleed',
  'type-left',
  'inset',
  'bleed',
  'type-right',
  'pair',
]

export const layoutFor = (position: number, slug?: string) => {
  // Praline uses bleed layout (single full-width image)
  if (slug === 'praline') return 'inset'
  return CYCLE[position % CYCLE.length]
}

export function ProjectFeature({
  project,
  position,
  priority = false,
}: {
  project: Project
  position: number
  priority?: boolean
}) {
  const layout = layoutFor(position, project.slug)

  return (
    <article className="pb-[var(--section-gap)]">
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        aria-label={[project.title, project.category, project.year].filter(Boolean).join(' — ')}
      >
        {layout === 'bleed' && <BleedLayout project={project} priority={priority} />}
        {layout === 'inset' && <InsetLayout project={project} />}
        {layout === 'pair' && <PairLayout project={project} />}
        {(layout === 'type-left' || layout === 'type-right') && (
          <SplitLayout project={project} side={layout} />
        )}
      </Link>
    </article>
  )
}

/* ─── Shared type block ──────────────────────────────────────────── */

function Caption({
  project,
  align = 'row',
}: {
  project: Project
  align?: 'row' | 'stack'
}) {
  return (
    <div
      className={
        align === 'row'
          ? 'mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10'
          : 'mt-6 flex flex-col gap-4'
      }
    >
      <div>
        <Micro secondary as="p">
          {project.index}
        </Micro>
        <h3 className="t-display-m mt-3 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[8px]">
          {project.title}
        </h3>
      </div>

      <div className="shrink-0 md:pt-2 md:text-right">
        {project.services.slice(0, 2).map((s) => (
          <Meta key={s} as="p">
            {s}
          </Meta>
        ))}
        <Meta as="p" secondary className="mt-2">
          {[project.location !== '[Location]' ? project.location : null, project.year]
            .filter(Boolean)
            .join(' · ')}
        </Meta>
        {project.isPlaceholder && (
          <div className="mt-3">
            <PlaceholderTag />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Image scales 1.02 over 600ms on hover, and blooms from greyscale to full
 * colour over the same 600ms. Nothing else moves.
 *
 * Homepage only. /work and the case studies stay in colour throughout —
 * there the work is the subject, not a thing to be uncovered.
 */
const hoverScale = 'desaturate group-hover:scale-[1.02]'

/* ─── Layouts ────────────────────────────────────────────────────── */

function BleedLayout({ project, priority }: { project: Project; priority: boolean }) {
  // Reduced height for central/secondary projects
  const aspect = project.slug === 'al-zaytoun-terraces' ? '16 / 6' : undefined

  return (
    <>
      {/* Intrinsic ratio, not a forced 16:9 — see CaseHero. The rhythm law
          is about varying layout, not flattening every image to one crop. */}
      <ScrollScale className="bleed overflow-hidden">
        <div className={hoverScale}>
          <Image image={project.hero.image!} sizes="100vw" priority={priority} aspect={aspect} />
        </div>
      </ScrollScale>
      <Page>
        <Caption project={project} />
      </Page>
    </>
  )
}

function InsetLayout({ project }: { project: Project }) {
  return (
    <Page>
      <div className="grid-page">
        <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4">
          <div className="overflow-hidden">
            <div className={hoverScale}>
              <Image
                image={project.hero.image!}
                sizes="(max-width: 768px) 100vw, 50vw"
                aspect="4 / 5"
              />
            </div>
          </div>
          <Caption project={project} align="stack" />
        </div>
      </div>
    </Page>
  )
}

function SplitLayout({
  project,
  side,
}: {
  project: Project
  side: 'type-left' | 'type-right'
}) {
  const typeFirst = side === 'type-left'

  return (
    <Page>
      <div className="grid-page items-center gap-y-8">
        <div
          className={`col-span-4 md:col-span-3 lg:col-span-4 ${
            typeFirst ? 'md:order-1' : 'md:order-2 lg:col-start-9'
          }`}
        >
          <Micro secondary as="p">
            {project.index}
          </Micro>
          <h3 className="t-display-m mt-4 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[8px]">
            {project.title}
          </h3>
          <div className="mt-8">
            {project.services.map((s) => (
              <Meta key={s} as="p">
                {s}
              </Meta>
            ))}
            {project.year && (
              <Meta as="p" secondary className="mt-2">
                {project.year}
              </Meta>
            )}
            {project.isPlaceholder && (
              <div className="mt-4">
                <PlaceholderTag />
              </div>
            )}
          </div>
        </div>

        <div
          className={`col-span-4 md:col-span-5 lg:col-span-7 ${
            typeFirst ? 'md:order-2 bleed-r lg:col-start-6' : 'md:order-1 bleed-l lg:col-start-1'
          }`}
        >
          <ScrollScale className="overflow-hidden">
            <div className={hoverScale}>
              <Image
                image={project.hero.image!}
                sizes="(max-width: 768px) 100vw, 58vw"
                aspect="3 / 2"
              />
            </div>
          </ScrollScale>
        </div>
      </div>
    </Page>
  )
}

function PairLayout({ project }: { project: Project }) {
  const second = project.sections.find((s) => s.type === 'image' && s.images[1])
  const secondImage =
    second && second.type === 'image' ? second.images[1] : project.hero.image!

  return (
    <Page>
      <div className="grid-page gap-y-8">
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <div className="overflow-hidden">
            <div className={hoverScale}>
              <Image
                image={project.hero.image!}
                sizes="(max-width: 768px) 100vw, 48vw"
                aspect="4 / 5"
              />
            </div>
          </div>
          <Caption project={project} align="stack" />
        </div>

        <div className="offset-y col-span-4 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9">
          <div className="overflow-hidden">
            <div className={hoverScale}>
              <Image image={secondImage} sizes="(max-width: 768px) 100vw, 32vw" aspect="3 / 4" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
