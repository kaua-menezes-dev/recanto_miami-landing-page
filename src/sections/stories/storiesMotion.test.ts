import { describe, expect, it } from 'vitest'
import { COLUMN_FACTOR, columnOf, depthOffset, pad2, swipeDirection, wrapIndex } from './storiesMotion'
import { GALLERY, GALLERY_BOUNDS, WEDDINGS } from './weddings'

describe('depthOffset', () => {
  it('is zero at the viewport centre', () => {
    expect(depthOffset(450, 900, 0.12)).toBe(0)
  })

  it('pushes faster cards further away from the centre', () => {
    expect(depthOffset(850, 900, 0.12)).toBeCloseTo(48)
    expect(depthOffset(50, 900, 0.12)).toBeCloseTo(-48)
  })

  it('caps the offset one viewport away from the centre', () => {
    expect(depthOffset(5000, 900, 0.12)).toBeCloseTo(108)
    expect(depthOffset(-5000, 900, -0.025)).toBeCloseTo(22.5)
  })
})

describe('gallery composition', () => {
  const FRAME = 400
  const CAPTION = 37

  it('never lets cards of one column collide once depth is applied', () => {
    for (const column of ['left', 'right'] as const) {
      const cards = GALLERY.filter((card) => columnOf(card.desktop.x) === column).sort(
        (a, b) => a.desktop.y - b.desktop.y,
      )
      for (let i = 1; i < cards.length; i++) {
        const above = cards[i - 1]!.desktop
        const below = cards[i]!.desktop
        const gap = below.y - above.y - FRAME - CAPTION
        // Same factor for the column: the gap scales by (1 + factor) of the distance.
        const scaledGap = gap + COLUMN_FACTOR[column] * (below.y - above.y)
        expect(scaledGap).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it('keeps the two columns apart horizontally', () => {
    const left = GALLERY.filter((card) => columnOf(card.desktop.x) === 'left')
    const right = GALLERY.filter((card) => columnOf(card.desktop.x) === 'right')
    const leftEdge = Math.max(...left.map((card) => card.desktop.x + card.desktop.w))
    const rightEdge = Math.min(...right.map((card) => card.desktop.x))
    expect(leftEdge).toBeLessThan(rightEdge)
  })

  it('keeps every visible card, with its maximum drift, above the gallery’s clipped bottom edge', () => {
    // Drift is capped one viewport away; check a tall 1440px-high window.
    const maxDrift = COLUMN_FACTOR.right * 1440
    for (const card of GALLERY.filter((item) => !item.seam)) {
      const drift = columnOf(card.desktop.x) === 'right' ? maxDrift : 0
      expect(card.desktop.y + GALLERY_BOUNDS.card + drift).toBeLessThanOrEqual(GALLERY_BOUNDS.desktop.height)
    }
    // Phones have no drift; the last real card must end above the fade.
    const phone = GALLERY_BOUNDS.phone
    for (const card of GALLERY.filter((item) => !item.seam && item.mobile)) {
      expect(card.mobile!.slot * phone.step + GALLERY_BOUNDS.card).toBeLessThanOrEqual(phone.height - phone.fade)
    }
  })

  it('starts the loop-seam clones inside the fade, so they dissolve before the gallery ends', () => {
    for (const card of GALLERY.filter((item) => item.seam)) {
      expect(card.desktop.y).toBeGreaterThanOrEqual(GALLERY_BOUNDS.desktop.height - GALLERY_BOUNDS.desktop.fade)
      if (card.mobile) {
        const phone = GALLERY_BOUNDS.phone
        expect(card.mobile.slot * phone.step).toBeGreaterThanOrEqual(phone.height - phone.fade)
      }
    }
  })

  it('points every card at an existing photo of its wedding', () => {
    for (const card of GALLERY) {
      const wedding = WEDDINGS[card.wedding]
      expect(wedding).toBeDefined()
      expect(wedding!.photos[card.photo]).toBeDefined()
    }
  })

  it('shows all five weddings outside the loop seam, on desktop and on phones', () => {
    const real = GALLERY.filter((card) => !card.seam)
    expect(new Set(real.map((card) => card.wedding)).size).toBe(WEDDINGS.length)
    expect(new Set(real.filter((card) => card.mobile).map((card) => card.wedding)).size).toBe(WEDDINGS.length)
  })
})

describe('wrapIndex', () => {
  it('wraps both ways', () => {
    expect(wrapIndex(8, 8)).toBe(0)
    expect(wrapIndex(-1, 8)).toBe(7)
    expect(wrapIndex(3, 8)).toBe(3)
  })
})

describe('swipeDirection', () => {
  it('reads left swipes as next and right swipes as previous', () => {
    expect(swipeDirection(-80, 10)).toBe(1)
    expect(swipeDirection(80, -10)).toBe(-1)
  })

  it('ignores taps and vertical pans', () => {
    expect(swipeDirection(-20, 0)).toBe(0)
    expect(swipeDirection(-60, 90)).toBe(0)
  })
})

it('pads indexes to two digits', () => {
  expect(pad2(3)).toBe('03')
})
