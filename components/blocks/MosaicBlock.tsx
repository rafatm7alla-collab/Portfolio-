import type { ManifestImage } from '@/lib/manifest'
import type { MosaicLayout } from '@/types/blocks'
import { BlockImage } from '@/components/blocks/BlockImage'
import { Page } from '@/components/primitives/Layout'

/**
 * Irregular editorial grid. Each layout is a fixed, named template — the
 * manifest picks one by name and supplies the images in reading order.
 *
 * Templates are grid-template-areas rather than per-cell spans: the shape of
 * the layout is then legible in the source as a picture of itself, which is
 * what makes a new one safe to add.
 *
 * Cells crop to fill their area. `aspect` on the container keeps the whole
 * mosaic proportional so rows stay square-ish at any width, and every cell
 * reserves its height before load — no shift.
 */

type Template = {
  /** One string per row; each token is a cell name. */
  areas: string[]
  columns: number
  /** Container ratio, so cells stay close to square. */
  aspect: string
  cells: number
}

const TEMPLATES: Record<MosaicLayout, Template> = {
  // 9 cells: 1 large left, 2×2 small centre, 1 tall right,
  //          then 1 large left + 2 stacked right
  'teaser-posts': {
    areas: ['a a b c d', 'a a e f d', 'g g g h h', 'g g g i i'],
    columns: 5,
    aspect: '5 / 4',
    cells: 9,
  },
  // 6 cells: 3 across, then 1 large left + 2 stacked right
  'launch-posts': {
    areas: ['a b c', 'd d e', 'd d f'],
    columns: 3,
    aspect: '3 / 3',
    cells: 6,
  },
  // 5 cells: 3 across, then 2 across
  'invitation-details': {
    areas: ['a a b b c c', 'd d d e e e'],
    columns: 6,
    aspect: '3 / 1',
    cells: 5,
  },
  'outdoor-details': {
    areas: ['a a b b c c', 'd d d e e e'],
    columns: 6,
    aspect: '3 / 1',
    cells: 5,
  },
}

const NAMES = 'abcdefghijklmnop'.split('')

export function MosaicBlock({
  images,
  layout,
  noRounding = false,
}: {
  images: ManifestImage[]
  layout: MosaicLayout
  noRounding?: boolean
}) {
  const template = TEMPLATES[layout]

  // Unknown layout: render as a plain even grid rather than nothing. A
  // mistyped layout name should cost the arrangement, not the images.
  if (!template) {
    return (
      <Page>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((image, i) => (
            <BlockImage
              key={image.filename + i}
              image={image}
              sizes="(max-width: 768px) 50vw, 33vw"
              fit="cover"
              aspect="4 / 3"
              delay={Math.min(i, 5) * 100}
              noRounding={noRounding}
            />
          ))}
        </div>
      </Page>
    )
  }

  const used = images.slice(0, template.cells)

  return (
    <Page>
      {/* Below md the template collapses to two even columns — a five-column
          mosaic at 375px is a row of stamps. */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {used.map((image, i) => (
          <BlockImage
            key={image.filename + i}
            image={image}
            sizes="50vw"
            fit="cover"
            aspect="1 / 1"
            delay={Math.min(i, 5) * 100}
            noRounding={noRounding}
          />
        ))}
      </div>

      <div
        className="hidden gap-4 md:grid"
        style={{
          gridTemplateAreas: template.areas.map((row) => `"${row}"`).join(' '),
          gridTemplateColumns: `repeat(${template.columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${template.areas.length}, minmax(0, 1fr))`,
          aspectRatio: template.aspect,
        }}
      >
        {used.map((image, i) => (
          <div key={image.filename + i} style={{ gridArea: NAMES[i] }}>
            <BlockImage
              image={image}
              sizes="(max-width: 1280px) 40vw, 30vw"
              fit="cover"
              aspect="auto"
              delay={Math.min(i, 5) * 100}
              className="h-full"
              noRounding={noRounding}
            />
          </div>
        ))}
      </div>
    </Page>
  )
}
