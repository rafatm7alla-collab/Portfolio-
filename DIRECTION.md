# RAFAT MHALLA — PORTFOLIO
## Creative Direction & System Specification — v1.1, built

Approved and built. This document remains the source of truth: if the code and
the direction disagree, one of them is wrong — resolve it, don't let them drift.

### Changes made during build — four, all from looking at it rendered

**1 · Hero is now a light/bold pair, not two bold lines.**
`CREATIVE DIRECTION` set as two stacked 900-weight lines used none of the
light/bold contrast the entire system is built on. On screen it read as a
generic big-type hero. It is now `CREATIVE` (900, uppercase) over `direction`
(300) — the same move as every section header, at maximum scale. The hero is
where that move should originate, not the one place it's absent.

**2 · `display-xl` reduced from 17vw to 12vw.**
At 1440, 17vw pushed the hero to the edge of the grid and read as loud rather
than confident. 12vw leaves the right third open — which is what makes the
composition look art-directed instead of merely large. Leading loosened 0.82 →
0.86 to match.

**3 · Contact statement rebuilt as a pair.**
Four lines of display-xl bold closed the page with a wall of black. Now
`Let's make something` (300) → `worth remembering.` (700). It lands on the bold
half. §23's wireframe is superseded.

**4 · Per-line `overflow:hidden` reveal wrappers removed.**
A flourish that wasn't in the approved motion spec, and it clipped every
descender — the *g* in "something" and "remembering" were sliced off at
line-height 0.86. The REVEAL primitive is opacity + translate. That is enough.

### Found once it actually compiled and ran

**5 · The editorial space scale was silently redefining every Tailwind spacing
utility.** Declaring `--spacing-1 … --spacing-10` inside `@theme` looked
correct, but Tailwind v4 maps `p-4` / `gap-6` / `mt-8` onto exactly that
namespace. `gap-6` was resolving to 64px, `py-6` to 64px, `gap-10` to **320px**
— across all 41 files. It was blowing the `/work` index apart. The scale now
lives on `:root` as `--space-*` and Tailwind keeps its own 4px base. This one
was invisible on paper and obvious the moment the page rendered.

**6 · `/work` index rebuilt on the 12-column grid, new `display-s` role.**
Rows were a flex row at `display-m` (79px). A real title — "Al Zaytouna
Terraces" — wrapped to three lines and the list stopped reading as a list.
Rows are now grid-aligned so number, title, category and year line up down the
whole page, at `clamp(1.625rem, 3.4vw, 3.25rem)`, one line each.

**7 · The hover preview no longer follows the cursor.** Centred on the pointer
it covered the exact title you were reading. It is now a fixed plate anchored
to the right margin that tracks vertically only. Still alive, never in the way.

### Two constraints worth carrying forward

- The `display-xl` mobile floor of 3.25rem is set by the longest single word
  used at that size. At 375px `remembering.` fills the measure exactly. Raise
  the floor and it overflows.
- Never declare custom `--spacing-*` in `@theme`. See revision 5.

### Verified

`tsc --noEmit` clean · `next build` clean · 26 routes prerendered ·
103 kB shared JS · homepage, `/work`, case study and `/about` driven in a real
browser at 1440 and 375.

---

## THE POSITION

Before layout, the strategic decision this site has to make:

A Creative Director's portfolio is not a gallery. A gallery says *look what I made*. A portfolio at CD level says *look how I think*. The difference shows up in three places:

1. **Sequence over quantity.** Six projects, deeply sequenced, outrank twenty thumbnails. The site must feel curated to the point of being slightly withholding.
2. **The interface disappears.** Every UI element that survives is one the work needed. If a component can be replaced by type and space, it gets replaced.
3. **Copy is directed, not written.** One sentence per section, cut to the bone. Long paragraphs read as junior. Restraint reads as senior.

The visual system below exists to serve those three things. Everything else was removed.

**The organising principle:** *One typeface. Two extremes. Two colours. Everything else is space and imagery.*

---

## 01 — SITEMAP

Five routes. Deliberately few.

```
/                          INDEX
                           Hero · Selected Work (6) · Positioning statement · Contact line

/work                      WORK INDEX
                           All projects. Typographic list, image-on-hover.

/work/[slug]               CASE STUDY
                           /work/al-zaytouna-terraces
                           /work/[project-2] …

/about                     ABOUT
                           Profile · Approach · Services (01–06) · Selected Clients · Experience

/contact                   CONTACT
                           Statement · Direct channels

  404                      NOT FOUND — typographic, in system
  /sitemap.xml             generated
  /robots.txt              generated
  /opengraph-image         generated per route
```

