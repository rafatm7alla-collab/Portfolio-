'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import type { Project } from '@/types/project'
import './PortfolioShowcase.css'

interface PortfolioShowcaseProps {
  projects: Project[]
}

const PROJECT_ORDER = [
  { slug: 'toyota-crown', layout: 'fullwidth', reverse: false, stacked: false },
  { slug: 'dubairaq', layout: 'wide', reverse: false, stacked: false },
  { slug: 'lexus-lx-2024', layout: 'centered', reverse: false, stacked: false },
  { slug: 'al-zaytoun-terraces', layout: 'fullwidth', reverse: false, stacked: false },
  { slug: 'vision-house', layout: 'split', reverse: false, stacked: false },
  { slug: 'praline', layout: 'fullwidth', reverse: false, stacked: false },
  { slug: 'land-rover-kurdistan', layout: 'fullwidth', reverse: false, stacked: false },
]

function ProjectFooter({ title }: { title: string }) {
  return (
    <div className="portfolio-project-footer">
      <h2 className="portfolio-project-footer-title">{title}</h2>
      <div className="portfolio-cta">
        <span className="portfolio-cta-text">View Full Project</span>
        <span className="portfolio-cta-fold" />
      </div>
    </div>
  )
}

export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const orderedProjects = PROJECT_ORDER
    .map(order => projects.find(p => p.slug === order.slug))
    .filter((p): p is Project => p !== undefined)

  return (
    <div className="portfolio-showcase">
      {orderedProjects.map((project, index) => {
        const orderConfig = PROJECT_ORDER[index]
        const layout = orderConfig.layout
        const zIndex = index + 1

        if (layout === 'split') {
          const reverse = orderConfig.reverse === true
          const stacked = orderConfig.stacked === true
          const modifierClass = stacked
            ? ' portfolio-split-item--stacked'
            : reverse
              ? ' portfolio-split-item--reverse'
              : ''
          return (
            <div className="portfolio-stack-wrapper" key={project.slug} style={{ zIndex }}>
              <Link
                href={`/work/${project.slug}`}
                className={`group portfolio-split-item${modifierClass}`}
              >
                <div className="portfolio-split-image-wrapper">
                  {project.hero.image?.src && (
                    <div className="desaturate group-hover:scale-[1.02] h-full w-full">
                      <NextImage
                        src={project.hero.image.src}
                        alt={project.hero.image.alt || project.title}
                        width={1200}
                        height={900}
                        className="portfolio-split-image"
                        quality={85}
                      />
                    </div>
                  )}
                </div>

                <div className="portfolio-split-text">
                  <h2 className="portfolio-split-title">{project.title}</h2>
                  <div className="portfolio-cta">
                    <span className="portfolio-cta-text">View Full Project</span>
                    <span className="portfolio-cta-fold" />
                  </div>
                </div>
              </Link>
            </div>
          )
        } else if (layout === 'wide') {
          return (
            <div className="portfolio-stack-wrapper" key={project.slug} style={{ zIndex }}>
              <Link
                href={`/work/${project.slug}`}
                className="group portfolio-wide-item"
              >
                <div className="portfolio-wide-content">
                  <div className="portfolio-wide-image-wrapper">
                    {project.hero.image?.src && (
                      <div className="desaturate group-hover:scale-[1.02] h-full w-full">
                        <NextImage
                          src={project.hero.image.src}
                          alt={project.hero.image.alt || project.title}
                          width={2800}
                          height={1399}
                          className="portfolio-wide-image"
                          quality={85}
                        />
                      </div>
                    )}
                  </div>

                  <ProjectFooter title={project.title} />
                </div>
              </Link>
            </div>
          )
        } else if (layout === 'centered') {
          return (
            <div className="portfolio-stack-wrapper" key={project.slug} style={{ zIndex }}>
              <Link
                href={`/work/${project.slug}`}
                className="group portfolio-centered-item"
              >
                <div className="portfolio-centered-content">
                  <div className="portfolio-centered-image-wrapper">
                    {project.hero.image?.src && (
                      <div className="desaturate group-hover:scale-[1.02] h-full w-full">
                        <NextImage
                          src={project.hero.image.src}
                          alt={project.hero.image.alt || project.title}
                          width={1000}
                          height={800}
                          className="portfolio-centered-image"
                          quality={85}
                        />
                      </div>
                    )}
                  </div>

                  <ProjectFooter title={project.title} />
                </div>
              </Link>
            </div>
          )
        } else {
          return (
            <div className="portfolio-stack-wrapper" key={project.slug} style={{ zIndex }}>
              <Link
                href={`/work/${project.slug}`}
                className="group portfolio-fullwidth-item"
              >
                <div className="portfolio-fullwidth-header">
                  <h2 className="portfolio-fullwidth-title">{project.title}</h2>
                </div>

                <div className="portfolio-fullwidth-image-wrapper">
                  {project.hero.image?.src && (
                    <div className="desaturate group-hover:scale-[1.02] h-full w-full">
                      <NextImage
                        src={project.hero.image.src}
                        alt={project.hero.image.alt || project.title}
                        width={1400}
                        height={900}
                        className="portfolio-fullwidth-image"
                        quality={85}
                      />
                    </div>
                  )}
                </div>

                <div className="portfolio-fullwidth-footer">
                  <div className="portfolio-cta">
                    <span className="portfolio-cta-text">View Full Project</span>
                    <span className="portfolio-cta-fold" />
                  </div>
                </div>
              </Link>
            </div>
          )
        }
      })}
    </div>
  )
}
