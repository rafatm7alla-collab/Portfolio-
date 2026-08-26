import NextImage from 'next/image'

export type PortraitConfig = {
  src: string
  alt: string
  objectPosition: string
  /**
   * 'cover' for photography — it should fill the panel and crop.
   * 'contain' for a logo mark — it must never crop, and gets breathing room.
   */
  fit?: 'cover' | 'contain'
}

/**
 * HERO PORTRAIT — the right-half banner used on the homepage and About.
 *
 * Composition rules, learned the hard way on the homepage:
 *
 * · The panel is exactly the right half. Everything left of centre stays
 *   white so display type never sits on the photograph. A full-bleed
 *   background was tried and rejected — the hero is ~1.7:1 and the source is
 *   3.06:1, so `cover` crops away the empty side the type needs and drops the
 *   face behind the name.
 *
 * · It starts below the navigation band. The nav uses mix-blend-difference,
 *   which is illegible over fluted glass; keeping clear of it means the nav
 *   always sits on white.
 *
 * · No scrim. Nothing is laid over this image, so §06's ban on gradients
 *   stands here.
 */
export function PortraitPanel({
  portrait,
  priority = false,
}: {
  portrait: PortraitConfig
  priority?: boolean
}) {
  const contain = portrait.fit === 'contain'

  return (
    <div className="absolute bottom-0 right-0 top-[clamp(80px,10vh,104px)] hidden w-1/2 md:block">
      <NextImage
        src={portrait.src}
        alt={portrait.alt}
        fill
        priority={priority}
        quality={90}
        sizes="50vw"
        className={contain ? 'object-contain' : 'object-cover'}
        style={{ objectPosition: portrait.objectPosition }}
      />
    </div>
  )
}

/**
 * The mobile counterpart: a full-bleed band beneath the type rather than
 * beside it. At 375px a half-width panel is meaningless, and putting the
 * photograph behind the type leaves no legible ground for black display type.
 */
export function PortraitBand({
  portrait,
  priority = false,
}: {
  portrait: PortraitConfig
  priority?: boolean
}) {
  const contain = portrait.fit === 'contain'

  return (
    <div className={`relative w-full md:hidden ${contain ? 'h-[28vh]' : 'h-[46vh]'}`}>
      <NextImage
        src={portrait.src}
        alt={portrait.alt}
        fill
        priority={priority}
        quality={90}
        sizes="100vw"
        className={contain ? 'object-contain' : 'object-cover'}
        style={{ objectPosition: portrait.objectPosition }}
      />
    </div>
  )
}