### Decisions and why

**No /services page.** Services live inside About as a numbered typographic system. A standalone services page is agency behaviour and reads as availability-anxiety. An independent CD lists capabilities; they don't sell them on a dedicated page.

**No blog, no journal.** Unless you write regularly. An empty or stale journal is the single most damaging thing on a senior portfolio — it dates the site publicly.

**Home and /work are genuinely different, not duplicates.** Home is *edited* — six projects, large imagery, art-directed rhythm. /work is *complete* — every project as a typographic index line. Two experiences, two purposes. If they were the same, one of them would be deleted.

**Case studies are the destination.** Everything upstream is a corridor to them.

---

## 02 — HOMEPAGE WIREFRAME

Desktop, 1440 reference. `┃` = viewport edge. Each block is one scroll beat.

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                     ┃
┃  RAFAT MHALLA                              WORK   ABOUT   CONTACT   ┃  ← nav, 11px, +0.18em
┃  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  ┃    mix-blend-difference
┃                                                                     ┃
┃                                                                     ┃
┃   CREATIVE DIRECTOR · ART DIRECTOR                                  ┃  ← 11px / 400 / +0.18em
┃                                                                     ┃
┃                                                                     ┃
┃   CREATIVE                                                          ┃  ← 173px / BLACK 900 / caps
┃                                                                     ┃    the pair, at max scale
┃   direction                                                         ┃  ← 173px / LIGHT 300 / lc
┃                                                                     ┃
┃                                                                     ┃
┃                                       Branding, visual systems      ┃  ← 20px / 300 / offset right
┃                                       and campaigns for brands      ┃    starts at col 8
┃                                       that want to be remembered.   ┃
┃                                                                     ┃
┃                                                                     ┃
┃   BAGHDAD · AVAILABLE 2026                          (12 YEARS) ↓    ┃  ← 11px, baseline row
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
        ↑ ~92vh. Never a full 100vh — the cut edge signals scroll without an arrow icon.


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                     ┃
┃  SELECTED                                              (06)         ┃  ← 120px BOLD / count 11px
┃  work                                                               ┃  ← 120px LIGHT, indented
┃                                                                     ┃
┃  ───────────────────────────────────────────────────────────────    ┃  ← 1px #E5E5E5
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  PROJECT 01 — FULL BLEED
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  edge to edge · 78vh · no radius  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   01                                          Brand Identity
   AL ZAYTOUNA TERRACES                        Creative Direction
   ↑ 88px BOLD −0.03em                         Baghdad · 2026
                                               ↑ 11px 400 +0.14em, right col


  PROJECT 02 — 7 / 5 SPLIT, TYPE LEFT
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                     ┃
┃   02                            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃  ← bleeds right edge
┃   PROJECT                       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃   TITLE                         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃                                 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃   Visual Identity               ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃   Art Direction                 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃   2025                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  PROJECT 03 — INSET PORTRAIT, LARGE LEFT MARGIN
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                     ┃
┃                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                          ┃
┃    03              ▓▓▓▓▓▓▓▓ 4:5 portrait ▓                          ┃
┃                    ▓▓▓▓▓▓▓▓▓▓ cols 4–9 ▓▓▓                          ┃
┃                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                          ┃
┃                    PROJECT TITLE                                    ┃
┃                    Campaign · 2025                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  … 04 full bleed · 05 split (type right, image left) · 06 two-image pair

  Rhythm law: no two consecutive projects share a layout.
  Cycle: BLEED → SPLIT-L → INSET → BLEED → SPLIT-R → PAIR


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                             ALL WORK (14) →         ┃  ← 11px, right aligned
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  POSITIONING — INVERTED
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃███████████████████████████████████████████████████████████████████████┃
┃██                                                                 ████┃
┃██  (ABOUT)                                                        ████┃  ← 11px, white
┃██                                                                 ████┃
┃██  Twelve years directing brands                                  ████┃  ← 72px LIGHT white
┃██  across identity, campaign                                      ████┃
┃██  and digital.                                                   ████┃
┃██                                                                 ████┃
┃██                                              READ MORE →        ████┃
┃███████████████████████████████████████████████████████████████████████┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   The only inverted block on the homepage. It earns its weight by being the only one.


  CONTACT + FOOTER — merged, no separate footer band
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                     ┃
┃  Let's make something                                               ┃  ← 173px LIGHT 300
┃  worth remembering.                                                 ┃  ← 173px BOLD 700
┃                                                                     ┃    (superseded §23 —
┃                                                                     ┃     closes on the bold half)
┃                                                                     ┃
┃  hello@rafatmhalla.com                                              ┃  ← 32px LIGHT, hover: rule
┃                                                                     ┃
┃  ───────────────────────────────────────────────────────────────    ┃
┃  RAFAT MHALLA          WORK ABOUT CONTACT     BE LI IG    © 2026    ┃  ← 11px baseline row
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Mobile — 375, rebuilt not shrunk

