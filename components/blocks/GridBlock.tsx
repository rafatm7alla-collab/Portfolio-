import type { ManifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'
import { Page } from '@/components/primitives/Layout'

/**
 * Even grid, equal cells, one gap value.
 *
 * Cells crop to a common 4:3 so the rows line up — that is what makes it read
 * as a grid rather than a pile. Uncropped images belong in fullBleed.
 *
 * Two columns on mobile regardless of the manifest: three 33vw cells on a
 * 375px screen are thumbnails, not photographs.
 *
 * Column count is a static class pair, not a runtime custom property. An
 * earlier version set `--grid-cols-block` from a <style> tag keyed on `.grid`,
 * which leaked to every Tailwind grid on the page.
 */
export function GridBlock({
  images,
  columns,
  noRounding = false,
}: {
  images: ManifestImage[]
  columns: 2 | 3
  noRounding?: boolean
}) {
  const present = images.filter((image) => !image.missing)
  if (present.length === 0) return null
  // One image fills the column; otherwise keep the authored column count.
  const single = present.length === 1
  const isThree = columns === 3 && !single
  // An odd image out in a 2-column grid spans the full row at double
  // width and half the relative height, so the grid stays a clean block.
  const orphan = !isThree && !single && present.length % 2 === 1

  return (
    <Page>
      <div className={`grid gap-[var(--media-gap)] ${single ? 'grid-cols-1' : 'grid-cols-2'} ${isThree ? 'md:grid-cols-3' : ''}`}>
        {present.map((image, i) => (
          <BlockImage
            key={image.filename + i}
            image={image}
            sizes={
              isThree
                ? '(max-width: 768px) 50vw, 33vw'
                : '(max-width: 768px) 50vw, 50vw'
            }
            fit="cover"
            aspect={orphan && i === present.length - 1 ? '8 / 3' : '4 / 3'}
            className={orphan && i === present.length - 1 ? 'col-span-2' : ''}
            // Capped at 6 so a long grid does not stagger for two seconds.
            delay={Math.min(i, 5) * 100}
            noRounding={noRounding}
          />
        ))}
      </div>
    </Page>
  )
}
