'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { dirOf, isArabicPath, type Locale } from '@/lib/i18n'

const LocaleContext = createContext<Locale>('en')

/**
 * The root layout persists across client navigation, so the locale it read
 * from the first request can go stale (e.g. /ar → an English project page).
 * After each navigation the URL decides again, and <html lang/dir> follows.
 */
export function LocaleProvider({ initial, children }: { initial: Locale; children: ReactNode }) {
  const pathname = usePathname()
  const [locale, setLocale] = useState<Locale>(initial)

  useEffect(() => {
    const next: Locale = isArabicPath(window.location.pathname) ? 'ar' : 'en'
    setLocale(next)
    document.documentElement.lang = next
    document.documentElement.dir = dirOf(next)
  }, [pathname])

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