```
┏━━━━━━━━━━━━━━━━━━━━━┓
┃ RAFAT MHALLA   MENU ┃  ← word, not a hamburger
┃                     ┃
┃ CREATIVE DIRECTOR   ┃  ← 10px +0.16em
┃                     ┃
┃ CREATIVE            ┃  ← 68px BOLD, lh 0.86
┃ DIRECTION           ┃
┃                     ┃
┃ Branding, visual    ┃  ← 17px LIGHT
┃ systems and         ┃
┃ campaigns for       ┃
┃ brands that want    ┃
┃ to be remembered.   ┃
┃                     ┃
┃ BAGHDAD · 12 YEARS  ┃
┗━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━┓
┃ SELECTED       (06) ┃
┃ work                ┃
┃ ─────────────────── ┃
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃  ← every image full-bleed on mobile,
┃▓▓ full bleed 4:5 ▓▓▓┃    portrait crop. No side margins on
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃    imagery — this is what keeps the
┃                     ┃    editorial feel at 375px.
┃ 01                  ┃
┃ AL ZAYTOUNA         ┃  ← 40px BOLD
┃ TERRACES            ┃
┃ Brand Identity      ┃  ← 10px
┃ Baghdad · 2026      ┃
┗━━━━━━━━━━━━━━━━━━━━━┛
```

Mobile rules: imagery goes full-bleed (0 margin), type keeps a 20px margin. Type never drops below 40px for project titles. The weight contrast holds — 40px Bold against 10px Regular is still ~4:1 with a 300-unit weight jump.

---

## 03 — CASE STUDY WIREFRAME

```
  A. HERO — two variants, alternating between projects so no two case studies open the same way

  VARIANT A — image cover
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100vw × 88vh · mask reveal on load  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  VARIANT B — typographic cover (no image above the fold)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                     ┃
┃  01 / 14                                                            ┃
┃                                                                     ┃
┃  AL ZAYTOUNA                                                        ┃  ← 200px BOLD
┃  TERRACES                                                           ┃
┃                                                                     ┃
┃                                        Brand Identity · 2026        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  B. TITLE + META  (4-column meta grid under a hairline)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                     ┃
┃  AL ZAYTOUNA TERRACES                                               ┃  ← 112px BOLD −0.035em
┃                                                                     ┃
┃  ───────────────────────────────────────────────────────────────    ┃
┃  CLIENT          SECTOR           LOCATION         YEAR             ┃  ← 11px +0.14em, grey
┃  [Client]        Real Estate      Baghdad          2026             ┃  ← 15px Regular, black
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  C. LEDE — one sentence. Maximum 20 words. Non-negotiable.
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃           A residential landmark that needed to feel               ┃  ← 44px LIGHT
┃           permanent before a single stone was laid.                ┃    cols 3–10
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  D. BRIEF + ROLE — two-column, label left / content right
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  THE BRIEF          [60–90 words. Situation and constraint.        ┃
┃  ↑ 11px, col 1–2     No adjectives that could apply to any         ┃
┃                      project.]                          cols 5–11  ┃
┃                                                                     ┃
┃  ───────────────────────────────────────────────────────────────    ┃
┃                                                                     ┃
┃  ROLE               Creative Direction                              ┃  ← 20px Regular, stacked
┃                     Art Direction                                   ┃    one per line, generous
┃                     Visual Identity                                 ┃    leading. Only services
┃                                                                     ┃    used on THIS project.
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  E. IMAGE — full bleed


  F. THE IDEA — the pivot of the whole page
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  THE IDEA                                                           ┃  ← 11px
┃                                                                     ┃
┃  A MARK BUILT                                                       ┃  ← 140px BOLD
┃  FROM SHADOW.                                                       ┃    max 6 words. Ever.
┃                                                                     ┃
┃                              [50–70 words. How the idea works      ┃  ← 20px LIGHT, cols 7–11
┃                               and what it does for the brand.]     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  G. DEVELOPMENT SEQUENCE — 3 to 5 images, alternating scale
┏━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃▓▓▓▓▓▓▓ 5 cols ▓▓▓▓▓▓▓▓▓▓┃                                           ┃  ← 2-up, uneven,
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃   ▓▓▓▓▓▓▓ 4 cols, offset down 120px ▓▓▓  ┃    vertically offset
┗━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   Caption 11px grey, under left image only.

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ full bleed, 100vh, no caption ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


  H. IDENTITY SYSTEM — tight grid, the only place a 3-up appears
  I. APPLICATIONS — large environmental imagery, minimal type
  J. CREDITS — 11px, three columns, grey labels / black names
  K. NEXT PROJECT — full viewport, inverted

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃█████████████████████████████████████████████████████████████████████┃
┃██  NEXT                                                          ███┃  ← 11px white
┃██                                                                ███┃
┃██  [NEXT PROJECT TITLE]                                          ███┃  ← 160px BOLD white
┃██                                                                ███┃
┃██  Brand Identity · 2025                                         ███┃
┃█████████████████████████████████████████████████████████████████████┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   On hover: the next project's hero image fades up from 0 → 100% behind the type
   over 600ms. Type stays white via mix-blend-mode: difference. One move, high impact.
```

