import { describe, expect, it } from 'vitest'
import { COLUMNS, TESTIMONIALS } from './testimonialData'
import { revealOrder } from './testimonialsMotion'

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
