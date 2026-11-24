'use client'

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { DiscoveryCallModal } from './DiscoveryCallModal'

type Ctx = { open: (model?: string) => void }
const BookingCtx = createContext<Ctx | null>(null)

/**
 * Holds the discovery-call modal for the whole Framework page, so any
 * trigger (the final CTA, an engagement model) opens the same dialog.
 * Focus returns to whichever trigger opened it.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; model?: string }>({ open: false })
  const returnTo = useRef<HTMLElement | null>(null)

  const open = useCallback((model?: string) => {
    returnTo.current = document.activeElement as HTMLElement | null
    setState({ open: true, model })
  }, [])

  const close = useCallback(() => {
    setState({ open: false })
    requestAnimationFrame(() => returnTo.current?.focus())
  }, [])

  return (
    <BookingCtx.Provider value={{ open }}>
      {children}
      {state.open && <DiscoveryCallModal model={state.model} onClose={close} />}
    </BookingCtx.Provider>
  )
}

export function BookingTrigger({
  children,
  className,
  model,
}: {
  children: ReactNode
  className?: string
  model?: string
}) {
  const ctx = useContext(BookingCtx)
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={() => ctx?.open(model)}>
      {children}
    </button>
  )
}
