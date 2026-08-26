# RAFAT MHALLA — PORTFOLIO

Next.js 15 · React 19 · TypeScript · Tailwind v4 · Motion

Design system and rationale: [DIRECTION.md](DIRECTION.md).
That document is the source of truth. If the code and the direction disagree,
the direction is wrong or the code is — resolve it, don't let them drift.

---

## Running it

**Node is not installed on this machine.** Install Node 20 or newer first —
nothing below works until it is.

Easiest route, no terminal required: download the LTS installer from
[nodejs.org](https://nodejs.org) and run it.

Then:

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

### Until Node is installed

`scripts/dev.sh` starts the dev server using whatever Node it can find: a real
installation on `PATH` first, otherwise a temporary copy that was extracted to
a session scratchpad so the site could be built and verified before Node was
available on this machine. `.claude/launch.json` points at that script.

**That fallback path is temporary and will disappear.** Once you install Node,
the script picks it up automatically — at which point delete `scripts/dev.sh`
and set `.claude/launch.json` back to:

```json
{ "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"], "port": 3000 }
```

Other commands:

```bash
npm run build
```

```bash
npm run typecheck
```

---

## Looking at it without Node

[`preview/index.html`](preview/index.html) is a single self-contained file that
mirrors the design system exactly — same tokens, same type scale, same grid,
same motion. Double-click it and it opens in a browser.

It exists only because the site cannot run without a toolchain. It is not part
of the build, nothing imports it, and it should be deleted once `npm run dev`
is working. If you change the system in `app/globals.css`, the preview will be
stale — trust the real site.

---

## Adding a project

One file and one folder. No layout work.

1. Copy `data/projects/al-zaytouna-terraces.ts` to `data/projects/[slug].ts`
2. Replace the copy, set `isPlaceholder: false`
3. Drop images into `public/work/[slug]/`
4. Register it in `data/projects/index.ts`
5. Fix the `next` slug on the project that should point at it

The `sections` array **is** the art direction. Order and layout variant are the
edit; the components just render what the data says.

Available image layouts: `bleed` · `inset` · `split-l` · `split-r` · `pair` ·
`triptych`.

### The placeholder flag

`isPlaceholder: true` is a safety interlock, not a to-do marker. While it is set:

- a visible `PLACEHOLDER` tag renders on the card, the index row and the case study
- the page is served `noindex, nofollow`
- the project is excluded from `sitemap.xml`

Nothing unverified can be presented as real work or picked up by a search engine.
Flip it to `false` only when the copy is approved and the images are real.

---

## Structure

```
app/                    routes · globals.css holds the entire design system
components/
  chrome/               Navigation · MobileMenu · Footer · ContactBlock
  primitives/           Reveal · Layout (Page / Grid / Section / Rule)
  type/                 Meta · Micro · SectionHeader · DisplayPair · PlaceholderTag
  media/                Image (MASK reveal + pending-asset state)
  work/                 ProjectFeature · ProjectIndex · NextProject
  case/                 CaseHero · CaseBlocks
data/                   projects · profile · services · clients
lib/useInView.ts        the single IntersectionObserver hook
types/project.ts        the Project schema
scripts/blur.ts         generates blur placeholders (see below)
```

### Where the design lives

Almost all of it is in `app/globals.css`: six colour tokens, eight type roles,
the grid, the three motion primitives, reduced-motion. Components compose those
classes; they don't invent values. If you find yourself writing a new font size
or colour inside a component, that's the signal something belongs in the system.

---

## Typeface

Currently the system stack — Helvetica Neue on macOS/iOS, **Arial on Windows and
Android**. See DIRECTION.md §04 for why Helvetica Now is worth licensing: at
200px+ the difference is the difference between the design working and not.

The light half of every bold/light pair is where this hurts most — Arial has no
300 weight, so the contrast that carries the whole site collapses to Regular
against Bold on roughly a third of visitors.

To upgrade: drop the woff2 files into `public/fonts`, uncomment the `@font-face`
block at the top of `app/globals.css`, and add the families to `--font-sans`.
One file changes.

---

## Images

Put source files in `public/work/[slug]/`. Reference them from the project data
with real `width`/`height` — the schema requires them, which is what prevents
layout shift.

Blur placeholders are generated, not written by hand:

```bash
npx tsx scripts/blur.ts
```

Requires `sharp` (`npm i -D sharp tsx`). The script walks `public/work`, writes
a base64 `blurDataURL` per image into `data/generated/blur.json`, and leaves
your project files alone.

An `Img` with `src: ''` renders a proportioned grey block instead of a broken
image, so layout and rhythm stay reviewable before the photography lands.

---

## Accessibility

Semantic landmarks, one `h1` per page, a skip link, visible focus (2px black
outline, never a colour), AA contrast on every text token, and full
`prefers-reduced-motion` support.

Reduced motion is not a downgrade path — the site must be complete and legible
with every animation off. **Test with it enabled before shipping.**

---

## Before launch

Real values are still needed for everything marked PLACEHOLDER in
`data/profile.ts` and `data/clients.ts`, plus real project content. The full
list is at the end of DIRECTION.md.

`profile.siteUrl` must be the real domain — `metadataBase`, canonicals, OG tags
and the sitemap all derive from it.
