import type { ManifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { directionProps } from '@/lib/rtl'

/** An image at roughly half width beside a text column. */
export function SideBySideBlock({
  image,
  heading,
  body,
  noRounding = false,
}: {
  image: ManifestImage
  heading?: string
  body: string
  noRounding?: boolean
}) {
  return (
    <Page>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
        <BlockImage image={image} sizes="(max-width: 768px) 100vw, 50vw" fit="natural" noRounding={noRounding} />
        <Reveal delay={100}>
          {heading && (
            <h3 className="t-headline mb-6" {...directionProps(heading)}>
              {heading}
            </h3>
          )}
          <p className="t-body" {...directionProps(body)}>
            {body}
          </p>
        </Reveal>
      </div>
    </Page>
  )
}
