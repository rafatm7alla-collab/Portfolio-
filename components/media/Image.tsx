'use client'

import NextImage from 'next/image'
import type { Img } from '@/types/project'
import { MediaReveal } from '@/components/media/MediaReveal'

type Props = {
  image: Img
  /** Maps to the grid slot this image occupies. Drives responsive widths. */
  sizes: string
  priority?: boolean
  /** Forces a crop instead of the image's intrinsic ratio. */
  aspect?: string
  className?: string
  delay?: number
}

/**
 * The only way an image enters the page.
 *
 * MASK primitive: container clip-path inset(100% → 0) bottom-up over 900ms
 * while the image inside scales 1.06 → 1. Images never fade in.
 *
 * When `image.src` is empty the asset has not been supplied yet, so a
 * correctly-proportioned placeholder block renders instead of a broken
 * <img> — layout and rhythm stay reviewable before photography lands.
 */
export function Image({
  image,
  sizes,
  priority = false,
  aspect,
  className = '',
  delay = 0,
}: Props) {
  const ratio = aspect ?? `${image.width} / ${image.height}`
  const isPending = image.src === ''

  return (
    <MediaReveal
      delay={delay}
      immediate={priority}
      className={className}
      style={{ aspectRatio: ratio }}
    >
      {isPending ? (
        <PendingAsset alt={image.alt} />
      ) : (
        <NextImage
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          unoptimized={image.unoptimized}
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          className="object-cover"
        />
      )}
    </MediaReveal>
  )
}

/**
 * No asset supplied. Honest about it.
 *
 * Mid-grey rather than near-white on purpose: the block has to read as
 * image mass so composition and rhythm can be judged before the real
 * photography lands. It disappears the moment a src is set.
 */
function PendingAsset({ alt }: { alt: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#d6d6d6]">
      <span className="t-micro px-4 text-center text-[#8a8a8a]">{alt}</span>
    </div>
  )
}
