import { Page, Rule } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/** Numbered principles — a short title and one sentence each, stacked. */
export function PrinciplesBlock({
  items,
}: {
  items: { title: string; body: string }[]
}) {
  return (
    <Page>
      <div className="max-w-[65ch]">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className={i === 0 ? '' : 'mt-10'}>
              {i > 0 && <Rule className="mb-10" />}
              <Meta secondary as="span">
                {String(i + 1).padStart(2, '0')}
              </Meta>
              <h3 className="t-headline mt-3" {...directionProps(item.title)}>
                {item.title}
              </h3>
              <p className="t-body mt-3" {...directionProps(item.body)}>
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Page>
  )
}
