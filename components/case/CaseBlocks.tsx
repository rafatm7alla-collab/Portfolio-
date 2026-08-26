import type { CaseSection, Img, Project } from '@/types/project'
import { Image } from '@/components/media/Image'
import { Page, Rule } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta, Micro, PlaceholderTag } from '@/components/type/Type'

/* ─── TITLE + META GRID ──────────────────────────────────────────── */

export function CaseMeta({ project }: { project: Project }) {
  const fields = [
    project.client ? { label: 'Client', value: project.client } : null,
    { label: 'Sector', value: project.sector },
    { label: 'Location', value: project.location },
    project.year ? { label: 'Year', value: String(project.year) } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <section className="pt-[clamp(48px,8vh,120px)]">
      <Page>
        {project.hero.variant === 'cover' && (
          <Reveal>
            <h1 className="t-display-l">{project.title}</h1>
          </Reveal>
        )}

        <Reveal delay={80} className="mt-[clamp(40px,6vw,80px)]">
          <Rule />
        </Reveal>

        <Reveal delay={140}>
          <dl className="grid-page mt-5 gap-y-6">
            {fields.map((f) => (
              <div key={f.label} className="col-span-2 md:col-span-2 lg:col-span-3">
                <dt>
                  <Meta secondary as="span">
                    {f.label}
                  </Meta>
                </dt>
                <dd className="mt-2 text-[15px] font-normal">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {project.isPlaceholder && (
          <Reveal delay={200} className="mt-8">
            <PlaceholderTag />
          </Reveal>
        )}
      </Page>
    </section>
  )
}

/* ─── LEDE — one sentence, ≤20 words ─────────────────────────────── */

export function CaseLede({ text }: { text: string }) {
  return (
    <section className="py-[var(--section-gap)]">
      <Page>
        <div className="grid-page">
          <Reveal className="col-span-4 md:col-span-7 md:col-start-2 lg:col-span-8 lg:col-start-3">
            <p className="t-headline">{text}</p>
          </Reveal>
        </div>
      </Page>
    </section>
  )
}

/* ─── LABEL / CONTENT TWO-COLUMN ─────────────────────────────────── */

export function CaseText({ label, body }: { label: string; body: string }) {
  // Blank lines in the data become paragraphs. A brief that needs two beats
  // should read as two, not as one wall.
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section className="pb-[var(--section-gap)]">
      <Page>
        <div className="grid-page gap-y-6">
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <Meta secondary as="h2">
              {label}
            </Meta>
          </Reveal>
          <Reveal delay={80} className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-5">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 't-body' : 't-body mt-6'}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Page>
    </section>
  )
}

/* ─── ROLE / SERVICES ────────────────────────────────────────────── */

export function CaseRole({ project }: { project: Project }) {
  return (
    <section className="pb-[var(--section-gap)]">
      <Page>
        <Rule />
        <div className="grid-page gap-y-6 pt-8">
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <Meta secondary as="h2">
              Role
            </Meta>
          </Reveal>
          <Reveal delay={80} className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-5">
            <ul>
              {project.services.map((s) => (
                <li
                  key={s}
                  className="text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.6]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Page>
    </section>
  )
}

/* ─── THE IDEA — the pivot of the page ───────────────────────────── */

export function CaseIdea({
  headline,
  body,
  image,
}: {
  headline: string
  body: string
  image?: Img
}) {
  return (
    <section className="py-[var(--section-gap)]">
      <Page>
        <Reveal>
          <Meta secondary as="h2">
            The Idea
          </Meta>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <p className="t-display-l">{headline}</p>
        </Reveal>

        {/* Optional image between the headline and the body copy — the idea
            stated, then shown, then explained. */}
        {image && (
          <div className="mt-[clamp(40px,6vw,88px)]">
            <Image image={image} sizes="(max-width: 768px) 100vw, 90vw" />
          </div>
        )}

        <div className="grid-page mt-[clamp(40px,6vw,88px)]">
          <Reveal delay={160} className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-5 lg:col-start-7">
            <p className="t-lede">{body}</p>
          </Reveal>
        </div>
      </Page>
    </section>
  )
}

/* ─── IMAGE BLOCKS ───────────────────────────────────────────────── */

function Caption({ text }: { text: string }) {
  return (
    <Micro secondary as="figcaption" className="mt-4">
      {text}
    </Micro>
  )
}

export function CaseImage({ section }: { section: Extract<CaseSection, { type: 'image' }> }) {
  const { layout, images, caption, offsetY } = section

  if (layout === 'bleed') {
    return (
      <figure className="pb-[var(--section-gap)]">
        <div className="bleed">
          <Image image={images[0]} sizes="100vw" aspect="16 / 9" />
        </div>
        {caption && (
          <Page>
            <Caption text={caption} />
          </Page>
        )}
      </figure>
    )
  }

  if (layout === 'inset') {
    return (
      <Page>
        <figure className="grid-page pb-[var(--section-gap)]">
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4">
            <Image image={images[0]} sizes="(max-width: 768px) 100vw, 50vw" />
            {caption && <Caption text={caption} />}
          </div>
        </figure>
      </Page>
    )
  }

  if (layout === 'split-l' || layout === 'split-r') {
    const left = layout === 'split-l'
    return (
      <Page>
        <figure className="grid-page pb-[var(--section-gap)]">
          <div
            className={`col-span-4 md:col-span-6 lg:col-span-8 ${
              left ? 'bleed-l' : 'bleed-r lg:col-start-5'
            }`}
          >
            <Image image={images[0]} sizes="(max-width: 768px) 100vw, 66vw" />
            {caption && <Caption text={caption} />}
          </div>
        </figure>
      </Page>
    )
  }

  if (layout === 'pair') {
    return (
      <Page>
        <figure className="grid-page gap-y-8 pb-[var(--section-gap)]">
          <div className="col-span-4 md:col-span-5 lg:col-span-5">
            <Image image={images[0]} sizes="(max-width: 768px) 100vw, 42vw" />
            {caption && <Caption text={caption} />}
          </div>
          <div
            className={`col-span-4 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-8 ${
              offsetY ? 'offset-y' : ''
            }`}
          >
            <Image
              image={images[1] ?? images[0]}
              sizes="(max-width: 768px) 100vw, 32vw"
              delay={120}
            />
          </div>
        </figure>
      </Page>
    )
  }

  // triptych — the only place a 3-up is permitted
  return (
    <Page>
      <figure className="grid-page gap-y-8 pb-[var(--section-gap)]">
        {images.slice(0, 3).map((img: Img, i: number) => (
          <div key={i} className="col-span-4 md:col-span-4 lg:col-span-4">
            <Image
              image={img}
              sizes="(max-width: 768px) 100vw, 32vw"
              delay={i * 100}
            />
          </div>
        ))}
        {caption && (
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <Caption text={caption} />
          </div>
        )}
      </figure>
    </Page>
  )
}

/* ─── CREDITS ────────────────────────────────────────────────────── */

export function CaseCredits({ credits }: { credits: { role: string; name: string }[] }) {
  return (
    <section className="pb-[var(--section-gap)]">
      <Page>
        <Rule />
        <Reveal>
          <dl className="grid-page gap-y-6 pt-8">
            {credits.map((c) => (
              <div key={c.role + c.name} className="col-span-2 md:col-span-4 lg:col-span-4">
                <dt>
                  <Micro secondary as="span">
                    {c.role}
                  </Micro>
                </dt>
                <dd className="mt-2 text-[15px]">{c.name}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Page>
    </section>
  )
}

/* ─── SEQUENCE RENDERER ──────────────────────────────────────────── */

export function CaseGallery({ sections }: { sections: CaseSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        switch (section.type) {
          case 'image':
            return <CaseImage key={i} section={section} />
          case 'text':
            return <CaseText key={i} label={section.label} body={section.body} />
          case 'idea':
            return (
              <CaseIdea
                key={i}
                headline={section.headline}
                body={section.body}
                image={section.image}
              />
            )
          case 'video':
            return <CaseVideo key={i} section={section} />
          case 'embed':
            return <CaseEmbed key={i} section={section} />
          case 'spacer':
            return (
              <div
                key={i}
                style={{
                  height:
                    section.size === 'xl'
                      ? 'var(--space-9)'
                      : section.size === 'lg'
                        ? 'var(--space-8)'
                        : 'var(--space-7)',
                }}
              />
            )
        }
      })}
    </>
  )
}

/* ─── EMBED ──────────────────────────────────────────────────────
   A third-party player, deliberately unadorned: no rounded corners, no
   shadow, no custom play button laid over it. Never autoplays — the
   viewer decides, which also keeps it out of §25's ban on anything
   running on a loop. Lazy-loaded so it costs nothing until scrolled to. */

function CaseEmbed({ section }: { section: Extract<CaseSection, { type: 'embed' }> }) {
  // dnt=1 stops Vimeo tracking the viewer; the chrome params strip the
  // title, byline and avatar so the frame stays black and white.
  const src = `https://player.vimeo.com/video/${section.id}?title=0&byline=0&portrait=0&dnt=1`

  const frame = (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a]" style={{ aspectRatio: '16 / 9' }}>
      <iframe
        src={src}
        title={section.title}
        loading="lazy"
        allow="fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
    </div>
  )

  return section.layout === 'bleed' ? (
    <div className="bleed pb-[var(--section-gap)]">{frame}</div>
  ) : (
    <Page>
      <div className="grid-page pb-[var(--section-gap)]">
        <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-3">
          {frame}
        </div>
      </div>
    </Page>
  )
}

function CaseVideo({ section }: { section: Extract<CaseSection, { type: 'video' }> }) {
  const video = (
    <video
      src={section.src}
      poster={section.poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      className="w-full"
    />
  )

  return section.layout === 'bleed' ? (
    <div className="bleed pb-[var(--section-gap)]">{video}</div>
  ) : (
    <Page>
      <div className="grid-page pb-[var(--section-gap)]">
        <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-3">
          {video}
        </div>
      </div>
    </Page>
  )
}
