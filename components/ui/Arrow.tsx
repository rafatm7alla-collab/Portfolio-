/**
 * A thin line arrow, drawn — never typed.
 *
 * The diagonal arrow characters (↗ ↘ …) are emoji on iOS: Safari swaps
 * them for a blue, rounded emoji tile that breaks the black-and-white
 * system. This draws the same arrow as a 1.5px line in the text colour,
 * sized to the surrounding type (1em box, sits on the text's centre).
 */

const PATHS = {
  'up-right': ['M4 12 L12 4', 'M5.5 4 H12 V10.5'],
  'down-right': ['M4 4 L12 12', 'M12 5.5 V12 H5.5'],
  right: ['M2.5 8 H13', 'M9 4 L13 8 L9 12'],
} as const

export function Arrow({
  direction = 'up-right',
  className = '',
}: {
  direction?: keyof typeof PATHS
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ width: '0.9em', height: '0.9em', display: 'inline-block', verticalAlign: '-0.08em', flexShrink: 0 }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[direction].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
