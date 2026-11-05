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

  const wip = manifest.wip === true

  return (
    <article
      className={`relative ${manifest.noMasthead ? '' : 'pt-[12vh] md:pt-[24vh]'}`}
      style={{ overflowAnchor: 'none' }}
      {...(dark ? { 'data-invert': 'true', 'data-nav': 'dark' } : {})}
    >
      {wip && (
        <>
          {/* Floating "work in progress" overlay sits above the blurred
              content. Flip `wip` to false in the manifest when the page
              is ready to publish. */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center"
          >
            <div
              className="pointer-events-auto rounded-2xl px-10 py-10 text-center shadow-2xl backdrop-blur-xl"
              style={{
                background: 'rgba(10,10,10,0.72)',
                border: '1px solid rgba(255,255,255,0.08)',
                maxWidth: 'min(520px, 86vw)',
              }}
            >
              <div
                className="font-bold uppercase text-white"
                style={{
                  fontSize: 'clamp(44px, 7vw, 96px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                Soon
              </div>
              <div
                className="mt-4 uppercase text-white/60"
                style={{
                  fontSize: 'clamp(10px, 1vw, 12px)',
                  letterSpacing: '0.28em',
                }}
              >
                Work in progress · Will be uploaded soon
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[70]"
            style={{ background: 'rgba(0,0,0,0.25)' }}
          />
        </>
      )}
      <div
        className="pb-[var(--section-gap)]"
        style={wip ? { filter: 'blur(14px)', pointerEvents: 'none' } : undefined}
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
        <Blocks slug={slug} blocks={manifest.blocks} noRounding={manifest.noRounding} noBlockGaps={manifest.noBlockGaps} />
      </div>

      <Page>
        <div className="pt-[var(--block-gap-lg)]">
          <Rule />
          <div className="flex items-baseline justify-between pt-5">
            <Micro as="span" secondary>
              {manifest.blocks.length} blocks
            </Micro>
            <Link href="/projects" className="t-meta link link--back-arrow">
              All projects →
            </Link>
          </div>
        </div>
      </Page>

      {cover?.missing && (
        <Page>
          <Micro as="p" secondary className="pt-6">
            Cover not found: {cover.filename}
          </Micro>
        </Page>
      )}
      </div>

      <section className="all-projects-cta">
        <Link href="/work" className="all-projects-cta__link">
          View all projects →
        </Link>
      </section>
    </article>
  )
}
