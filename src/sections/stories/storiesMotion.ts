/**
 * Pure helpers for the Section 04 gallery (Codrops "Infinite Scroll Gallery with
 * Page Transitions using GSAP", adapted to natural page scroll).
 */

/**
 * Smoothing of the depth offsets, per 60fps frame. The reference eases its
 * playhead towards the scroll input (power3.out over 0.75s); this lerp settles
 * in about the same time.
 */
export const STORIES_EASE = 0.1

/**
 * Per-column depth. The reference gives every slide its own speed (0.7–1.3×); in
 * the approved two-column composition cards of one column sit as little as 3px
 * apart, so speed is shared per column: the right column travels 1.12× page
 * speed, the left 0.975×. Same-column gaps only scale (never cross), while the
 * two columns visibly slide against each other — the reference's sense of depth.
 */
export const COLUMN_FACTOR = { left: -0.025, right: 0.12 } as const

/** Cards whose frame starts left of this x (px at 1440) belong to the left column. */
export const COLUMN_SPLIT = 720

export function columnOf(x: number): keyof typeof COLUMN_FACTOR {
  return x < COLUMN_SPLIT ? 'left' : 'right'
}

/**
 * Depth offset for a card: zero when its centre crosses the viewport centre (so
 * the composition matches Figma exactly there), growing linearly away from it
 * and capped one viewport away, so off-screen cards never drift far from their
 * slot (or into the reveal threshold). A positive factor makes the card travel
 * faster than the page. Capping only ever reduces the relative movement of two
 * cards, so same-column gaps stay within the uncapped bounds.
 */
export function depthOffset(cardCenter: number, viewportHeight: number, factor: number) {
  const half = viewportHeight / 2
  const distance = Math.min(viewportHeight, Math.max(-viewportHeight, cardCenter - half))
  return factor * distance
}

/** Index in [0, length) for any integer, so next/previous wrap around. */
export function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length
}

/** Horizontal swipe direction (1 = next, -1 = previous) or 0 when it was a tap or a vertical pan. */
export function swipeDirection(dx: number, dy: number, threshold = 48): -1 | 0 | 1 {
  if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return 0
  return dx < 0 ? 1 : -1
}

/** Two-digit index used in captions and counters ("01"). */
export const pad2 = (value: number) => String(value).padStart(2, '0')
