# Case Study Block System

Build these components once. Every project after this is just a JSON file plus
an image folder — no new components, no new Claude Code work.

## How it works

- Manifests live in `/content/projects/*.json`
- Images live in `/public/projects/{slug}/`
- The project page reads `blocks[]` in order and maps each `type` to a
  component in `/components/blocks/`
- The index page is generated from the same manifests (`cover`, `title`,
  `client`, `year`, `tags`, `summary`)

## Block types

### `sectionHeader`
White band. Bold uppercase title, grey subtitle beneath it. This is the
signature divider of the case study — it must feel identical every time.
Fields: `title`, `subtitle` (optional).

### `text`
Constrained measure (~65ch), left-aligned, generous leading. Never full width.
Fields: `body`, `heading` (optional), `list` (optional array of strings —
renders as stacked lines, used for campaign phrase lists). Must support RTL: if
the string contains Arabic characters, set `dir="rtl"` on that line
automatically.

### `fullBleed`
Edge-to-edge image, natural aspect ratio preserved. Optional caption below,
small grey type. Fields: `image`, `caption` (optional).

### `grid`
Even grid, equal cells, small consistent gap. Fields: `columns` (2 or 3),
`images[]`.

### `mosaic`
Irregular editorial grid — mixed cell sizes, like the Behance social-post
layouts. Each `layout` value is a named CSS-grid template:

- `teaser-posts` — 9 cells: 1 large left, 2×2 small centre, 1 tall right, then
  1 large left + 2 stacked right
- `launch-posts` — 6 cells: 3 across, then 1 large left + 2 stacked right
- `invitation-details` — 5 cells: 3 across, then 2 across
- `outdoor-details` — 5 cells: 3 across, then 2 across

Fields: `layout`, `images[]`.

### `videoEmbed`
Lazy-loaded facade: poster frame + play button, iframe only mounts on click.
Never load YouTube/Vimeo iframes on page load — it destroys scroll performance.
Fields: `provider` (`youtube` | `vimeo`), `id`, `title`.

### `credits`
Two-column label/value list at the end of the case study.
Fields: `items[]` of `{ label, value }`.

## Rules

- Follow the house motion system for every reveal. Blocks animate in on scroll;
  images never pop.
- Images: responsive `srcset`, lazy below the fold, explicit width/height to
  prevent layout shift.
- Full-bleed images keep their natural ratio — never crop to a fixed height.
- Arabic strings render RTL with a font that supports Arabic properly.
- No block invents its own spacing. Vertical rhythm comes from one scale.
