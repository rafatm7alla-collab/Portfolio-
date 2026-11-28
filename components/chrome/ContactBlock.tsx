import { profile } from '@/data/profile'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { DisplayPair, Meta } from '@/components/type/Type'
import { getLocale } from '@/lib/i18n-server'
import { t } from '@/data/i18n'

/**
 * The closing statement. Black type on white at display-xl.
 *
 * Considered inverting this and rejected it (DIRECTION.md §06): the
 * About block above is already inverted, and two black fields in a row
 * make neither of them an event.
 */
export async function ContactBlock({ label = 'Contact' }: { label?: string }) {
  const d = t(await getLocale())
  return (
    <section className="pb-[64px] pt-[var(--section-gap)]">
      <Page>
        {/* Closes on the bold half — the light line sets it up. */}
        <div>
          <DisplayPair
            bold={d.contactStatement.bold}
            light={d.contactStatement.light}
            boldFirst={false}
            uppercaseBold={false}
          />
        </div>

        <Reveal delay={320} className="mt-[clamp(40px,6vw,96px)]">
          <a
            href={`mailto:${profile.email}`}
            className="link inline-block"
            dir="ltr"
            style={{
              fontSize: 'clamp(1.25rem, 2.4vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.015em',
            }}
          >
            {profile.email}
          </a>
        </Reveal>
      </Page>
    </section>
  )
}
