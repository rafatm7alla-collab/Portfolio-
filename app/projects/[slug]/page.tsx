import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getManifest, manifestSlugs, manifestImage } from '@/lib/manifest'
import { Blocks } from '@/components/blocks/Blocks'
import { Page, Rule } from '@/components/primitives/Layout'
import { Meta, Micro } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'
import { projects as workProjects } from '@/data/work'
import { MastheadEntrance } from '@/components/blocks/MastheadEntrance'

type Params = { params: Promise<{ slug: string }> }

/** Every manifest becomes a static route at build time. */
export function generateStaticParams() {
  return manifestSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const manifest = getManifest(slug)
  if (!manifest) return {}

  return {
    title: manifest.title,
    description: manifest.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: manifest.title,
      description: manifest.summary,
      type: 'article',
    },
  }
}

export default async function ManifestProjectPage({ params }: Params) {
  const { slug } = await params
  const manifest = getManifest(slug)
  if (!manifest) notFound()

  const cover = manifest.cover ? manifestImage(slug, manifest.cover, manifest.title) : null

  const isArtSection = workProjects
    .find((p) => p.href === `/projects/${slug}`)
    ?.categories.includes('art') ?? false
  const dark = manifest.invert || manifest.theme === 'dark' || isArtSection

  const metaFields = (
    [
      ['Client', manifest.client],
      ['Role', manifest.role],
      ['Year', manifest.year],
      ['Location', manifest.location],
      ['Tags', manifest.tags?.join(' · ')],
    ] as const
  ).filter(([, value]) => Boolean(value))

  /**
   * WIP overlay is only shown to ONLINE visitors — in production
   * builds (e.g. Vercel). Locally (`next dev`) the flag is ignored so
   * Rafat can keep working on the page without the overlay in the way.
   */
  const wip = manifest.wip === true && process.env.NODE_ENV === 'production'

  // A film within the first two blocks (only intro text before it) is
  // promoted to sit directly under the title.
  const filmIndex = manifest.noMasthead
    ? -1
    : manifest.blocks.slice(0, 2).findIndex((b) => b.type === 'videoEmbed')
  const leadFilm =
    filmIndex >= 0 && manifest.blocks.slice(0, filmIndex).every((b) => b.type === 'text')
      ? manifest.blocks[filmIndex]
      : null
  const restBlocks = leadFilm
    ? manifest.blocks.filter((_, i) => i !== filmIndex)
    : manifest.blocks

  const workIndex = workProjects.findIndex((p) => p.href === `/projects/${slug}`)
  const nextProject =
    workIndex >= 0 && workProjects.length > 1
      ? workProjects[(workIndex + 1) % workProjects.length]
      : null

  return (
    <article
      className={`relative ${manifest.noMasthead ? '' : leadFilm ? 'pt-[12vh] md:pt-[16vh]' : 'pt-[12vh] md:pt-[24vh]'}`}
      style={{ overflowAnchor: 'none' }}
      {...(dark ? { 'data-invert': 'true', 'data-nav': 'dark' } : {})}
    >
      {wip && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          style={{
            background: 'rgba(10,10,10,0.92)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
          role="status"
          aria-live="polite"
        >
          <div className="px-6 text-center">
            <div
              className="font-bold uppercase text-white"
              style={{
                fontSize: 'clamp(72px, 14vw, 220px)',
                letterSpacing: '-0.05em',
                lineHeight: 0.92,
              }}
            >
              Soon
            </div>
            <div
              className="mt-6 uppercase text-white/65"
              style={{
                fontSize: 'clamp(11px, 1.2vw, 14px)',
                letterSpacing: '0.3em',
              }}
            >
              Work in progress · the project will be live very soon
            </div>
          </div>
        </div>
      )}
      <div
        className="pb-[var(--section-gap)]"
        style={wip ? { filter: 'blur(10px)' } : undefined}
        aria-hidden={wip || undefined}
      >
      {/* ─── Masthead, from the manifest's own fields ─── */}
      {!manifest.noMasthead && (
      <MastheadEntrance>
        <Page>
          <div data-masthead="title">
            <h1 className="t-display-l" {...directionProps(manifest.title)}>
              {manifest.title}
            </h1>
          </div>
        </Page>

        {/* Film-led projects: the film sits directly under the title so
            the work is on the first screen, ahead of summary and meta. */}
        {leadFilm && (
          <div className="pt-[clamp(24px,4vw,56px)]">
            <Blocks slug={slug} blocks={[leadFilm]} noRounding={manifest.noRounding} />
          </div>
        )}

        <Page>
          {manifest.summary && (
            <div data-masthead="summary" className="mt-4 md:mt-8">
              <p className="t-lede max-w-[60ch]" {...directionProps(manifest.summary)}>
                {manifest.summary}
              </p>
            </div>
          )}

          <div data-masthead="meta" className="mt-[clamp(20px,6vw,80px)]">
            <Rule />
            <dl className="grid-page mt-5 gap-y-6">
              {metaFields.map(([label, value]) => (
                <div key={label} data-masthead="meta-item" className="col-span-2 md:col-span-4 lg:col-span-3">
                  <dt>
                    <Meta secondary as="span">
                      {label}
                    </Meta>
                  </dt>
                  <dd className="mt-2 text-[15px] leading-[1.5]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Page>
      </MastheadEntrance>
      )}

      {/* ─── The blocks, in manifest order ─── */}
      <div className="pt-[var(--block-gap)]">
        <Blocks slug={slug} blocks={restBlocks} noRounding={manifest.noRounding} noBlockGaps={manifest.noBlockGaps} />
      </div>
      </div>

      <Page>
        <div className="pb-[clamp(64px,10vh,128px)]">
          <Rule />
          <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-baseline md:justify-between">
            {nextProject ? (
              <Link href={nextProject.href} className="all-projects-cta__link">
                Next: {nextProject.title} →
              </Link>
            ) : (
              <span />
            )}
            <Link href="/work" className="all-projects-cta__link">
              View all projects →
            </Link>
          </div>
        </div>
      </Page>
    </article>
  )
}
