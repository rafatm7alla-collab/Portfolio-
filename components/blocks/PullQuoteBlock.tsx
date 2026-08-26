import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { directionProps } from '@/lib/rtl'

/** One large centred display line — a full-width pause between sections. */
export function PullQuoteBlock({ text }: { text: string }) {
  return (
    <Page>
      <Reveal>
        <p
          className="t-display-m mx-auto max-w-[20ch] text-center"
          {...directionProps(text)}
        >
          {text}
        </p>
      </Reveal>
    </Page>
  )
}
