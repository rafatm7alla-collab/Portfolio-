'use client'

import NextImage from 'next/image'
import type { ManifestImage } from '@/lib/manifest'
import { MediaReveal } from '@/components/media/MediaReveal'

/**
 * The only way an image enters a block.
 *
 * Motion: the house MASK primitive — the frame's clip-path opens bottom-up
 * while the image inside settles from 1.06 to 1.0. Images never pop, and
 * never fade in from nothing.
 *
 * Layout shift: real intrinsic dimensions come from the file header, so the
 * frame reserves its exact height before the bytes arrive.
 *
 * `fit`:
 *   'natural' — the frame takes the image's own ratio. Required for
 *               fullBleed, which must never be cropped to a fixed height.
 *   'cover'   — the frame's ratio wins and the image crops into it. For grid
 *               and mosaic cells, where an even edge is the point.
 */
export function BlockImage({
  image,
  sizes,
  fit = 'natural',
  aspect,
  priority = false,
  delay = 0,
  className = '',
  noRounding = false,
}: {
  image: ManifestImage
  sizes: string
  fit?: 'natural' | 'cover'
  /** Only used when fit is 'cover'. */
  aspect?: string
  priority?: boolean
  delay?: number
  className?: string
  noRounding?: boolean
}) {
  const ratio =
    fit === 'natural' ? `${image.width} / ${image.height}` : (aspect ?? '4 / 3')

  return (
    <MediaReveal
      delay={delay}
      immediate={priority}
      className={`${noRounding ? '' : 'rounded-2xl'} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {image.missing ? (
        <MissingAsset filename={image.filename} />
      ) : (
        <NextImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          quality={90}
          unoptimized={image.unoptimized}
          className="h-full w-full object-cover"
        />
      )}
    </MediaReveal>
  )
}

/**
 * Named, not blank. A manifest referencing a file that is not on disk is a
 * fixable mistake, and the fix is much faster when the page says which file.
 */
function MissingAsset({ filename }: { filename: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#d6d6d6] px-4">
      <span className="t-micro text-center text-[#8a8a8a]">{filename}</span>
    </div>
  )
}
