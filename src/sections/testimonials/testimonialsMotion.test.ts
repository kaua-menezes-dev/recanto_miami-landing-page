import { describe, expect, it } from 'vitest'
import { COLUMNS, TESTIMONIALS } from './testimonialData'
import { driftFactor, revealOrder, sectionProgress } from './testimonialsMotion'

describe('sectionProgress', () => {
  it('starts when the section top reaches the bottom of the viewport', () => {
    expect(sectionProgress(900, 1400, 900)).toBe(0)
    expect(sectionProgress(1200, 1400, 900)).toBe(0)
  })

  it('ends when the section bottom leaves the top of the viewport', () => {
    expect(sectionProgress(-1400, 1400, 900)).toBe(1)
    expect(sectionProgress(-3000, 1400, 900)).toBe(1)
  })

  it('is halfway when the section is centred in the viewport', () => {
    expect(sectionProgress(-250, 1400, 900)).toBeCloseTo(0.5)
  })

  it('ends at the last reachable scroll position when the page ends first', () => {
    // Section is the last block: its bottom can only reach the viewport bottom.
    expect(sectionProgress(-500, 1400, 900, 0)).toBe(1)
    expect(sectionProgress(200, 1400, 900, 700)).toBeCloseTo(0.5)
  })
})

describe('driftFactor', () => {
  it('maps progress to −1 … 1 with rest at the centre', () => {
    expect(driftFactor(0)).toBe(-1)
    expect(driftFactor(0.5)).toBe(0)
    expect(driftFactor(1)).toBe(1)
    expect(driftFactor(2)).toBe(1)
  })
})

describe('revealOrder', () => {
  it('reads row by row across offset columns, then left to right', () => {
    const order = revealOrder([
      { id: 'c', top: 132, left: 724 },
      { id: 'e', top: 420, left: 362 },
      { id: 'b', top: 100, left: 362 },
      { id: 'a', top: 164, left: 0 },
      { id: 'd', top: 500, left: 0 },
    ]).map((item) => item.id)
    expect(order).toEqual(['a', 'b', 'c', 'd', 'e'])
  })
})

describe('column layouts', () => {
  const ids = TESTIMONIALS.map((t) => t.id).sort()

  it('places every testimonial exactly once at every breakpoint', () => {
    for (const columns of Object.values(COLUMNS)) {
      expect(columns.flat().sort()).toEqual(ids)
    }
  })

  it('has a single featured card', () => {
    expect(TESTIMONIALS.filter((t) => t.featured)).toHaveLength(1)
  })
})
