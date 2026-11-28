import NextImage from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/primitives/Reveal'
import { projects } from '@/data/work'
import { categoryStages, selectedWorkIds, type StageId } from '@/data/framework'
import {
  frameworkText,
  localCapabilities,
  localEngagements,
  localStages,
} from '@/data/framework-i18n'
import { getLocale } from '@/lib/i18n-server'
import { localeHref, type Locale } from '@/lib/i18n'
import { t } from '@/data/i18n'
import { FrameworkSymbol } from './FrameworkSymbol'
import { BookingTrigger } from './BookingContext'
import { Arrow } from '@/components/ui/Arrow'

const stageTitleIn = (locale: Locale) => {
  const st = localStages(locale)
  return (id: StageId) => st.find((s) => s.id === id)!.title
}

/** Five small squares, one per stage: filled where this item lives. */
function StageDots({ active, locale }: { active: StageId[]; locale: Locale }) {
  const stageTitle = stageTitleIn(locale)
  return (
    <span
      className="fw-dots"
      role="img"
      aria-label={`${frameworkText(locale).stagesLabel}: ${active.map(stageTitle).join(locale === 'ar' ? '، ' : ', ')}`}
    >
      {localStages(locale).map((s) => (
        <span key={s.id} className="fw-dot" data-on={active.includes(s.id) || undefined} />
      ))}
    </span>
  )
}

/* ─── 08 · ONE VISION ────────────────────────────────────────────── */

export async function PartnershipSection() {
  const locale = await getLocale()
  const x = frameworkText(locale)
  const stageTitle = stageTitleIn(locale)
  return (
    <section className="fw-section page" aria-labelledby="partnership-title">
      <div className="fw-split">
        <div>
          <h2 id="partnership-title" className="fw-h2">
            <Reveal as="span" className="block uppercase">
              {x.visionBold}
            </Reveal>
            <Reveal as="span" delay={80} className="t-light block">
              {x.visionLight}
            </Reveal>
          </h2>
          <Reveal delay={160} className="mt-[clamp(24px,3vw,40px)] max-w-[46ch]">
            <p className="t-lede">
              {x.visionLede}
            </p>
          </Reveal>
        </div>
      </div>

      <ol className="fw-capabilities">
        {localCapabilities(locale).map((c, i) => (
          <Reveal as="li" key={c.index} delay={Math.min(i, 5) * 70} className="fw-cap">
            <span className="t-micro ink-secondary fw-cap-index">{c.index}</span>
            <span className="fw-cap-title">{c.title}</span>
            <span className="fw-cap-stages">
              <span className="t-micro ink-secondary fw-cap-stage-names">
                {c.stages.map(stageTitle).join(' · ')}
              </span>
              <StageDots active={c.stages} locale={locale} />
            </span>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

/* ─── 09 · ENGAGEMENT MODELS ─────────────────────────────────────── */

export async function EngagementSection() {
  const locale = await getLocale()
  const x = frameworkText(locale)
  const stageTitle = stageTitleIn(locale)
  return (
    <section className="fw-section page" aria-labelledby="engage-title">
      <h2 id="engage-title" className="fw-h2">
        <Reveal as="span" className="block uppercase">
          {x.waysBold}
        </Reveal>
        <Reveal as="span" delay={80} className="t-light block">
          {x.waysLight}
        </Reveal>
      </h2>

      <ul className="fw-engage">
        {localEngagements(locale).map((m, i) => (
          <Reveal as="li" key={m.title} delay={i * 80} className="fw-engage-item">
            <div className="fw-engage-top">
              <span className="t-micro ink-secondary">{x.model} {m.index}</span>
              <StageDots active={m.stages} locale={locale} />
            </div>
            <h3 className="fw-engage-title">{m.title}</h3>
            <p className="t-body ink-secondary">{m.forWhom}</p>
            <p className="fw-engage-scope">{m.scope}</p>
            <p className="t-micro ink-secondary fw-engage-stages">
              {m.stages.map(stageTitle).join(` ${t(locale).arrow} `)}
            </p>
            <BookingTrigger model={m.value} className="t-meta link fw-engage-link">
              {x.discuss} {t(locale).arrow}
            </BookingTrigger>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ─── 10 · STRATEGY IN ACTION ────────────────────────────────────── */

export async function SelectedWorkSection() {
  const locale = await getLocale()
  const x = frameworkText(locale)
  const d = t(locale)
  const stageTitle = stageTitleIn(locale)
  const items = selectedWorkIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p && !!p.cover)

  return (
    <section className="fw-section page" aria-labelledby="work-title">
      <div className="fw-section-head">
        <h2 id="work-title" className="fw-h2">
          <Reveal as="span" className="block uppercase">
            {x.workBold}
          </Reveal>
          <Reveal as="span" delay={80} className="t-light block">
            {x.workLight}
          </Reveal>
        </h2>
        <Reveal delay={160}>
          <Link href={localeHref('/work', locale)} className="t-meta link">
            {d.home.allProjects} {d.arrow}
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
                    {[p.client, d.work.categories[p.categories[0]]?.[0] ?? p.categories[0], p.year].filter(Boolean).join(' · ')}
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

export async function FinalCtaSection() {
  const x = frameworkText(await getLocale())
  return (
    <section className="fw-section fw-final page" aria-labelledby="cta-title">
      <h2 id="cta-title" className="fw-cta-title">
        <Reveal as="span" className="t-light block">
          {x.finalLight}
        </Reveal>
        <Reveal as="span" delay={80} className="block">
          {x.finalBold}
        </Reveal>
      </h2>
      <Reveal delay={160} className="mt-[clamp(24px,3vw,40px)] max-w-[52ch]">
        <p className="t-lede">
          {x.finalLede}
        </p>
      </Reveal>
      <Reveal delay={240} className="fw-final-actions">
        <BookingTrigger className="fw-btn">
          {x.book} <Arrow direction="up-right" />
        </BookingTrigger>
      </Reveal>
    </section>
  )
}
