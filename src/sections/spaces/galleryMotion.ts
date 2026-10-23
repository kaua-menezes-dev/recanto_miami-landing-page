/** Reference smoothing (Codrops Horizontal Parallax Gallery): lerp 0.07 per 60fps frame. */
export const GALLERY_EASE = 0.07
/** Inner photo overscan on each side (× frame width); must match `.spaces-image` in CSS. */
export const GALLERY_OVERSCAN = 0.08

const FRAME_MS = 1000 / 60

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** 0 → 1 between two scroll positions (clamped). */
export function scrollProgress(scrollY: number, start: number, end: number) {
  if (end <= start) return scrollY >= start ? 1 : 0
  return clamp((scrollY - start) / (end - start), 0, 1)
}

/**
 * One frame of the reference's lerp, made frame-rate independent so 120Hz and
 * 60Hz screens glide at the same speed. Snaps when under a tenth of a pixel so
 * the loop can stop.
 */
export function smoothTowards(current: number, target: number, elapsedMs: number, ease = GALLERY_EASE) {
  const next = current + (target - current) * (1 - Math.pow(1 - ease, elapsedMs / FRAME_MS))
  return Math.abs(target - next) < 0.1 ? target : next
}

/**
 * Inner parallax as in the reference: a photo centred in the viewport sits at 0;
 * at one half-viewport away it is shifted by the full overscan, in % of the
 * image's own (overscanned) width, so the frame edge is never exposed.
 */
export function parallaxPercent(frameCenter: number, viewportWidth: number, overscan = GALLERY_OVERSCAN) {
  const half = viewportWidth / 2
  const offset = clamp((frameCenter - half) / Math.max(1, half), -1, 1)
  return -offset * (overscan / (1 + 2 * overscan)) * 100
}
