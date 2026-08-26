'use client'

import NextImage from 'next/image'
import { useEffect, useRef, useState } from 'react'

export type VideoProvider = 'vimeo' | 'youtube'

/**
 * VIDEO PLAYER — loads when it reaches the viewport, not on page load.
 *
 * Earlier this was click-to-load: a black plate with our own PLAY button.
 * Two things were wrong with it. Without a poster the plate read as a void
 * rather than a film, and it asked for a click that bought the visitor
 * nothing — the player they landed on still needed a second click to start.
 *
 * Now: the real poster frame is visible immediately, and the player itself
 * mounts as the block scrolls into view. By the time it is on screen it is a
 * normal video the visitor can just press.
 *
 * The original performance requirement still holds — NO provider iframe on
 * page load. Nothing is requested until a film is actually reached, so a
 * visitor who never scrolls that far never pays for it.
 *
 * No autoplay. Five documentaries starting on their own would be hostile,
 * and browsers block unmuted autoplay anyway. The poster carries the frame
 * until the player takes over.
 */
export function VideoFacade({
  provider,
  id,
  title,
  poster,
  className = '',
}: {
  provider: VideoProvider
  id: string
  title: string
  poster?: { src: string } | null
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

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
      // Starts loading a little before it arrives, so the player is ready
      // rather than assembling itself under the visitor's eyes.
      { rootMargin: '0px 0px 200px 0px', threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const src =
    provider === 'vimeo'
      ? // dnt=1 — no viewer tracking. Chrome params keep the frame quiet.
        `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&dnt=1`
      : `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`

  return (
    <div ref={ref} className={`relative h-full w-full bg-[#0a0a0a] ${className}`}>
      {/* Poster sits underneath and simply stays there until the player
          paints over it — no flash of black between the two. */}
      {poster?.src && (
        <NextImage
          src={poster.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      )}

      {mounted && (
        <iframe
          src={src}
          title={title}
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      )}
    </div>
  )
}
