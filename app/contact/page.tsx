import type { Metadata } from 'next'
import { profile } from '@/data/profile'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { ShaderBackground } from '@/components/ui/plasma-shader'
import { Arrow } from '@/components/ui/Arrow'
import { getLocale } from '@/lib/i18n-server'
import { t } from '@/data/i18n'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} — ${profile.title}.`,
  alternates: { canonical: '/contact' },
}

/**
 * CONTACT — Light plasma panel
 *
 * The plasma stays, but inverted to a pale silver and held inside a rounded
 * panel within the page margins — a signature moment, not a black page.
 * The email address is the headline call to action. Below, on white, the
 * form takes the wide column and the details sit in a sticky sidebar.
 */
export default async function ContactPage() {
  const d = t(await getLocale())
  const c = d.contact
  return (
    <section className="cb pt-[clamp(96px,14vh,150px)] pb-[clamp(80px,12vh,160px)]">
      <Page>
        {/* ── Plasma panel ─── */}
        <Reveal>
          <div className="cb-panel">
            <div aria-hidden="true" className="cb-plasma">
              <ShaderBackground className="h-full w-full" />
            </div>
            <div className="cb-panel-inner">
              <div className="flex items-center justify-between gap-4">
                <p className="cb-eyebrow">{c.eyebrow}</p>
                <p className="cb-status">
                  <span className="cb-dot" aria-hidden="true" />
                  {c.status}
                </p>
              </div>

              <div>
                <h1 className="cb-title">
                  {c.headline}
                </h1>
                <a href={`mailto:${profile.email}`} className="cb-mail">
                  <span dir="ltr">{profile.email}</span>
                  <span aria-hidden="true" className="cb-mail-arrow">{d.arrow}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Form + details ─── */}
        <div className="grid-page mt-[clamp(56px,9vh,112px)] gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Reveal>
              <div className="cb-form-card">
              <p className="cb-label">{c.formLabel}</p>
              <p className="cb-sub mt-3">
                {c.formSub}
              </p>
              <div className="mt-[clamp(32px,5vw,56px)]">
                <ContactForm />
              </div>
              </div>
            </Reveal>
          </div>

          <aside className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[120px]">
              <Reveal delay={100}>
                <div className="cb-side">
                  <div>
                    <p className="cb-label">{c.basedIn}</p>
                    {c.cities.map((city) => (
                      <p key={city} className="cb-value">{city}</p>
                    ))}
                  </div>
                  <div>
                    <p className="cb-label">{c.availableFor}</p>
                    <ul className="cb-tags">
                      {c.services.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="cb-label">{c.elsewhere}</p>
                    <ul className="mt-2">
                      {profile.social.map((s) => (
                        <li key={s.label}>
                          <a className="cb-social" href={s.href} target="_blank" rel="noreferrer">
                            <span lang="en">{s.label}</span>
                            <Arrow direction="up-right" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </Page>
    </section>
  )
}