**Section budget: 9–11 blocks per case study. Hard ceiling.** More than that and it becomes an image dump with headings. If a project has 30 good images, the edit is the work — pick 12.

---

## 04 — TYPOGRAPHY SYSTEM

### The typeface decision — needs your call

Helvetica isn't reliably available as a web font. Three honest paths:

| Option | What you get | Cost |
|---|---|---|
| **A — Helvetica Now (Monotype web licence)** ★ recommended | The real thing. Display / Text / Micro optical sizes, Hairline → Black. Display cut at 200px is dramatically better than system Helvetica — tighter apertures, correct tracking. | Annual licence, ~$–$$ by pageview tier |
| **B — Neue Haas Grotesk (Monotype)** | Helvetica's original 1957 drawing, restored. Arguably more refined than Helvetica itself for display. | Similar |
| **C — System stack** | `-apple-system` → Helvetica Neue on Mac/iOS, **Arial on Windows/Android**. Free, zero load. | Free, but ~35% of visitors see Arial |

**Recommendation: A.** At the sizes this design uses — 200px+ display type — the difference between Helvetica Now Display and Arial is the difference between the site working and not working. Display-optical-size Helvetica is the single highest-leverage spend on this project.

**Path if you want to launch before licensing:** build on the system stack now, swap the `@font-face` block later. One file changes. Zero redesign. I'll structure it that way regardless.

```css
/* Target */
--font: "Helvetica Now Display", "Helvetica Now Text",
        "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Rendering — mandatory */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
font-synthesis: none;   /* never let the browser fake a weight */
```

### The scale — fluid, 8 roles

| Role | Size | Weight | Tracking | Leading | Use |
|---|---|---|---|---|---|
| `display-xl` | `clamp(3.25rem, 12vw, 11rem)` | **700** | −0.045em | 0.86 | Hero. Contact statement. Next-project. |
| `display-l` | `clamp(2.75rem, 9vw, 9rem)` | **700** | −0.038em | 0.86 | Case-study title. THE IDEA. Section heads. |
| `display-m` | `clamp(2.25rem, 5.5vw, 5.5rem)` | **700** | −0.03em | 0.9 | Project titles in index & home. |
| `headline` | `clamp(1.75rem, 3.4vw, 3.25rem)` | 300 | −0.02em | 1.08 | Lede sentences. Inverted about block. |
| `lede` | `clamp(1.125rem, 1.6vw, 1.5rem)` | 300 | −0.008em | 1.4 | Intro copy. Idea description. |
| `body` | `1rem` → `1.0625rem` | 400 | 0 | 1.55 | Brief text. Long-form about. |
| `meta` | `0.6875rem` (11px) | 400 | **+0.14em** | 1.5 | UPPERCASE. Metadata, nav, services. |
| `micro` | `0.625rem` (10px) | 400 | **+0.2em** | 1.4 | UPPERCASE. Numbers, captions, credits. |

### The three rules that make it look art-directed and not default

**1. Tracking scales inversely with size.**
Big type gets negative tracking. Small caps get generous positive tracking. Helvetica set at 200px with default tracking looks like a default. At −0.045em it looks directed. This one rule does more work than any other line in this document.

**2. Weight only ever goes 300 → 700. Never 400 → 500 → 600.**
Four weights exist in the system: 300 Light, 400 Regular, 700 Bold, 900 Black (Black reserved — see rule 3). Mid-weights are banned. The whole personality is the *gap*.

