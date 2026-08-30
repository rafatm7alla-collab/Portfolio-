'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { profile, navigation } from '@/data/profile'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[70] flex flex-col justify-between bg-[#0a0a0a] text-white"
          style={{ paddingInline: 'var(--page-margin)' }}
        >
          <div className="flex items-center justify-between py-[28px]">
            <span className="t-meta" style={{ letterSpacing: '0.18em' }}>
              {profile.name}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              className="t-meta"
              style={{ letterSpacing: '0.18em' }}
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="pb-[12vh]">
            {navigation.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  className="block py-2 font-bold uppercase"
                  style={{
                    fontSize: 'clamp(3rem, 14vw, 5rem)',
                    letterSpacing: '-0.035em',
                    lineHeight: 1.02,
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-end justify-between pb-[32px]">
            <a href={`mailto:${profile.email}`} className="t-meta link">
              {profile.email}
            </a>
            <ul className="flex gap-4">
              {profile.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="t-meta link"
                  >
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="t-meta"
        style={{ letterSpacing: '0.18em' }}
      >
        Menu
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  )
}
