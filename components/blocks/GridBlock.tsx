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
  const isThree = columns === 3

  return (
    <Page>
      <div className={`grid grid-cols-2 gap-4 ${isThree ? 'md:grid-cols-3' : ''}`}>
        {images.map((image, i) => (
          <BlockImage
            key={image.filename + i}
            image={image}
            sizes={
              isThree
                ? '(max-width: 768px) 50vw, 33vw'
                : '(max-width: 768px) 50vw, 50vw'
            }
            fit="cover"
            aspect="4 / 3"
            // Capped at 6 so a long grid does not stagger for two seconds.
            delay={Math.min(i, 5) * 100}
            noRounding={noRounding}
          />
        ))}
      </div>
    </Page>
  )
}