**3. The contrast law — every typographic pair must clear both thresholds:**
- size ratio **≥ 5:1**
- weight jump **≥ 300 units**

Example: `RAFAT MHALLA` at 11px/400/+0.18em against `CREATIVE DIRECTION` at 260px/700/−0.045em → 23:1 size, 300 weight. Correct.
Counter-example: 32px/500 against 18px/400 → 1.8:1 size, 100 weight. Rejected — this is what generic looks like.

**4. Where 900 Black is allowed:** the homepage hero only, and only if Helvetica Now is licensed. One appearance on the entire site. If it appears twice it stops being an event.

**5. Body copy is never 300.** Light below 20px goes fragile — worse on Windows fallback. Rule: **300 only at ≥20px.** Below that, 400.

### Weight allocation, plainly

```
300  LIGHT      lede, headline, intro copy, quiet statements
400  REGULAR    body, all metadata, all uppercase labels, nav (inactive)
700  BOLD       every display size, project titles, section heads, nav (active), numbers
900  BLACK      homepage hero — once, entire site
```

---

## 05 — GRID

```
BREAKPOINT     COLS   GUTTER   MARGIN                MAX WIDTH
≥ 1600         12     24px     clamp(48px, 5vw, 120px)   1800px
1280 – 1599    12     24px     64px                  —
1024 – 1279    12     20px     48px                  —
768 – 1023      8     20px     40px                  —
< 768           4     16px     20px (type only)      —
```

**Spacing scale — 8px base, no arbitrary values ever:**
```
4   8   16   24   40   64   96   144   216   320
```

**Section rhythm:** `clamp(96px, 14vh, 224px)` between major blocks. Between an image and its caption: 16px. Between a caption and the next block: full section spacing. The imbalance is the point — captions belong to the image above them, and the space has to say so.

**Three escape hatches from the grid** (this is where the editorial asymmetry comes from):
- `.bleed` — `width: 100vw`, breaks both margins
- `.bleed-r` / `.bleed-l` — grid-aligned on one side, runs off the viewport on the other
- `.offset-y` — vertical displacement of ±120px on a grid item in a 2-up

Everything else stays on the grid. The exceptions only read as intentional because the default is rigid.

**Baseline discipline:** all type sits on a 4px vertical rhythm. Enforced with `line-height` values that resolve to multiples of 4 at each breakpoint.

---

## 06 — COLOUR SYSTEM

Six tokens. There is no seventh.

```css
--paper:          #FFFFFF   /* ground */
--ink:            #000000   /* type, rules, the mark */
--ink-secondary:  #6E6E6E   /* metadata, captions — 5.1:1 on paper ✓ AA */
--ink-tertiary:   #B5B5B5   /* decorative rules only — NEVER text */
--hairline:       #E5E5E5   /* 1px rules */
--surface-invert: #0A0A0A   /* inverted sections */
```

Inverted context:
```css
--paper:          #0A0A0A
--ink:            #FFFFFF
--ink-secondary:  #9A9A9A   /* 7.4:1 on #0A0A0A ✓ AA */
--hairline:       #262626
```

### Why #0A0A0A and not #000000 for inverted surfaces

Pure black fills read as holes on OLED and make adjacent photography look grey by comparison. #0A0A0A is imperceptibly off — but images sit correctly on it. Type stays true #000 on white. This is the kind of decision nobody notices and everybody feels.

### Absolute prohibitions

No accent colour. No brand colour. No gradient — including white-to-transparent scrims over images. No coloured focus rings (focus is a 2px black outline with 2px offset; on inverted, white). No coloured link states. Project imagery keeps its own colour; the interface never borrows from it.

**Where black/white inversion is permitted — four places, no more:**
1. Homepage About block
2. Case-study Next Project block
3. `/work` index row on hover
4. Mobile menu overlay

Contact considered and rejected. Contact is stronger as black type on white at 180px — inverting it would make it the fourth loud thing in a row.

---

## 07 — NAVIGATION

```
RAFAT MHALLA                                    WORK   ABOUT   CONTACT
```

Fixed. 11px. `+0.18em`. Uppercase. Padding `32px` matching the page margin. No background, no bar, no border, no blur panel.

**The mechanism:** `mix-blend-mode: difference` with white type. Over white it renders black; over black it renders white; it inverts itself across any full-bleed image automatically. No scroll listeners, no state juggling, no colour flashing at section boundaries. Structural rather than decorative.

