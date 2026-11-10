import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

if (typeof window !== 'undefined') {
  // Mobile browsers resize the viewport when the address bar shows/hides
  // during scroll. Re-measuring every trigger on that caused visible jumps.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger }
