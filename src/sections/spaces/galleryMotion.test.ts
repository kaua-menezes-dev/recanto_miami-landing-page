import { describe, expect, it } from 'vitest'
import { GALLERY_OVERSCAN, limitLag, parallaxPercent, scrollProgress, smoothTowards } from './galleryMotion'

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

describe('limitLag', () => {
  // Pin from scroll 1000 to 3500 (travel 2320 + hold 180).
  it('leaves the lerp alone while there is pinned scroll to spare', () => {
    expect(limitLag(500, 900, 1900, 1000, 3500)).toBe(500)
  })

  it('forces the end state by the time the pin releases going down', () => {
    expect(limitLag(2000, 2320, 3400, 1000, 3500)).toBe(2220)
    expect(limitLag(2000, 2320, 3500, 1000, 3500)).toBe(2320)
    expect(limitLag(2000, 2320, 3900, 1000, 3500)).toBe(2320)
  })

  it('forces the start state by the time the pin releases going up', () => {
    expect(limitLag(400, 0, 1100, 1000, 3500)).toBe(100)
    expect(limitLag(400, 0, 1000, 1000, 3500)).toBe(0)
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
