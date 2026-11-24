import NextImage from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/primitives/Reveal'
import { categoryLabel, projects } from '@/data/work'
import {
  capabilities,
  categoryStages,
  engagements,
  selectedWorkIds,
  stages,
  type StageId,
} from '@/data/framework'
import { FrameworkSymbol } from './FrameworkSymbol'
import { BookingTrigger } from './BookingContext'
import { Arrow } from '@/components/ui/Arrow'

const stageTitle = (id: StageId) => stages.find((s) => s.id === id)!.title

/** Five small squares, one per stage: filled where this item lives. */
function StageDots({ active, label }: { active: StageId[]; label?: string }) {
  return (
    <span className="fw-dots" role="img" aria-label={label ?? `Stages: ${active.map(stageTitle).join(', ')}`}>
      {stages.map((s) => (
        <span key={s.id} className="fw-dot" data-on={active.includes(s.id) || undefined} />
      ))}
    </span>
  )
}

/* ─── 08 · ONE VISION ────────────────────────────────────────────── */

export function PartnershipSection() {
  return (
    <section className="fw-section page" aria-labelledby="partnership-title">
      <div className="fw-split">
        <div>
          <h2 id="partnership-title" className="fw-h2">
            <Reveal as="span" className="block uppercase">
              One Vision.
            </Reveal>
            <Reveal as="span" delay={80} className="t-light block">
              One Creative Direction.
            </Reveal>
          </h2>
          <Reveal delay={160} className="mt-[clamp(24px,3vw,40px)] max-w-[46ch]">
            <p className="t-lede">
              An integrated creative partnership connecting brand strategy, identity,
              communication and long-term development. One cohesive vision across every stage of
              your brand&rsquo;s journey.
            </p>
          </Reveal>
        </div>
      </div>

      <ol className="fw-capabilities">
        {capabilities.map((c, i) => (
          <Reveal as="li" key={c.index} delay={Math.min(i, 5) * 70} className="fw-cap">
            <span className="t-micro ink-secondary fw-cap-index">{c.index}</span>
            <span className="fw-cap-title">{c.title}</span>
            <span className="fw-cap-stages">
              <span className="t-micro ink-secondary fw-cap-stage-names">
                {c.stages.map(stageTitle).join(' · ')}
              </span>
              <StageDots active={c.stages} />
            </span>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

/* ─── 09 · ENGAGEMENT MODELS ─────────────────────────────────────── */

export function EngagementSection() {
  return (
    <section className="fw-section page" aria-labelledby="engage-title">
      <h2 id="engage-title" className="fw-h2">
        <Reveal as="span" className="block uppercase">
          Ways to
        </Reveal>
        <Reveal as="span" delay={80} className="t-light block">
          work together.
        </Reveal>
      </h2>

      <ul className="fw-engage">
        {engagements.map((m, i) => (
          <Reveal as="li" key={m.title} delay={i * 80} className="fw-engage-item">
            <div className="fw-engage-top">
              <span className="t-micro ink-secondary">Model {m.index}</span>
              <StageDots active={m.stages} />
            </div>
            <h3 className="fw-engage-title">{m.title}</h3>
            <p className="t-body ink-secondary">{m.forWhom}</p>
            <p className="fw-engage-scope">{m.scope}</p>
            <p className="t-micro ink-secondary fw-engage-stages">
              {m.stages.map(stageTitle).join(' → ')}
            </p>
            <BookingTrigger model={m.title} className="t-meta link fw-engage-link">
              Discuss this model →
            </BookingTrigger>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ─── 10 · STRATEGY IN ACTION ────────────────────────────────────── */

export function SelectedWorkSection() {
  const items = selectedWorkIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p && !!p.cover)

  return (
    <section className="fw-section page" aria-labelledby="work-title">
      <div className="fw-section-head">
        <h2 id="work-title" className="fw-h2">
          <Reveal as="span" className="block uppercase">
            Strategy
          </Reveal>
          <Reveal as="span" delay={80} className="t-light block">
            in Action.
          </Reveal>
        </h2>
        <Reveal delay={160}>
          <Link href="/work" className="t-meta link">
            All projects →
          </Link>
        </Reveal>
      </div>

      <ul className="fw-work">
        {items.map((p, i) => {
          const st = Array.from(new Set(p.categories.flatMap((c) => categoryStages[c] ?? [])))
          return (
            <Reveal as="li" key={p.id} delay={(i % 2) * 80}>
              <Link href={p.href} className="group fw-work-card">
                <span className="fw-work-media">
                  <NextImage
                    src={p.cover!}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="fw-work-img"
                    style={{ objectPosition: p.coverPosition ?? 'center' }}
                  />
                </span>
                <span className="fw-work-meta">
                  <span className="fw-work-title">{p.title}</span>
                  <span className="t-micro ink-secondary">
                    {[p.client, categoryLabel(p.categories[0]), p.year].filter(Boolean).join(' · ')}
                  </span>
                </span>
                <span className="fw-work-stages">
                  {st.map((id) => (
                    <span key={id} className="fw-chip t-micro">
                      <FrameworkSymbol id={id} className="fw-chip-symbol" />
                      {stageTitle(id)}
                    </span>
                  ))}
                </span>
              </Link>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}

/* ─── 11 · FINAL CTA ─────────────────────────────────────────────── */

export function FinalCtaSection() {
  return (
    <section className="fw-section fw-final page" aria-labelledby="cta-title">
      <h2 id="cta-title" className="fw-cta-title">
        <Reveal as="span" className="t-light block">
          Let&rsquo;s Build
        </Reveal>
        <Reveal as="span" delay={80} className="block">
          Something Meaningful.
        </Reveal>
      </h2>
      <Reveal delay={160} className="mt-[clamp(24px,3vw,40px)] max-w-[52ch]">
        <p className="t-lede">
          Whether you&rsquo;re launching a new brand, transforming an existing business or looking
          for a long-term creative partner, let&rsquo;s start with a conversation.
        </p>
      </Reveal>
      <Reveal delay={240} className="fw-final-actions">
        <BookingTrigger className="fw-btn">
          Book a Discovery Call <Arrow direction="up-right" />
        </BookingTrigger>
        <p className="t-micro ink-secondary">30-minute introductory conversation. No commitment.</p>
      </Reveal>
    </section>
  )
}
