import { describe, expect, it } from 'vitest'
import { cubicBezier, easeDrift } from './easing'

describe('cubicBezier', () => {
  it('clamps to the 0–1 range', () => {
    expect(easeDrift(-0.5)).toBe(0)
    expect(easeDrift(0)).toBe(0)
    expect(easeDrift(1)).toBe(1)
    expect(easeDrift(1.5)).toBe(1)
  })

  it('is linear for a linear curve', () => {
    const linear = cubicBezier(0, 0, 1, 1)
    for (const x of [0.1, 0.25, 0.5, 0.9]) expect(linear(x)).toBeCloseTo(x, 4)
  })

  it('is symmetric and monotonic for the Drift curve', () => {
    expect(easeDrift(0.5)).toBeCloseTo(0.5, 4)
    expect(easeDrift(0.25) + easeDrift(0.75)).toBeCloseTo(1, 4)
    let previous = 0
    for (let x = 0.05; x <= 1; x += 0.05) {
      const y = easeDrift(x)
      expect(y).toBeGreaterThanOrEqual(previous)
      previous = y
    }
  })
})
