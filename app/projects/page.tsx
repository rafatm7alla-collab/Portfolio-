import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllManifests, manifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta, Micro, SectionHeader } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Case studies generated from project manifests.',
  alternates: { canonical: '/projects' },
}

/**
 * Index generated entirely from the manifests — cover, title, client, year,
 * tags and summary. Adding a project means adding a JSON file; this page
 * needs no edit.
 */
export default function ProjectsIndex() {
  const manifests = getAllManifests()

  return (
    <section className="pb-[var(--section-gap)] pt-[26vh]">
      <Page>
        <SectionHeader
          bold="All"
          light="projects"
          count={String(manifests.length).padStart(2, '0')}
          as="h1"
        />
      </Page>

      {manifests.length === 0 ? (
        <Page>
          <Micro as="p" secondary className="mt-16">
            No manifests in /content/projects yet.
          </Micro>
        </Page>
      ) : (
        <Page>
          <ul className="mt-[clamp(48px,8vh,112px)] grid gap-[clamp(48px,7vh,96px)] md:grid-cols-2">
            {manifests.map((manifest, i) => {
              const cover = manifest.cover
                ? manifestImage(manifest.slug, manifest.cover, manifest.title)
                : null

              return (
                <li key={manifest.slug}>
                  <Reveal delay={Math.min(i, 5) * 70}>
                    <Link href={`/projects/${manifest.slug}`} className="group block">
                      {cover && (
                        <div className="overflow-hidden">
                          <BlockImage
                            image={cover}
                            sizes="(max-width: 768px) 100vw, 48vw"
                            fit="cover"
                            aspect="4 / 3"
                          />
                        </div>
                      )}

                      <h2
                        className="t-display-s mt-6 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[8px]"
                        {...directionProps(manifest.title)}
                      >
                        {manifest.title}
                      </h2>

                      <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                        {manifest.client && <Meta as="span">{manifest.client}</Meta>}
                        {manifest.year && (
                          <Meta as="span" secondary>
                            {manifest.year}
                          </Meta>
                        )}
                      </div>

                      {manifest.summary && (
                        <p
                          className="t-body mt-4 max-w-[52ch]"
                          {...directionProps(manifest.summary)}
                        >
                          {manifest.summary}
                        </p>
                      )}

                      {manifest.tags && manifest.tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                          {manifest.tags.map((tag) => (
                            <li key={tag}>
                              <Micro secondary as="span">
                                {tag}
                              </Micro>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Link>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </Page>
      )}
    </section>
  )
}