**The caveat, honestly:** over busy mid-tone colour photography, difference-blend produces odd hues. Mitigation — sections carry `data-nav="auto | light | dark"`. Image-heavy sections opt out to a fixed colour. Roughly 15% of sections will need the override; the rest are free.

**States:**
- Inactive: 400
- Active route: **700** — no underline, no dot, no colour. Weight is the state.
- Hover: a 1px rule draws left→right beneath in 240ms `cubic-bezier(0.16, 1, 0.3, 1)`
- Focus: 2px outline, 2px offset

**Scroll:** nav does not hide, shrink, or change on scroll. It is 11px — it costs nothing to leave alone. Hiding navigation on scroll is a mobile-app habit that has no place here.

**Mobile:** `RAFAT MHALLA` / `MENU`. The word, not an icon — icons are UI, words are editorial. Tapping opens a full-viewport `#0A0A0A` overlay: WORK / ABOUT / CONTACT at `clamp(3rem, 14vw, 5rem)` Bold, white, staggered in at 60ms intervals; email and socials at 11px pinned to the bottom. Close is the word `CLOSE`.

---

## 08 — MOTION

Three primitives. Everything on the site is composed from these.

```
REVEAL    opacity 0 → 1, translateY 24px → 0
          700ms · cubic-bezier(0.16, 1, 0.3, 1) · once, at 15% intersection

MASK      container clip-path inset 100% → 0 (bottom-up)
          image inside scales 1.06 → 1.0 simultaneously
          900ms · same easing
          → EVERY image on the site uses this. Images never fade in.

INVERT    background-color + color crossfade
          240ms · cubic-bezier(0.4, 0, 0.2, 1)
```

**Composed behaviours:**
- Display headlines: split by **line** (never by character — character stagger is the tell of a template), REVEAL staggered at 80ms
- Metadata blocks: REVEAL, 120ms after their heading
- Home project hover: image `scale(1.02)` over 600ms + metadata translateX 8px→0
- `/work` row hover: INVERT the full-bleed row + a fixed 32vw image fades in at cursor, following with a 0.12 lerp
- Next-project hover: hero image opacity 0→1 over 600ms

**Page transitions:** out — opacity 1→0, 380ms, no movement. In — REVEAL, 520ms. Total under 900ms. Longer than that and it reads as precious rather than considered.

**Banned outright:** scroll-jacking · multi-layer parallax · custom cursor blobs · magnetic buttons · marquee tickers · number counters · bouncing/elastic easing · character-by-character text scramble · loading screens with a percentage · anything on a loop.

**Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  /* all three primitives collapse to opacity 0→1 over 200ms */
  /* no transforms, no clip-path, images render at final state */
  /* scroll-behavior: auto */
}
```
Not an afterthought — the site must be fully legible and complete with every animation disabled. Test with it on.

---

## 09 — DESIGN SYSTEM SUMMARY

```
TYPEFACE     Helvetica Now Display + Text  (fallback: Helvetica Neue → Arial)
WEIGHTS      300 · 400 · 700 · (900, once)
SCALE        8 roles, fluid clamp, tracking inverse to size
COLOUR       6 tokens. #FFFFFF · #000000 · #6E6E6E · #B5B5B5 · #E5E5E5 · #0A0A0A
GRID         12 / 8 / 4 col · 8px base · 3 named bleed escapes
SPACE        4 8 16 24 40 64 96 144 216 320
RADIUS       0. Everywhere. Including images, overlays, focus rings.
SHADOW       none
BORDER       1px #E5E5E5 hairlines only. No boxes, no cards, no containers.
ICONS        none. Two exceptions: → (arrow) and ↓ (scroll), as text glyphs.
BUTTONS      none. Every action is a text link with a hover rule.
IMAGERY      AVIF/WebP · full-bleed by default · never rounded · never shadowed
MOTION       3 primitives · 700–900ms · cubic-bezier(0.16, 1, 0.3, 1)
```

**The removal test, applied to every future component:** can this be a piece of type, a hairline, and space? If yes, it is. That test is why there are no cards, no buttons, no icons, and no containers in this system.

---

## 10 — COMPONENT ARCHITECTURE

Next.js 15 · App Router · React 19 · TypeScript · Tailwind v4 · Motion (Framer Motion v11+)

```
app/
  layout.tsx                  fonts, nav, transition shell, metadata defaults
  page.tsx                    home
  work/
    page.tsx                  index
    [slug]/
      page.tsx                case study
      opengraph-image.tsx     per-project OG, generated
  about/page.tsx
  contact/page.tsx
  not-found.tsx
  sitemap.ts
  robots.ts
  globals.css                 @theme tokens, @font-face, reset, reduced-motion

