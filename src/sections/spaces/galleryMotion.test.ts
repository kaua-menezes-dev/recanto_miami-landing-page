import { describe, expect, it } from 'vitest'
import { GALLERY_OVERSCAN, parallaxPercent, scrollProgress, smoothTowards } from './galleryMotion'

describe('scrollProgress', () => {
  it('maps the range linearly and clamps outside it', () => {
    expect(scrollProgress(100, 100, 1534)).toBe(0)
    expect(scrollProgress(817, 100, 1534)).toBeCloseTo(0.5)
    expect(scrollProgress(-50, 100, 1534)).toBe(0)
    expect(scrollProgress(9999, 100, 1534)).toBe(1)
  })

  it('survives an empty range', () => {
    expect(scrollProgress(10, 10, 10)).toBe(1)
  })
})

describe('smoothTowards', () => {
  it('moves 7% of the distance in one 60fps frame, like the reference', () => {
    expect(smoothTowards(0, 1000, 1000 / 60)).toBeCloseTo(70)
  })

  it('is frame-rate independent', () => {
    let at120 = 0
    for (let i = 0; i < 2; i++) at120 = smoothTowards(at120, 1000, 1000 / 120)
    expect(at120).toBeCloseTo(smoothTowards(0, 1000, 1000 / 60))
  })

  it('never overshoots and settles exactly', () => {
    let value = 0
    for (let i = 0; i < 400; i++) {
      value = smoothTowards(value, -2340, 1000 / 60)
      expect(value).toBeGreaterThanOrEqual(-2340)
    }
    expect(value).toBe(-2340)
  })
})

describe('parallaxPercent', () => {
  const max = (GALLERY_OVERSCAN / (1 + 2 * GALLERY_OVERSCAN)) * 100

  it('is zero at the viewport centre and bounded by the overscan', () => {
    expect(parallaxPercent(720, 1440)).toBeCloseTo(0)
    expect(parallaxPercent(1440, 1440)).toBeCloseTo(-max)
    expect(parallaxPercent(-5000, 1440)).toBeCloseTo(max)
  })
})
