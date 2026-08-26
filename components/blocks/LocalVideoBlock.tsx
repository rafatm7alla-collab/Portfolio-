'use client'

import { useEffect, useRef, useState } from 'react'
import type { ManifestImage } from '@/lib/manifest'
import { MediaReveal } from '@/components/media/MediaReveal'
import { Page } from '@/components/primitives/Layout'
import { Micro } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * A video the project owns outright — an OOH screen loop, not a Vimeo or
 * YouTube id. No provider iframe, no click needed: it is muted and has no
 * dialogue to interrupt, so it plays as soon as it reaches the viewport,
 * the way the screen it was built for would run it.
 *
 * Same lazy-mount discipline as the provider embeds — nothing is requested
 * until the block is actually approaching the viewport — because a raw
 * video file has no thumbnail-only mode the way a provider iframe does.
 */
export function LocalVideoBlock({
  src,
  poster,
  title,
  missing,
  aspect = '16 / 9',
  size = 'full',
  widthPercent = 75,
  noRounding = false,
}: {
  src: string
  poster?: string
  title: string
  missing: boolean
  aspect?: string
  size?: 'full' | 'contained'
  widthPercent?: number
  noRounding?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const vw = `${widthPercent}vw`

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setMounted(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setMounted(true)
        observer.unobserve(entry.target)
      },
      { rootMargin: '0px 0px 200px 0px', threshold: 0.01 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <figure>
      <div
        className={size === 'contained' ? 'mx-auto' : 'bleed'}
        style={size === 'contained' ? { width: vw, maxWidth: vw } : undefined}
      >
        <MediaReveal className={noRounding ? '' : 'rounded-2xl'} style={{ aspectRatio: aspect }}>
          {missing ? (
            <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a]">
              <Micro as="p" className="px-4 text-center text-white/60">
                {title} — file not supplied
              </Micro>
            </div>
          ) : (
            <div className="relative h-full w-full bg-[#0a0a0a]">
              {mounted && (
                <video
                  src={src}
                  poster={poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <track kind="captions" />
                </video>
              )}
            </div>
          )}
        </MediaReveal>
      </div>

      <Page>
        <Micro secondary as="figcaption" className="mt-4" {...directionProps(title)}>
          {title}
        </Micro>
      </Page>
    </figure>
  )
}
