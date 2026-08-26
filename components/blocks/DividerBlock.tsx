import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/** A text-only section break — small uppercase label + display-scale line. */
export function DividerBlock({ label, text }: { label: string; text: string }) {
  return (
    <Page>
      <div className="py-[clamp(64px,10vw,160px)]">
        <Reveal>
          <Meta secondary as="span">
            {label}
          </Meta>
        </Reveal>
        <Reveal delay={80} className="mt-6">
          <p className="t-display-m max-w-[20ch]" {...directionProps(text)}>
            {text}
          </p>
        </Reveal>
      </div>
    </Page>
  )
}
