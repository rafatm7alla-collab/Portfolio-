import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { Fragment } from 'react'
import { arPhrases, manifestImage, translateStrings } from '@/lib/manifest'
import { localeHref, type Locale } from '@/lib/i18n'
import { t } from '@/data/i18n'
import { BlockImage } from '@/components/blocks/BlockImage'
import { FullBleedBlock } from '@/components/blocks/FullBleedBlock'
import { LocalVideoBlock } from '@/components/blocks/LocalVideoBlock'
import { Reveal } from '@/components/primitives/Reveal'
import Link from 'next/link'
import { Page, Rule } from '@/components/primitives/Layout'
import { projects as workProjects } from '@/data/work'
import {
  SLUG,
  chapters as sourceChapters,
  cover,
  swatches as sourceSwatches,
  type Banner,
  type Swatch,
  type GuideBlock,
  type GuideChapter,
} from '@/data/zaytoun-guidelines'

/**
 * Al Zaytoun Terraces as a brand-guideline case study.
 *
 * Laid out like every other project page: one column, banners at the full
 * page width, the same hero and meta bar. Chapters and sections are only
 * numbered titles in that flow — no side index, no split columns.
 */

const dir = join(process.cwd(), 'public', 'projects', SLUG)
const isReady = (b: Banner) => existsSync(join(dir, b.file))
const isVideo = (b: Banner) => /\.(mp4|webm|mov)$/i.test(b.file)
const anchor = (id: string) => `b-${id.replace(/\./g, '-')}`

/**
 * Online (production build) the page shows only what exists: empty banner
 * slots are dropped, a section whose banners are all still missing is
 * hidden, and a chapter with nothing left is hidden. Locally (`next dev`)
 * every empty holder and every {{to confirm}} highlight stays visible so
 * Rafat can see what is still to make.
 */
const LIVE = process.env.NODE_ENV === 'production'

function visibleChapters(chapters: GuideChapter[]): GuideChapter[] {
  if (!LIVE) return chapters
  return chapters
    .map((c) => ({
      ...c,
      sections: c.sections
        .map((s) => {
          const hadBanners = s.blocks.some((b) => b.kind === 'banners')
          const blocks = s.blocks
            .map((b) => (b.kind === 'banners' ? { ...b, items: b.items.filter(isReady) } : b))
            .filter((b) => !(b.kind === 'banners' && b.items.length === 0))
          const hasBanners = blocks.some((b) => b.kind === 'banners')
          return hadBanners && !hasBanners ? null : { ...s, blocks }
        })
        .filter((s): s is NonNullable<typeof s> => s !== null),
    }))
    .filter((c) => c.sections.length > 0)
}

