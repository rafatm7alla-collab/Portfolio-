/**
 * PAGE TRANSITION
 *
 * template.tsx remounts on every navigation, so the enter animation runs
 * without any router interception. 520ms opacity + 16px rise.
 *
 * Done as a CSS animation (see .page-enter in globals.css) rather than a
 * motion component: once it finishes it leaves NO transform on the
 * wrapper. A leftover transform — even an identity matrix — turns the
 * wrapper into the containing block for position: fixed, which breaks
 * pinned scroll sections (they fall back to per-frame transforms, one
 * frame behind smooth scrolling, and stutter).
 *
 * The exit half is deliberately omitted: App Router unmounts the outgoing
 * tree before an exit animation can play.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
