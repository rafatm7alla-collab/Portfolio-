/**
 * MOTION MODES — a live A/B, not a permanent fork.
 *
 * 'static'  the approved system: the MASK primitive fires once as an image
 *           enters, and nothing moves afterwards. DIRECTION.md §08 as written.
 *
 * 'scroll'  scroll-linked scale: a full-width project image sits at 1.12 and
 *           settles to 1.0 as it travels to the centre of the viewport. The
 *           MASK reveal still runs underneath it.
 *
 * Compare without editing anything:
 *     http://localhost:3000/?motion=scroll
 *     http://localhost:3000/?motion=static
 *
 * The query string wins over the default below. Once decided, set the
 * default, delete the loser, and amend DIRECTION.md §08 accordingly —
 * scroll-linked transforms are currently banned there in writing.
 */

export type MotionMode = 'static' | 'scroll'

/** What a visitor gets with no query string. */
export const DEFAULT_MOTION_MODE: MotionMode = 'scroll'

/** Enter at this scale, settle to 1.0. Higher reads as more cinematic. */
export const SCROLL_SCALE_FROM = 1.12
