import { describe, expect, it } from 'vitest'
import { albumReducer } from './albumState'
import type { AlbumView } from './albumState'
import { WEDDINGS, photoSources } from './weddings'

const srcOf = (view: AlbumView) => photoSources(WEDDINGS[view.wedding]!.id, view.photo).src

describe('albumReducer — photos', () => {
  it('reaches every photo of every wedding going forward, then wraps', () => {
    for (let wedding = 0; wedding < WEDDINGS.length; wedding++) {
      let view: AlbumView = { wedding, photo: 0 }
      const seen = new Set([srcOf(view)])
      for (let i = 1; i < WEDDINGS[wedding]!.photos.length; i++) {
        const next = albumReducer(view, { type: 'step', delta: 1 })
        // The displayed source must change on every step, not just the counter.
        expect(srcOf(next)).not.toBe(srcOf(view))
        view = next
        seen.add(srcOf(view))
      }
      expect(seen.size).toBe(8)
      expect(albumReducer(view, { type: 'step', delta: 1 }).photo).toBe(0)
    }
  })

  it('reaches every photo going backward from the first', () => {
    let view: AlbumView = { wedding: 2, photo: 0 }
    const order: number[] = []
    for (let i = 0; i < 8; i++) {
      view = albumReducer(view, { type: 'step', delta: -1 })
      order.push(view.photo)
    }
    expect(order).toEqual([7, 6, 5, 4, 3, 2, 1, 0])
  })

  it('applies rapid consecutive steps cumulatively', () => {
    const actions = Array.from({ length: 5 }, () => ({ type: 'step', delta: 1 }) as const)
    const view = actions.reduce(albumReducer, { wedding: 0, photo: 6 })
    expect(view.photo).toBe(3)
  })

  it('jumps to a thumbnail', () => {
    expect(albumReducer({ wedding: 1, photo: 2 }, { type: 'goto', photo: 7 })).toEqual({ wedding: 1, photo: 7 })
  })

  it('serves 40 distinct photos in total', () => {
    const all = new Set<string>()
    WEDDINGS.forEach((wedding, w) => wedding.photos.forEach((_, p) => all.add(srcOf({ wedding: w, photo: p }))))
    expect(all.size).toBe(40)
  })
})

describe('albumReducer — couples', () => {
  it('changes the wedding and its photos together, opening on the first photo', () => {
    const next = albumReducer({ wedding: 0, photo: 5 }, { type: 'story', delta: 1 })
    expect(next).toEqual({ wedding: 1, photo: 0 })
    expect(srcOf(next)).toContain('casal-gl-1')
  })

  it('wraps between the first and the last couple both ways', () => {
    expect(albumReducer({ wedding: 4, photo: 3 }, { type: 'story', delta: 1 })).toEqual({ wedding: 0, photo: 0 })
    expect(albumReducer({ wedding: 0, photo: 3 }, { type: 'story', delta: -1 })).toEqual({ wedding: 4, photo: 0 })
  })

  it('keeps photo navigation inside the newly selected album', () => {
    let view = albumReducer({ wedding: 3, photo: 2 }, { type: 'story', delta: 1 })
    view = albumReducer(view, { type: 'step', delta: 1 })
    expect(srcOf(view)).toContain('casal-tg-2')
  })
})
