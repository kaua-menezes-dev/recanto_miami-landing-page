export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * Section progress for the column drift: 0 when the section top reaches the
 * bottom of the viewport, 1 when its bottom leaves the top (Figma S06 notes).
 * `remaining` is the scroll distance left on the page: when the page ends
 * before the section can leave, the range ends at the last reachable position
 * so the full drift still plays.
 */
export function sectionProgress(top: number, height: number, viewport: number, remaining = Infinity) {
  const endTop = Math.max(-height, top - remaining)
  return clamp((viewport - top) / Math.max(1, viewport - endTop), 0, 1)
}

/**
 * −1 → 1 across the section, 0 when it is centred in the viewport, so the
 * columns sit exactly at their Figma rest offsets in the middle of the pass.
 * Linear on purpose: the visitor's own scroll is the easing.
 */
export const driftFactor = (progress: number) => clamp(progress, 0, 1) * 2 - 1

/** Entrance stagger per card revealed in the same batch (Motion token stagger/text). */
export const REVEAL_STAGGER_MS = 80

/**
 * Reading order for cards entering together: the first card of every column
 * left to right, then the second, and so on. Rows are counted per column
 * because the masonry columns start at different heights.
 */
export function revealOrder<T extends { top: number; left: number }>(items: T[]) {
  const columns = new Map<number, T[]>()
  for (const item of items) {
    const left = Math.round(item.left)
    columns.set(left, [...(columns.get(left) ?? []), item])
  }
  const ranked = [...columns.entries()].flatMap(([left, column]) =>
    column.sort((a, b) => a.top - b.top).map((item, row) => ({ item, row, left })),
  )
  return ranked.sort((a, b) => a.row - b.row || a.left - b.left).map(({ item }) => item)
}
