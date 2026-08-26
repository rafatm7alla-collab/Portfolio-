import { ImageResponse } from 'next/og'
import { getProject, projectSlugs } from '@/data/projects'
import { profile } from '@/data/profile'

export const alt = 'Project'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

/** Per-project card. Index number, title, services — nothing else. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#000000',
          padding: '64px',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: '3.6px', textTransform: 'uppercase' }}>
          {project?.index ?? '—'}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: project && project.title.length > 22 ? 84 : 116,
            fontWeight: 700,
            letterSpacing: '-4px',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            maxWidth: '90%',
          }}
        >
          {project?.title ?? profile.name}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 20,
            letterSpacing: '3.6px',
            textTransform: 'uppercase',
          }}
        >
          <div>
            {project
              ? [project.category, project.year].filter(Boolean).join(' · ')
              : ''}
          </div>
          <div>{profile.name}</div>
        </div>
      </div>
    ),
    size,
  )
}
