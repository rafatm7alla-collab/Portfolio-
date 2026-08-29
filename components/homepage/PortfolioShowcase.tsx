'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import type { Project } from '@/types/project'
import './PortfolioShowcase.css'

interface PortfolioShowcaseProps {
  projects: Project[]
}

function CTA() {
  return (
    <div className="portfolio-cta">
      <span className="portfolio-cta-text">View Full Project</span>
    </div>
  )
}

function FullwidthCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group portfolio-card portfolio-card--fullwidth">
      <h2 className="portfolio-card-title">{project.title}</h2>
      <div className="portfolio-card-image-wrapper">
        {project.hero.image?.src && (
          <div className="desaturate group-hover:scale-[1.02] h-full w-full">
            <NextImage
              src={project.hero.image.src}
              alt={project.hero.image.alt || project.title}
              width={1400}
              height={900}
              className="portfolio-card-image"
              quality={85}
            />
          </div>
        )}
      </div>
      <div className="portfolio-card-footer">
        <CTA />
      </div>
    </Link>
  )
}

function PairedRow({ left, right }: { left: Project; right: Project }) {
  return (
    <div className="portfolio-paired-row">
      <Link href={`/work/${left.slug}`} className="group portfolio-card portfolio-card--paired portfolio-card--paired-left">
        <div className="portfolio-card-image-wrapper">
          {left.hero.image?.src && (
            <div className="desaturate group-hover:scale-[1.02] h-full w-full">
              <NextImage
                src={left.hero.image.src}
                alt={left.hero.image.alt || left.title}
                width={1400}
                height={900}
                className="portfolio-card-image"
                quality={85}
              />
            </div>
          )}
        </div>
        <div className="portfolio-card-footer">
          <h2 className="portfolio-card-footer-title">{left.title}</h2>
          <CTA />
        </div>
      </Link>

      <Link href={`/work/${right.slug}`} className="group portfolio-card portfolio-card--paired portfolio-card--paired-right">
        <div className="portfolio-card-image-wrapper">
          {right.hero.image?.src && (
            <div className="desaturate group-hover:scale-[1.02] h-full w-full">
              <NextImage
                src={right.hero.image.src}
                alt={right.hero.image.alt || right.title}
                width={1000}
                height={800}
                className="portfolio-card-image"
                quality={85}
              />
            </div>
          )}
        </div>
        <div className="portfolio-card-footer">
          <h2 className="portfolio-card-footer-title">{right.title}</h2>
          <CTA />
        </div>
      </Link>
    </div>
  )
}

function SplitCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group portfolio-card portfolio-card--split">
      <div className="portfolio-card-image-wrapper">
        {project.hero.image?.src && (
          <div className="desaturate group-hover:scale-[1.02] h-full w-full">
            <NextImage
              src={project.hero.image.src}
              alt={project.hero.image.alt || project.title}
              width={1200}
              height={900}
              className="portfolio-card-image"
              quality={85}
            />
          </div>
        )}
      </div>
      <div className="portfolio-split-text">
        <h2 className="portfolio-split-title">{project.title}</h2>
        <CTA />
      </div>
    </Link>
  )
}

export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const find = (slug: string) => projects.find(p => p.slug === slug)

  const toyota = find('toyota-crown')
  const dubairaq = find('dubairaq')
  const lexus = find('lexus-lx-2024')
  const zaytoun = find('al-zaytoun-terraces')
  const vision = find('vision-house')
  const praline = find('praline')
  const landrover = find('land-rover-kurdistan')

  return (
    <div className="portfolio-showcase">
      {toyota && <FullwidthCard project={toyota} />}

      {dubairaq && lexus && <PairedRow left={dubairaq} right={lexus} />}

      {zaytoun && <FullwidthCard project={zaytoun} />}

      {vision && <SplitCard project={vision} />}

      {praline && <FullwidthCard project={praline} />}

      {landrover && <FullwidthCard project={landrover} />}
    </div>
  )
}
