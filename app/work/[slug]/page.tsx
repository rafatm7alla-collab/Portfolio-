import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, getNextProject, projects, projectSlugs } from '@/data/projects'
import { CaseHero } from '@/components/case/CaseHero'
import {
  CaseMeta,
  CaseLede,
  CaseText,
  CaseRole,
  CaseGallery,
  CaseCredits,
} from '@/components/case/CaseBlocks'
import { NextProject } from '@/components/work/NextProject'

type Params = { params: Promise<{ slug: string }> }

/** Every case study is statically generated at build. */
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: 'article',
      url: `/work/${project.slug}`,
    },
    // Unapproved copy must never be indexed as real work.
    robots: project.isPlaceholder ? { index: false, follow: false } : undefined,
  }
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = getNextProject(slug)

  // The brief is rendered from the dedicated field, so drop any duplicate
  // "The Brief" text block that a data file also declares.
  const sections = project.sections.filter(
    (s) => !(s.type === 'text' && s.label.toLowerCase() === 'the brief'),
  )

  return (
    <article>
      <CaseHero project={project} total={projects.length} />
      <CaseMeta project={project} />
      <CaseLede text={project.lede} />
      <CaseText label="The Brief" body={project.brief} />
      <CaseRole project={project} />
      <CaseGallery sections={sections} />
      {project.credits && project.credits.length > 0 && (
        <CaseCredits credits={project.credits} />
      )}
      {next && <NextProject project={next} />}
    </article>
  )
}
