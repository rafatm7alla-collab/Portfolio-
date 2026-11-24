import type { Metadata } from 'next'
import { profile } from '@/data/profile'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { ShaderBackground } from '@/components/ui/plasma-shader'
import { Arrow } from '@/components/ui/Arrow'

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
export default function ContactPage() {
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
                <p className="cb-eyebrow">Contact</p>
                <p className="cb-status">
                  <span className="cb-dot" aria-hidden="true" />
                  Open for collaborations
                </p>
              </div>

              <div>
                <h1 className="cb-title">
                  Every strong brand starts with one conversation.
                </h1>
                <a href={`mailto:${profile.email}`} className="cb-mail">
                  {profile.email}
                  <span aria-hidden="true" className="cb-mail-arrow">→</span>
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
              <p className="cb-label">Or write it here</p>
              <p className="cb-sub mt-3">
                A commission, a brand build, or an idea that has not started yet.
                A few lines are enough — I&apos;ll reply within a day or two.
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
                    <p className="cb-label">Based in</p>
                    <p className="cb-value">Belgrade, Serbia</p>
                    <p className="cb-value">Erbil, Iraq</p>
                  </div>
                  <div>
                    <p className="cb-label">Available for</p>
                    <ul className="cb-tags">
                      {profile.availableFor.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="cb-label">Elsewhere</p>
                    <ul className="mt-2">
                      {profile.social.map((s) => (
                        <li key={s.label}>
                          <a className="cb-social" href={s.href} target="_blank" rel="noreferrer">
                            <span>{s.label}</span>
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