components/
  chrome/
    Navigation.tsx
    MobileMenu.tsx
    Footer.tsx
    PageTransition.tsx
  type/
    Display.tsx               size + weight role, polymorphic `as`
    Meta.tsx                  uppercase 11px label
    Lede.tsx
    SectionHeader.tsx         "SELECTED / work" bold+light pair
  media/
    Image.tsx                 next/image + MASK reveal + blur placeholder
    MediaBlock.tsx            variant: bleed | inset | split-l | split-r | pair
    Video.tsx                 muted autoplay, poster, reduced-motion aware
  work/
    ProjectRow.tsx            /work index row, invert + cursor image
    ProjectFeature.tsx        home block, takes a layout variant
    HoverImage.tsx            fixed cursor-following image
    NextProject.tsx
  case/
    CaseHero.tsx              variant: cover | typographic
    CaseMeta.tsx              4-col meta grid
    CaseSection.tsx           label + content two-column
    CaseIdea.tsx
    CaseGallery.tsx           sequence renderer, reads layout from data
    CaseCredits.tsx
  primitives/
    Grid.tsx  Reveal.tsx  Rule.tsx  Link.tsx  Section.tsx

data/
  projects/
    index.ts                  ordered export, typed
    al-zaytouna-terraces.ts
    …
  profile.ts                  name, title, bio, location, contact
  services.ts                 01–06
  clients.ts
types/
  project.ts

public/work/[slug]/           hero.jpg, 01.jpg, 02.jpg …
scripts/
  blur.ts                     generate base64 placeholders at build
  optimise.ts                 batch AVIF/WebP + responsive widths
```

### Project schema

```ts
export type Project = {
  slug: string
  index: string                 // "01"
  title: string
  client: string | null         // null → omitted, never faked
  year: number
  location: string
  sector: string
  category: 'Brand Identity' | 'Campaign' | 'Art Direction' | 'Digital' | 'Visual System'
  services: Service[]           // only what applied to THIS project
  role: string
  shortDescription: string      // ≤ 20 words — index + meta description
  lede: string                  // ≤ 20 words — case-study opening line
  brief: string                 // 60–90 words
  idea: { headline: string; body: string }   // headline ≤ 6 words
  hero: { src: string; alt: string; variant: 'cover' | 'typographic' }
  sections: CaseSection[]       // ordered — the sequence IS the case study
  credits?: { role: string; name: string }[]
  featured: boolean             // homepage six
  order: number
  next: string                  // slug
}

type CaseSection =
  | { type: 'image';   layout: 'bleed'|'inset'|'split-l'|'split-r'|'pair'|'triptych'
                       images: Img[]; caption?: string; offsetY?: boolean }
  | { type: 'text';    label: string; body: string }
  | { type: 'idea';    headline: string; body: string }
  | { type: 'video';   src: string; poster: string; layout: 'bleed'|'inset' }
  | { type: 'spacer';  size: 'md'|'lg'|'xl' }
