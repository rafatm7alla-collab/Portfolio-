import type { Metadata } from 'next'
import { profile } from '@/data/profile'
import { Page, Rule } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { DisplayPair, Meta, Micro } from '@/components/type/Type'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} — ${profile.title}.`,
  alternates: { canonical: '/contact' },
}

/**
 * Two columns: the statement and the direct details on the left, the form on
 * the right. The form is the only piece of product UI on the site, so it is
 * built entirely from hairlines and 11px labels — no boxes, no fills, no
 * rounded corners — and the direct email stays prominent beside it for anyone
 * who would rather not use it.
 */
export default function ContactPage() {
  return (
    <section className="pb-[var(--section-gap)] pt-[clamp(100px,24vh,300px)]">
      <Page>
        <div className="grid-page gap-y-[clamp(64px,10vh,128px)]">
          {/* ─── Left ─────────────────────────────────────────────── */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Meta as="p" secondary>
                (Contact)
              </Meta>
            </Reveal>

            <div className="mt-8">
              <DisplayPair
                as="h1"
                bold={profile.contactStatement.bold}
                light={profile.contactStatement.light}
                boldFirst={false}
                uppercaseBold={false}
                size="m"
                delay={80}
              />
            </div>

            <Reveal delay={200} className="mt-[clamp(32px,5vh,56px)]">
              <p className="t-lede max-w-[46ch]">
                Whether it is a commission, a brand build, or a conversation about
                a project that has not started yet — get in touch.
              </p>
            </Reveal>

            <div className="mt-[clamp(48px,8vh,96px)] space-y-10">
              <Detail label="Email" delay={260}>
                <a href={`mailto:${profile.email}`} className="link">
                  {profile.email}
                </a>
              </Detail>

              {/* Rendered only when a real number exists — never invented. */}
              {profile.phone && (
                <Detail label="Phone" delay={300}>
                  <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="link">
                    {profile.phone}
                  </a>
                </Detail>
              )}

              {/* Both bases in full here — Contact has the room for it. */}
              <Reveal delay={340}>
                <Meta as="p" secondary>
                  Based in
                </Meta>
                <ul className="mt-3">
                  {profile.locations.map((place) => (
                    <li
                      key={place.city}
                      className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.6]"
                    >
                      {place.city}, {place.country}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Detail label="Available for" delay={380}>
                {profile.availableFor.join(' · ')}
              </Detail>

              <Reveal delay={420}>
                <Meta as="p" secondary>
                  Elsewhere
                </Meta>
                <ul className="mt-3 flex flex-wrap gap-6">
                  {profile.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="t-meta link"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* ─── Right ────────────────────────────────────────────── */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>

        <Rule className="mt-[var(--section-gap)]" />
        <Micro as="p" secondary className="mt-5">
          {profile.location} · Available for selected projects,{' '}
          {new Date().getFullYear()}
        </Micro>
      </Page>
    </section>
  )
}

function Detail({
  label,
  children,
  delay,
}: {
  label: string
  children: React.ReactNode
  delay: number
}) {
  return (
    <Reveal delay={delay}>
      <Meta as="p" secondary>
        {label}
      </Meta>
      <p className="mt-3 text-[clamp(1rem,1.4vw,1.125rem)]">{children}</p>
    </Reveal>
  )
}
