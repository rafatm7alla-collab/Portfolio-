import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * Constrained measure, never full width.
 *
 * 65ch is set with the `ch` unit rather than a pixel width so the measure
 * tracks the font size across breakpoints — the point is a line length the
 * eye can return from, and that is a character count, not a distance.
 *
 * Direction is decided per string, not per block: an English body with an
 * Arabic list under it is one block, and each line gets the direction its own
 * script calls for.
 */
export function TextBlock({
  body,
  heading,
  list,
  light = false,
}: {
  body: string
  heading?: string
  list?: string[]
  light?: boolean
}) {
  return (
    <Page>
      <div className="max-w-[65ch]">
        {heading && (
          <Reveal>
            <h3 className="t-headline mb-8" {...directionProps(heading)}>
              {heading}
            </h3>
          </Reveal>
        )}

        <Reveal delay={heading ? 80 : 0}>
          {/* Blank lines become paragraphs — a body should not have to be
              one unbroken run just because JSON has no paragraph concept. */}
          {body
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean)
            .map((paragraph, i) => (
              <p
                key={i}
                className={`t-body ${light ? 'font-light' : ''} ${i === 0 ? '' : 'mt-6'}`}
                {...directionProps(paragraph)}
              >
                {paragraph}
              </p>
            ))}
        </Reveal>

        {list && list.length > 0 && (
          <Reveal delay={160} className="mt-10">
            <ul>
              {list.map((line, i) => (
                <li
                  key={i}
                  className="t-lede py-2"
                  style={{ borderTop: i === 0 ? undefined : '1px solid var(--hairline)' }}
                  {...directionProps(line)}
                >
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </Page>
  )
}
