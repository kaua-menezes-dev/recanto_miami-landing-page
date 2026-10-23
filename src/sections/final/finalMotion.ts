const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * Progress of the Section 08 image expansion (Figma "Final / Motion / S1–S3"):
 * 0 when the stage's top edge enters at the bottom of the viewport (framed),
 * 1 when it reaches the top (full-bleed). By then the stage fills the screen,
 * so the framed state is only ever seen while the photo is arriving.
 * A pure function of scroll position, so scrolling back reverses it.
 */
export function expansionProgress(top: number, viewport: number) {
  return clamp01((viewport - top) / Math.max(1, viewport))
}
