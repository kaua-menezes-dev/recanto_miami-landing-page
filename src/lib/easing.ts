/**
 * CSS-style cubic-bezier timing function for scroll-linked motion, so scrubbed
 * effects share the Design System curves (Motion tokens) with CSS transitions.
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx

  // Newton–Raphson, falling back to bisection where the slope is too flat.
  const solveT = (x: number) => {
    let t = x
    for (let i = 0; i < 6; i++) {
      const error = sampleX(t) - x
      const slope = slopeX(t)
      if (Math.abs(error) < 1e-5) return t
      if (Math.abs(slope) < 1e-6) break
      t -= error / slope
    }
    let lo = 0
    let hi = 1
    t = x
    while (hi - lo > 1e-5) {
      if (sampleX(t) < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return t
  }

  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    return sampleY(solveT(x))
  }
}

/** Design System "Drift" curve — moving between places. */
export const easeDrift = cubicBezier(0.65, 0, 0.35, 1)