/** Text inside {{…}} is still to be confirmed: shown highlighted. */
function Rich({ text }: { text: string }) {
  if (LIVE) return <>{text.replace(/\{\{(.*?)\}\}/g, '$1')}</>
  return (
    <>
      {text.split(/(\{\{.*?\}\})/g).map((p, i) =>
        p.startsWith('{{') ? (
          <mark key={i} className="gl-tbc">
            {p.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  )
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const hexOf = (name: string) => sourceSwatches.find((s) => s.name === name)!.hex

/** Mix a hex colour toward white (amount > 0) or black (amount < 0). */
function mix(hex: string, amount: number) {
  const target = amount > 0 ? 255 : 0
  const t = Math.abs(amount)
  return (
    '#' +
    [1, 3, 5]
      .map((i) => {
        const c = parseInt(hex.slice(i, i + 2), 16)
        return Math.round(c + (target - c) * t)
          .toString(16)
          .padStart(2, '0')
      })
      .join('')
  )
}
/** Three tints, the base, three shades. */
const TONAL_STEPS = [0.66, 0.4, 0.18, 0, -0.2, -0.43, -0.67]
/** Ink or white, whichever reads better on the chip. */
const labelOn = (hex: string) => (contrast(hex, '#111111') >= contrast(hex, '#ffffff') ? '#111111' : '#ffffff')

/* ─── banners ─────────────────────────────────────────────────────────
 * Full page width, square corners, no captions between them. Banners in
 * one set sit flush against each other so a run of mockups reads as one
 * continuous strip (the Behance way). The number and title live inside
 * the empty holder only.
 */

function BannerView({ banner }: { banner: Banner }) {
  if (isReady(banner) && isVideo(banner)) {
    // Same player as the other project pages: muted, looping, starts as it
    // scrolls into view, on a dark ground — never a blank white frame.
    return (
      <div id={anchor(banner.id)} className="gl-anchor">
        <LocalVideoBlock
          src={`/projects/${SLUG}/${banner.file}`}
          title=""
          missing={false}
          aspect="1920 / 1080"
          noRounding
        />
      </div>
    )
  }

  if (isReady(banner)) {
    return (
      <div id={anchor(banner.id)} className="gl-anchor">
        <FullBleedBlock image={manifestImage(SLUG, banner.file, banner.title)} noParallax noRounding />
      </div>
    )
  }

  return (
    <div id={anchor(banner.id)} className="gl-anchor page">
      <div className="gl-holder">
        <span className="t-micro gl-holder-id">Banner {banner.id}</span>
        <span className="gl-holder-title">{banner.title}</span>
        <span className="t-micro ink-secondary">2400 px wide · any height</span>
        <code className="gl-file">{banner.file}</code>
      </div>
    </div>
  )
}

/** Project facts on a fixed four-column grid, so every label lines up. */
function MetaGrid({ rows }: { rows: [string, string][] }) {
  return (
    <div className="page">
      <dl className="gl-meta">
        {rows.map(([label, value]) => (
          <div key={label} className="gl-meta-cell">
            <dt className="t-micro ink-secondary">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ─── blocks ──────────────────────────────────────────────────────── */

function BlockView({ block, swatches }: { block: GuideBlock; swatches: Swatch[] }) {
  switch (block.kind) {
    case 'banners':
      return (
        <div className="gl-banners">
          {block.items.map((b) => (
            <BannerView key={b.id} banner={b} />
          ))}
        </div>
      )
    case 'meta':
      return <MetaGrid rows={block.rows} />
    case 'text':
      return (
        <div className="page">
          <p className="t-body max-w-[65ch]">
            <Rich text={block.body} />
          </p>
        </div>
      )
    case 'specs':
      return (
        <div className="page">
          <dl className="gl-specs">
            {block.rows.map(([k, v]) => (
              <div key={k} className="gl-spec-row">
                <dt className="t-micro ink-secondary">{k}</dt>
                <dd>
                  <Rich text={v} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'cards':
      return (
        <div className="page">
          <ul className="gl-values">
            {block.items.map((c, i) => (
              <li key={c.title} className="gl-value">
                <span className="t-micro ink-secondary">{String(i + 1).padStart(2, '0')}</span>
                <span className="t-headline">{c.title}</span>
                <span className="t-body ink-secondary">{c.body}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'rules':
      return (
        <div className="page">
          <div className="gl-rules">
            {(['do', 'dont'] as const).map((kind) => (
              <div key={kind} className="gl-rule" data-kind={kind}>
                <p className="t-micro gl-rule-head">
                  <span className="gl-rule-mark" aria-hidden="true" /> {kind === 'do' ? 'Do' : 'Don’t'}
                </p>
                <ul>
                  {block[kind].map((r) => (
                    <li key={r}>
                      <Rich text={r} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )
    case 'swatches':
      return (
        <div className="page">
          <ul className="gl-swatches">
            {swatches
              .filter((s) => s.group === block.group)
              .map((s) => (
                <li key={s.name}>
                  <span className="gl-chip" style={{ background: s.hex }} />
                  <span className="gl-swatch-name">{s.name}</span>
                  <span className="t-micro ink-secondary">{s.hex}</span>
                  <span className="t-body ink-secondary mt-2 block">{s.role}</span>
                </li>
              ))}
          </ul>
        </div>
      )
    case 'contrast':
      return (
        <div className="page">
          <ul className="gl-contrast">
            {block.pairs.map(([fg, bg]) => {
              const ratio = contrast(hexOf(fg), hexOf(bg))
              const verdict = ratio >= 4.5 ? 'All text' : ratio >= 3 ? 'Large text only' : 'Decorative only'
              return (
                <li key={fg + bg} className="gl-pairing" style={{ background: hexOf(bg), color: hexOf(fg) }}>
                  <span className="gl-pairing-aa">Aa</span>
                  <span className="t-micro">
                    {fg} on {bg}
                  </span>
                  <span className="t-micro">
                    {ratio.toFixed(1)} : 1 · {verdict}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )
    case 'tonal':
      return (
        <div className="page">
          {/* One solid block: a column per colour, tints above the base, shades below. */}
          <div className="gl-tonal">
            {swatches.map((s) => (
              <ul key={s.name} className="gl-tonal-col" aria-label={`${s.name} tonal range`}>
                {TONAL_STEPS.map((step) => {
                  const base = step === 0
                  const hex = base ? s.hex.toUpperCase() : mix(s.hex, step).toUpperCase()
                  return (
                    <li
                      key={step}
                      className={base ? 'gl-tone gl-tone--base' : 'gl-tone'}
                      style={{ background: hex, color: labelOn(hex) }}
                    >
                      {base && <span className="gl-tone-name">{s.name}</span>}
                      <span className="gl-tone-hex">{hex}</span>
                    </li>
                  )
                })}
              </ul>
            ))}
          </div>
        </div>
      )
    case 'proportion':
      return (
        <div className="page">
          <div className="gl-proportion">
            <div className="gl-proportion-bar" aria-hidden="true">
              {block.parts.map(([name, pct]) => (
                <span key={name} style={{ flexGrow: pct, background: hexOf(name) }} />
              ))}
            </div>
            <ul className="gl-proportion-legend">
              {block.parts.map(([name, pct]) => (
                <li key={name} style={{ flexGrow: pct }}>
                  <span className="gl-proportion-pct">{pct}%</span>
                  <span className="t-micro ink-secondary">
                    {name} · {hexOf(name)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
  }
}

/* ─── page ────────────────────────────────────────────────────────── */

/** Guideline fields that hold readable text (swatch names, ids and files stay as they are). */
const GUIDE_TEXT = new Set(['title', 'intro', 'body', 'rows', 'role'])

export function ZaytounGuidelines({ locale = 'en' }: { locale?: Locale }) {
  const d = t(locale)
  const map = locale === 'ar' ? arPhrases(SLUG) : {}
  const tx = (s: string) => map[s] ?? s
  const chapters = locale === 'ar' ? translateStrings(sourceChapters, map, GUIDE_TEXT) : sourceChapters
  const swatches = locale === 'ar' ? translateStrings(sourceSwatches, map, GUIDE_TEXT) : sourceSwatches
  const workIndex = workProjects.findIndex((p) => p.href === `/projects/${SLUG}`)
  const nextProject =
    workIndex >= 0 && workProjects.length > 1
      ? workProjects[(workIndex + 1) % workProjects.length]
      : null

  return (
    <article className="gl">

      <div id={anchor(cover.id)} className="gl-anchor page">
        <div className="relative overflow-hidden">
          <BlockImage
            image={manifestImage(SLUG, cover.file, 'Al Zaytoun Terraces')}
            sizes="(max-width: 768px) 100vw, 92vw"
            fit="natural"
            priority
            noRounding
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <div className="absolute inset-x-0 bottom-0 p-[clamp(20px,3.6vw,56px)]">
            <Reveal>
              <h1 className="t-display-l text-white">Al Zaytoun Terraces</h1>
            </Reveal>
            <Reveal delay={80} className="mt-4">
              <p className="t-lede max-w-[60ch] text-white/80">
                {tx('Brand Guidelines — Where contemporary design meets heritage')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {visibleChapters(chapters).map((c) => (
        <section key={c.num} className="gl-chapter" aria-labelledby={`ch-${c.num}`}>
          <header className="page">
            <Reveal>
              <span className="gl-chapter-num">{c.num}</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 id={`ch-${c.num}`} className="t-display-l uppercase">
                {c.title}
              </h2>
            </Reveal>
            <Reveal delay={160} className="mt-6 max-w-[52ch]">
              <p className="t-lede">{c.intro}</p>
            </Reveal>
          </header>

          {c.sections.map((s) => (
            <section key={s.num} className="gl-section" aria-labelledby={`s-${s.num}`}>
              <header className="page">
                <Reveal>
                  <p className="t-micro ink-secondary">{s.num}</p>
                  <h3 id={`s-${s.num}`} className="t-headline mt-3">
                    {s.title}
                  </h3>
                </Reveal>
              </header>
              {s.blocks.map((b, i) => (
                <Reveal key={i} className="gl-block">
                  <BlockView block={b} swatches={swatches} />
                </Reveal>
              ))}
            </section>
          ))}
        </section>
      ))}

      <section className="gl-chapter">
        <MetaGrid
          rows={(
            [
              ['Brand identity & art direction', 'Rafat Mhalla'],
              ['Client', 'Al Zaytoon Residences · Powered by Mövenpick Hotels & Resorts'],
              ['Developer', 'International Free Company (IFC)'],
              ['Architect', 'Manhal Habboubi Architectural Office'],
            ] as [string, string][]
          ).map(([k, v]) => [tx(k), tx(v)])}
        />
      </section>

      {/* Same footer as every other project page. */}
      <Page>
        <div className="pt-[var(--block-gap-lg)]">
          <Rule />
          <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-baseline md:justify-between">
            {nextProject ? (
              <Link href={localeHref(nextProject.href, locale)} className="all-projects-cta__link">
                {d.project.next} {nextProject.title} {d.arrow}
              </Link>
            ) : (
              <span />
            )}
            <Link href={localeHref('/work', locale)} className="all-projects-cta__link">
              {d.project.all} {d.arrow}
            </Link>
          </div>
        </div>
      </Page>
    </article>
  )
}
