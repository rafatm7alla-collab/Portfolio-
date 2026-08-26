'use client'

import { useEffect, useRef, useState } from 'react'
import { Page } from '@/components/primitives/Layout'
import { Micro } from '@/components/type/Type'

/**
 * A custom-skinned SoundCloud track — never the default orange widget.
 *
 * The iframe is loaded but visually hidden; every control on screen (play
 * button, progress bar, title/artist) is ours, driven entirely through the
 * SoundCloud Widget JS API against that hidden iframe.
 *
 * Autoplay: browsers block audio-with-sound until a real user gesture, so
 * "plays the moment the page opens" is built as "plays on the visitor's
 * first scroll or click anywhere on the page" — the earliest moment any
 * browser actually allows it, which still reads as automatic to a visitor
 * who doesn't have to hunt for a play button.
 *
 * `soundcloudUrl` prefixed `REPLACE_` — same idiom as videoEmbed's `id` —
 * holds an honest placeholder frame instead of pointing the widget at a
 * track that doesn't exist yet.
 */

declare global {
  interface Window {
    SC?: { Widget: SCWidgetConstructor }
  }
}

type SCWidgetEventData = { relativePosition?: number }
type SCWidget = {
  bind: (event: string, cb: (data?: SCWidgetEventData) => void) => void
  play: () => void
  pause: () => void
  toggle: () => void
}
type SCWidgetConstructor = {
  (iframe: HTMLIFrameElement): SCWidget
  Events: { READY: string; PLAY: string; PAUSE: string; FINISH: string; PLAY_PROGRESS: string }
}

let scLoad: Promise<void> | null = null
function loadSoundCloudWidgetApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.SC) return Promise.resolve()
  if (scLoad) return scLoad
  scLoad = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('SoundCloud widget API failed to load'))
    document.head.appendChild(script)
  })
  return scLoad
}

export function AudioEmbedBlock({
  soundcloudUrl,
  title,
  artist,
}: {
  soundcloudUrl: string
  title: string
  artist: string
}) {
  const unsupplied = !soundcloudUrl || /^REPLACE_/i.test(soundcloudUrl)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<SCWidget | null>(null)
  const startedRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (unsupplied) return
    let cancelled = false

    loadSoundCloudWidgetApi().then(() => {
      if (cancelled || !iframeRef.current || !window.SC) return
      const widget = window.SC.Widget(iframeRef.current)
      widgetRef.current = widget

      widget.bind(window.SC.Widget.Events.READY, () => {
        if (cancelled) return
        setReady(true)
        // Real autoplay attempt the instant the track is ready — succeeds
        // in browsers that allow it (e.g. the domain has been interacted
        // with before). The first-scroll/click listener below is the
        // guaranteed fallback for every browser that blocks this.
        widget.play()
      })
      widget.bind(window.SC.Widget.Events.PLAY, () => setIsPlaying(true))
      widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false))
      widget.bind(window.SC.Widget.Events.FINISH, () => setIsPlaying(false))
      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data) => {
        if (data?.relativePosition !== undefined) {
          setProgress(Math.min(100, data.relativePosition * 100))
        }
      })
    })

    return () => {
      cancelled = true
    }
  }, [unsupplied])

  // First scroll or click anywhere on the page — a real gesture, so the
  // browser allows audio to start — kicks off playback exactly once.
  useEffect(() => {
    if (unsupplied || !ready) return

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      widgetRef.current?.play()
    }

    window.addEventListener('scroll', start, { passive: true, once: true })
    window.addEventListener('click', start, { once: true })

    return () => {
      window.removeEventListener('scroll', start)
      window.removeEventListener('click', start)
    }
  }, [unsupplied, ready])

  const togglePlay = () => {
    startedRef.current = true
    widgetRef.current?.toggle()
  }

  return (
    <Page>
      {/* SoundCloud's own three brand colours — orange as the one accent
          against a black card and white type, not a full re-skin into
          their chrome. Card stays black/glass; only the controls that
          need to read at a glance (play button, progress) carry orange. */}
      <div
        className="rounded-2xl border p-6 md:p-8"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0a0a0a' }}
      >
        {unsupplied ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Micro as="p" secondary>
              SoundCloud track not supplied yet
            </Micro>
            <Micro as="p">
              {title} — {artist}
            </Micro>
          </div>
        ) : (
          <>
            <iframe
              ref={iframeRef}
              title={`${title} — ${artist}`}
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&auto_play=false&show_artwork=false&show_comments=false&show_playcount=false&show_user=false&visual=false`}
              className="absolute h-px w-px opacity-0"
              aria-hidden="true"
              tabIndex={-1}
            />

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause track' : 'Play track'}
                disabled={!ready}
                className="audio-play-btn relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-40"
              >
                {isPlaying && <span className="pointer-events-none absolute inset-0 rounded-full audio-pulse" />}
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <div className="min-w-0 flex-1">
                <Micro as="p" className="truncate font-bold text-white">
                  {title}
                </Micro>
                <Micro as="p" className="audio-artist mt-1 truncate">
                  {artist}
                </Micro>

                <div className="mt-4 h-[3px] w-full rounded-full bg-white/10">
                  <div className="audio-progress h-[3px] rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .audio-play-btn {
          background: #ff5500;
          box-shadow: 0 4px 20px rgba(255, 85, 0, 0.35);
        }
        .audio-play-btn:not(:disabled):hover {
          background: #ff7733;
        }
        .audio-pulse {
          border: 1px solid #ff5500;
          animation: audio-pulse 2s ease-out infinite;
        }
        .audio-artist {
          color: #ff5500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .audio-progress {
          background: #ff5500;
          transition: width 200ms linear;
        }
        @keyframes audio-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .audio-pulse { animation: none; }
          .audio-progress { transition: none; }
        }
      `}</style>
    </Page>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3 1.5v13l11-6.5-11-6.5Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3" y="2" width="3.5" height="12" />
      <rect x="9.5" y="2" width="3.5" height="12" />
    </svg>
  )
}
