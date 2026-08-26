import type { ManifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'
import { Micro } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * Two, three or four images, side by side, each at its own natural ratio.
 *
 * Unlike `grid` these are not cropped to a shared aspect — a portrait next
 * to a landscape stays a portrait next to a landscape, top-aligned rather
 * than forced to match heights. Below `md` it collapses to one column.
 *
 * A file that has not been supplied yet is dropped rather than shown as an
 * empty grey slot beside real artwork.
 */
export function NUpBlock({
  images,
  columns,
  size = 'full',
  widthPercent = 75,
  noRounding = false,
  captions,
}: {
  images: ManifestImage[]
  columns: 2 | 3 | 4
  size?: 'full' | 'contained'
  widthPercent?: number
  noRounding?: boolean
  captions?: string[]
}) {
  const present = images.filter((image) => !image.missing)
  if (present.length === 0) return null

  const cols = Math.min(columns, present.length) as 1 | 2 | 3 | 4
  const vw = `${widthPercent}vw`

  return (
    <div
      className={size === 'contained' ? 'mx-auto' : 'bleed'}
      style={size === 'contained' ? { width: vw, maxWidth: vw } : undefined}
    >
      <div
        className={`grid grid-cols-1 items-start gap-4 md:gap-6 ${
          cols === 4
            ? 'md:grid-cols-4'
            : cols === 3
              ? 'md:grid-cols-3'
              : cols === 2
                ? 'md:grid-cols-2'
                : ''
        }`}
      >
        {present.map((image, i) => (
          <figure key={image.filename + i}>
            <BlockImage
              image={image}
              sizes={
                size === 'contained'
                  ? `(max-width: 768px) 100vw, ${widthPercent / cols}vw`
                  : `(max-width: 768px) 100vw, ${100 / cols}vw`
              }
              fit="natural"
              delay={i * 100}
              noRounding={noRounding}
            />
            {captions?.[i] && (
              <figcaption className="mt-3">
                <Micro secondary {...directionProps(captions[i])}>
                  {captions[i]}
                </Micro>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
