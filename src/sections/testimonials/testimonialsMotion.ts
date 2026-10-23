/**
 * Copies of each column's cards rendered while looping. The loop moves the list
 * up by exactly one copy (translateY −100% / copies) and restarts, so the window
 * must always be covered: column offset + (copies − 1) × copy height ≥ window
 * height. Three copies cover the desktop (788px) and tablet (1256px) windows.
 */
export const LOOP_COPIES = 3

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
