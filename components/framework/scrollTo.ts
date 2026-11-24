/**
 * Smooth-scroll to a section and move focus there, so keyboard and
 * screen-reader users land in the same place as everyone else. Lenis
 * follows native scroll, so a native smooth scroll is enough here.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}
