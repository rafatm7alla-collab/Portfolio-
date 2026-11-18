'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

/**
 * Sun/moon pill that flips the whole site between light and dark.
 *
 * The actual theme is applied by the small inline script in app/layout.tsx
 * BEFORE first paint, so there is no white flash. This component only reads
 * the current value, shows the toggle, and writes the new choice to
 * localStorage + the <html> data-theme attribute.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) || 'light'
    setTheme(current)
    // Enable colour transitions now that we're on the client — avoids a
    // flash of transition on the very first paint.
    document.documentElement.classList.add('theme-ready')
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch {}
    setTheme(next)
  }

  // Render a placeholder sized like the real button during SSR so the nav
  // never jumps when the client hydrates.
  if (theme === null) {
    return <span className={`theme-toggle-placeholder ${className}`} aria-hidden="true" />
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle pointer-events-auto ${className}`}
      data-theme={theme}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Both icons overlap; CSS hides one based on data-theme. */}
        <g className="theme-toggle__sun">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </g>
        <g className="theme-toggle__moon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </g>
      </svg>
    </button>
  )
}
