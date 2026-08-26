import type { Project } from '@/types/project'
import { Image } from '@/components/media/Image'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta, PlaceholderTag } from '@/components/type/Type'

/**
 * Two variants, alternating across the set so that no two case studies
 * open the same way. Which one a project uses is stored in its data.
 */
export function CaseHero({ project, total }: { project: Project; total: number }) {
  if (project.hero.variant === 'typographic') {
    return (
      <header className="relative">
        <Page>
          <div className="flex min-h-[82vh] flex-col justify-between pb-[clamp(40px,6vh,80px)] pt-[26vh]">
            <Reveal>
              <Meta secondary as="p">
                {project.index} / {String(total).padStart(2, '0')}
              </Meta>
            </Reveal>

            <div>
              <Reveal delay={80}>
                <h1 className="t-display-xl">{project.title}</h1>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Meta as="p">
                    {[project.category, project.year].filter(Boolean).join(' · ')}
                  </Meta>
                  {project.isPlaceholder && <PlaceholderTag />}
                </div>
              </Reveal>
            </div>
          </div>
        </Page>
      </header>
    )
  }

  return (
    <header>
      <div className="bleed">
        {/* No forced aspect and no max-height. Campaign key visuals carry
            their own typography, and a 16:9 crop clips it. A max-height does
            not help either — combined with aspect-ratio it shrinks the box
            instead of cropping, so the "full bleed" stopped short of the
            right edge. The artwork governs its own ratio. */}
        <Image image={project.hero.image!} sizes="100vw" priority />
      </div>
    </header>
  )
}
