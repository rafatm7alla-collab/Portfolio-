'use client'

import { motion } from 'motion/react'

/**
 * PAGE TRANSITION
 *
 * template.tsx remounts on every navigation, so the enter animation runs
 * without any router interception. 520ms opacity + 16px rise.
 *
 * The exit half of the transition is deliberately omitted: App Router
 * unmounts the outgoing tree before an exit animation can play, and every
 * workaround for that (freezing the router, shadow-rendering the old page)
 * costs more in fragility than 380ms of fade is worth. Enter-only reads as
 * clean rather than missing — total transition stays inside the 900ms
 * budget either way.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