```

Adding a project = one file in `data/projects/` + a folder in `public/work/`. No layout work. The `sections` array is the art direction, expressed as data.

**Performance:** static generation for every route (`generateStaticParams`). Hero images `priority`; everything else lazy with a build-time blur placeholder. AVIF + WebP, `sizes` set per layout variant. Target: LCP < 1.8s on 4G, CLS < 0.02, no client JS on `/about` or `/contact` beyond the transition shell.

---

## 11 — BEHANCE → CASE STUDY CONVERSION

The transformation isn't visual. Behance projects present *output*; a case study presents *judgement*. Same images, different argument.

### What I need per project

```
1  Behance URL
2  Client name — real, or "confidential" (never invented)
3  Year, location, sector
4  Your actual role — CD / AD / Designer / Strategy. Solo or leading a team?
5  Team credits if any
6  Source images at highest available resolution
7  In one or two sentences: what was the actual brief?
8  In one sentence: what was the central idea?
```

Items 7 and 8 are the ones I cannot infer and will not invent. Everything else I can derive from the images.

### What I return per project

```
A  Hero recommendation + why that frame
B  Hero variant (cover or typographic) — balanced across the set
C  A 9–11 block sequence: which images, which layout, which order, what gets cut
D  Draft copy — lede / brief / idea headline / idea body, marked [DRAFT]
E  Services list — only what applied
F  Recommended position in the running order
G  Anything missing that would materially strengthen it
```

### The editing rules

**Cut to 12 images maximum.** A Behance project with 40 images has 12 that matter. Removing 28 is the art direction. If everything is shown, nothing is emphasised.

**Kill the mockup slides.** Isometric floating phones, curled-paper business cards, brand-guideline pages with red measurement lines. These are the clearest junior signal in the medium. Keep only mockups that place the work in a real context at a real scale.

**Find the one frame.** Every project has a single image that carries the whole idea. That's the hero. It is frequently not the one that opens the Behance project — Behance rewards a title slide; a portfolio rewards the strongest photograph.

**Sequence as argument:** context → tension → idea → system → application → scale. Not "logo, then colours, then typography, then mockups."

**Never invent.** No results, no percentages, no awards, no testimonials, no client quotes, no "increased engagement by." If it isn't supplied it doesn't appear. Any placeholder I write is marked `[DRAFT]` or `[PLACEHOLDER]` and will not ship without your sign-off.

### Running order strategy for the homepage six

1. Strongest single image — sets the visual bar in the first 3 seconds
2. Strongest *idea* — proves it isn't only aesthetics
3. Most recognisable client — credibility
4. Widest scope (identity + campaign + digital) — proves range
5. Most recent — proves currency
6. Most personal or unexpected — proves point of view

Six projects, six different jobs. Nothing in the set is there just to fill a slot.

---

## 12 — WHAT I NEED FROM YOU TO BUILD

### Blocking — build cannot start
- **Typeface decision** — A (Helvetica Now), B (Neue Haas), or C (system stack for now, swap later)
- **Node.js is not installed on this machine.** Install Node 20+ before the build phase.
- **Project list** — 6–8 for the homepage, plus the full set for `/work`. Behance URLs.
- **Per-project data** — items 1–8 in section 11 above
- **Image assets** — highest resolution available, per project, in folders

### Blocking — content
- Real email address
- Behance / LinkedIn / Instagram URLs
- Client list — confirmed and cleared. I have `BYD · DENZA · NewParts · eEuroparts · ShopStock` from your brief; confirm these are correct, cleared for public display, and complete
- About copy: 80–120 words. Or supply raw notes and I'll draft it for your approval
- Location line — Baghdad? Something else? Remote?
- Domain name

### Non-blocking — I'll draft and you approve
- Hero statement (`CREATIVE DIRECTION` is a placeholder — I'd like to push further)
- Contact statement (`LET'S MAKE SOMETHING WORTH REMEMBERING.` is a starting point)
- The six services and their descriptions
- All case-study copy

### Everything currently marked as placeholder

```
[Client]                    every case study until you confirm names
CREATIVE DIRECTION          hero — placeholder
LET'S MAKE SOMETHING…       contact — placeholder
Branding, visual systems…   hero sub — placeholder
BAGHDAD · AVAILABLE 2026    hero baseline — unconfirmed
(12 YEARS)                  from your brief, confirm phrasing
Al Zaytouna Terraces        used as an example throughout — confirm it's real
                            and confirm Brand Identity / Baghdad / 2026
14                          project count — unknown
Real Estate                 Al Zaytouna sector — assumed, needs confirming
```

Nothing above ships without your confirmation.

---

## THE CREATIVE DIRECTOR TEST — applied to this direction, before it's built

**Does the typography feel intentional?** Yes — because tracking is inverse to size and mid-weights are banned. Those two rules are what separate directed Helvetica from default Helvetica.

**Is the weight contrast enough of a personality?** It is, on one condition: it has to be *extreme*. 11px against 260px. Not 24px against 48px. The system enforces a 5:1 minimum, and the hero clears 23:1.

**Does the work dominate?** Six projects, all imagery full-bleed or near it, interface reduced to 11px labels and hairlines. The only large type that isn't a project title is the hero and the contact line.

**Would an agency take it seriously?** The risk isn't taste — it's *thinness*. Six beautifully sequenced projects with real briefs and real ideas will land. Six beautifully sequenced projects with vague copy will read as a designer who can't articulate. **The case-study copy is where this site is won or lost, and it's the part I can't write for you.**

**Where I'd push harder in v2, once v1 is live:**
- The hero statement. `CREATIVE DIRECTION` is correct but safe. A CD with 12 years should say something only they could say.
- The `/work` index deserves to be the most memorable page — a pure typographic list, no images until hover, is a strong position but needs the hover image treatment to be exceptional.
- One project should break the system deliberately. Not two. One.

---

*Awaiting approval. Nothing will be built until you sign off — section by section, or as a whole.*
