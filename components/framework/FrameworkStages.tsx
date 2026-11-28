'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { ScrollTrigger } from '@/lib/gsap'
import { useLocale } from '@/components/i18n/LocaleProvider'
import { frameworkText, localStages } from '@/data/framework-i18n'
import { FrameworkSymbol } from './FrameworkSymbol'

/**
 * The five-stage methodology.
 *
 * Desktop (≥1024): five columns on one hairline rail. As the section scrolls
 * through, the rail fills left to right (scrubbed) and each stage's mark
 * turns and settles into place once the fill reaches it, latched so it
 * never plays back on scroll-up.
 * Below 1024: the same markup becomes a vertical journey: the rail runs
 * down the left edge and fills top to bottom.
 *
 * Services expand per stage with a real <button aria-expanded>. The panel
 * is in the DOM from the start (hidden), so it is readable without JS.
 */
export function FrameworkStages() {
  const locale = useLocale()
  const stages = localStages(locale)
  const x = frameworkText(locale)
  const rail = useRef<HTMLOListElement>(null)
  const [reached, setReached] = useState(0)
  const [open, setOpen] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const el = rail.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--rail', '1')
      setReached(stages.length)
      return
    }
    let max = 0
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      end: 'bottom 55%',
      onUpdate: (self) => {
        el.style.setProperty('--rail', String(self.progress))
        // the fill passes stage i at i / (n - 1); light it just before
        const n = Math.min(stages.length, Math.floor(self.progress * (stages.length - 1) + 1.15))
        if (n > max) {
          max = n
          setReached(n)
        }
      },
    })
    return () => st.kill()
  }, [stages.length])

  const allOpen = stages.every((s) => open[s.id])

  return (
    <section id="framework" className="fw-section page" aria-labelledby="framework-title">
      <div className="fw-section-head">
        <h2 id="framework-title" className="fw-h2">
          <Reveal as="span" className="block uppercase">
            {x.stagesBold}
          </Reveal>
          <Reveal as="span" delay={80} className="t-light block">
            {x.stagesLight}
          </Reveal>
        </h2>
        <Reveal delay={160}>
          <button
            type="button"
            className="fw-expand-all t-meta"
            aria-expanded={allOpen}
            aria-controls={stages.map((s) => `fw-services-${s.id}`).join(' ')}
            onClick={() =>
              setOpen(Object.fromEntries(stages.map((s) => [s.id, !allOpen])))
            }
          >
            <span>{allOpen ? x.collapseAll : x.expandAll}</span>
            <span className="fw-plus" aria-hidden="true" />
          </button>
        </Reveal>
      </div>

      <ol ref={rail} className="fw-stages">
        <span className="fw-rail" aria-hidden="true">
          <span className="fw-rail-fill" />
        </span>

        {stages.map((s, i) => {
          const isOpen = !!open[s.id]
          return (
            <li key={s.id} className="fw-stage" data-reached={i < reached || undefined}>
              <div className="fw-node">
                <span className="fw-node-mark">
                  <FrameworkSymbol id={s.id} className="fw-symbol" />
                </span>
              </div>

              <div className="fw-stage-body">
                <p className="t-micro ink-secondary">{s.index}</p>
                <h3 className="fw-stage-title">{s.title}</h3>
                <p className="fw-stage-tagline">{s.tagline}</p>
                <p className="t-body ink-secondary fw-stage-desc">{s.description}</p>

                <button
                  type="button"
                  className="fw-toggle t-meta"
                  aria-expanded={isOpen}
                  aria-controls={`fw-services-${s.id}`}
                  onClick={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))}
                >
                  <span>{x.services}</span>
                  <span className="fw-plus" aria-hidden="true" />
                </button>

                <div id={`fw-services-${s.id}`} className="fw-services" hidden={!isOpen}>
                  <ul>
                    {s.services.map((svc) => (
                      <li key={svc}>{svc}</li>
                    ))}
                  </ul>
                  <div className="fw-outcome-block">
                    <p className="t-micro ink-secondary">{x.outcome}</p>
                    <p className="fw-outcome">{s.outcome}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
