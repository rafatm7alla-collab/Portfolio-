import type { Metadata } from 'next'
import { profile } from '@/data/profile'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta, Micro } from '@/components/type/Type'
import { ContactForm } from '@/components/contact/ContactForm'
import { ShaderBackground } from '@/components/ui/plasma-shader'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} — ${profile.title}.`,
  alternates: { canonical: '/contact' },
}

/**
 * DRAFT — Frosted glass form on plasma
 *
 * The page background runs the same slow plasma shader used on the homepage
 * banner. The form card is a frosted-glass panel over it — thin hairline
 * border, large radius, strong backdrop blur. The darkness comes from the
 * plasma, not from a heavy black fill, so the whole page feels lighter and
 * more premium.
 */
export default function ContactGlass() {
  return (
    <section
      data-invert
      data-nav="dark"
      className="relative min-h-screen pt-[clamp(80px,12vh,180px)] pb-[clamp(64px,8vh,120px)] overflow-hidden"
      style={{ background: '#050505', color: '#fff' }}
    >
      {/* Plasma background — soft, slow, filling the whole viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 0 }}
      >
        <ShaderBackground className="h-full w-full" />
      </div>

      {/* A gentle dark vignette so the type stays readable over the plasma. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div className="relative" style={{ zIndex: 2 }}><Page>
        <div className="grid-page gap-y-[clamp(48px,8vh,96px)]">
          {/* ── LEFT: statement + direct details ─── */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Micro as="p" secondary className="uppercase" style={{ letterSpacing: '0.28em', opacity: 0.6 }}>
                Contact
              </Micro>
              <h1
                className="mt-6 font-bold"
                style={{
                  fontSize: 'clamp(34px, 4.6vw, 64px)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.02,
                  maxWidth: '14ch',
                }}
              >
                Every strong brand starts with one conversation.
              </h1>
            </Reveal>

            <Reveal delay={80}>
              <p
                className="mt-[clamp(20px,3vw,32px)] font-light"
                style={{
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  lineHeight: 1.55,
                  maxWidth: '40ch',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                A commission, a brand build, or an idea that has not started
                yet — send it over and let's shape it together.
              </p>
            </Reveal>

            <div className="mt-[clamp(40px,6vh,72px)] space-y-7">
              {[
                ['Email', <a key="e" href={`mailto:${profile.email}`} className="link">{profile.email}</a>],
                ['Based in', 'Belgrade, Serbia  ·  Erbil, Iraq'],
                ['Available for', profile.availableFor.join(' · ')],
                [
                  'Elsewhere',
                  <span key="s" className="inline-flex flex-wrap gap-x-5">
                    {profile.social.map((s) => (
                      <a key={s.label} className="link" href={s.href} target="_blank" rel="noreferrer">
                        {s.label}
                      </a>
                    ))}
                  </span>,
                ],
              ].map(([label, value], i) => (
                <Reveal key={String(label)} delay={160 + i * 50}>
                  <div>
                    <Micro secondary className="uppercase" style={{ letterSpacing: '0.22em', opacity: 0.55 }}>
                      {label}
                    </Micro>
                    <div className="mt-2" style={{ fontSize: 'clamp(15px,1.15vw,17px)' }}>
                      {value}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── RIGHT: frosted glass form card ─── */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <div className="lg:sticky lg:top-[120px]">
              <Reveal delay={120}>
                <div
                  className="contact-glass p-[clamp(28px,3.5vw,48px)]"
                  style={{ ['--hairline' as string]: 'rgba(255,255,255,0.22)' }}
                >
                  <Meta as="p" secondary className="uppercase" style={{ letterSpacing: '0.22em', opacity: 0.65 }}>
                    Start a project
                  </Meta>
                  <p
                    className="mt-3 font-bold"
                    style={{
                      fontSize: 'clamp(22px, 2.2vw, 30px)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.15,
                    }}
                  >
                    A few lines are enough. I'll reply within a day or two.
                  </p>
                  <div className="mt-[clamp(28px,4vw,48px)]">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Page></div>
    </section>
  )
}
