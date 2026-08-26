'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * One IntersectionObserver per element, fired once, then disconnected.
 *
 * Deliberately not Framer Motion's whileInView: the site mounts dozens of
 * reveal targets per page and this keeps them as pure CSS transitions with
 * no per-element animation runtime. Motion is reserved for page transitions
 * and the cursor-following hover image, where a spring actually matters.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No observer support, or the element is already past — show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
