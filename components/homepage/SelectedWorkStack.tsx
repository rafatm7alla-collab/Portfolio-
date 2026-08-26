'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import type { Project } from '@/types/project'
import './SelectedWorkStack.css'

interface SelectedWorkStackProps {
  projects: Project[]
}

export function SelectedWorkStack({ projects }: SelectedWorkStackProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const windowHeight = window.innerHeight

      // Stacking starts when container top reaches top of viewport
      // Progress goes from 0 to 1 as we scroll through the container
      const scrollStart = windowHeight
      const scrollEnd = -containerHeight

      let progress = (scrollStart - containerTop) / (scrollStart - scrollEnd)
      progress = Math.max(0, Math.min(1, progress))

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Call once on mount to set initial state
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="work-portfolio-container work-portfolio-stack" ref={containerRef}>
      {projects.map((project, index) => {
        // Calculate transform for each project based on scroll progress
        // Each project should rise as we scroll
        const totalProjects = projects.length
        const projectScrollRange = 1 / totalProjects

        // When does this project start to rise?
        const projectStartProgress = index * projectScrollRange
        const projectEndProgress = (index + 1) * projectScrollRange

        let translateY = 0
        if (scrollProgress >= projectEndProgress) {
          // Project has fully risen, move it up completely (off-screen)
          translateY = -100
        } else if (scrollProgress >= projectStartProgress) {
          // Project is currently rising
          const localProgress = (scrollProgress - projectStartProgress) / projectScrollRange
          translateY = -100 * localProgress
        } else {
          // Project hasn't started rising yet - start below viewport
          translateY = 100
        }

        const zIndex = totalProjects - index

        return (
          <Link
            key={project.slug}
            href={project.next ? `/projects/${project.slug}` : project.slug}
            className="work-portfolio-item"
            style={{
              transform: `translateY(${translateY}%)`,
              zIndex: zIndex,
            }}
          >
            <div className="work-portfolio-content">
              <div className="work-portfolio-text">
                <div className="work-portfolio-index">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h2 className="work-portfolio-title">{project.title}</h2>
                {project.role && (
                  <p className="work-portfolio-meta">{project.role}</p>
                )}
                {project.category && (
                  <p className="work-portfolio-category">{project.category}</p>
                )}
              </div>
              <div className="work-portfolio-image">
                {project.hero.image?.src && (
                  <NextImage
                    src={project.hero.image.src}
                    alt={project.hero.image.alt || project.title}
                    fill
                    className="work-image"
                    quality={85}
                    priority={index === 0}
                  />
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
