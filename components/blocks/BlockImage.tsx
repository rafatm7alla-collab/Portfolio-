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
/**
 * A missing asset used to render as a flat grey plate with the raw
 * filename as a reminder. Rafat asked for a public-facing "coming
 * soon" treatment instead: a quiet gradient ground, a large SOON
 * mark, and a short "will be uploaded soon" line below it.
 *
 * The filename is kept as a debug hint but moved to a title tooltip
 * so a reader doesn't see raw slot names in the composition.
 */
function MissingAsset({ filename }: { filename: string }) {
  return (
    <div
      title={filename}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(120% 120% at 50% 30%, #1b1b1b 0%, #0a0a0a 70%, #000 100%)',
      }}
    >
      {/* Faint, blurred sheen so the plate reads as a withheld frame,
          not a dead swatch. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 50%, rgba(255,255,255,0.08), rgba(255,255,255,0) 70%)',
          filter: 'blur(32px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <span
          className="font-bold uppercase text-white"
          style={{
            fontSize: 'clamp(56px, 10vw, 160px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          Soon
        </span>
        <span
          className="uppercase text-white/55"
          style={{
            fontSize: 'clamp(10px, 1vw, 12px)',
            letterSpacing: '0.28em',
          }}
        >
          Will be uploaded soon
        </span>
      </div>
    </div>
  )
}
