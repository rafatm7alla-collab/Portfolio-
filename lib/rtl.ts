/**
 * Direction detection for mixed Arabic / Latin content.
 *
 * A manifest is authored by hand, so a string should not need a `dir` field
 * next to it — the script itself is the signal.
 *
 * Ranges covered: Arabic, Arabic Supplement, Arabic Extended-A, Arabic
 * Presentation Forms A/B, plus Hebrew, Syriac and Thaana so the same helper
 * keeps working if the site ever carries them.
 */

const RTL_RANGES =
  /[֑-߿ࡠ-࡯ࢠ-ࣿיִ-﷽ﹰ-ﻼ]/

/** Any right-to-left character at all. */
export function containsRTL(text: string): boolean {
  return RTL_RANGES.test(text)
}

/**
 * Direction for a whole string.
 *
 * Decided by majority of *strong* characters rather than "contains any RTL":
 * an English paragraph quoting one Arabic word must stay LTR, and an Arabic
 * paragraph naming "Toyota Crown" must stay RTL. Digits and punctuation are
 * directionally neutral and are excluded from the count — counting them would
 * flip a short Arabic line that happens to contain a year.
 */
export function textDirection(text: string): 'rtl' | 'ltr' {
  const strong = text.match(
    /[֑-߿ࡠ-࡯ࢠ-ࣿיִ-﷽ﹰ-ﻼ]|[A-Za-zÀ-ɏ]/g,
  )
  if (!strong) return 'ltr'

  const rtlCount = strong.filter((char) => RTL_RANGES.test(char)).length
  return rtlCount > strong.length / 2 ? 'rtl' : 'ltr'
}

/**
 * Props to spread onto the element wrapping a string of unknown script.
 * `textAlign` follows direction so an RTL paragraph is not left-ragged
 * against a left margin it does not belong to.
 */
export function directionProps(text: string) {
  const dir = textDirection(text)
  return dir === 'rtl'
    ? { dir, style: { textAlign: 'right' as const } }
    : { dir }
}
