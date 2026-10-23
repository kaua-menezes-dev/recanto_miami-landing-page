import { wrapIndex } from './storiesMotion'
import { WEDDINGS } from './weddings'

/** Which wedding and which of its photos the album shows. */
export type AlbumView = {
  wedding: number
  photo: number
}

export type AlbumAction =
  | { type: 'step'; delta: 1 | -1 }
  | { type: 'goto'; photo: number }
  | { type: 'story'; delta: 1 | -1 }

/**
 * Album navigation as a pure function of the previous view, so rapid clicks
 * (several actions before React re-renders) always build on the latest photo.
 * Changing story opens the other wedding on its first photo.
 */
export function albumReducer(view: AlbumView, action: AlbumAction): AlbumView {
  switch (action.type) {
    case 'step': {
      const total = WEDDINGS[view.wedding]!.photos.length
      return { ...view, photo: wrapIndex(view.photo + action.delta, total) }
    }
    case 'goto': {
      const total = WEDDINGS[view.wedding]!.photos.length
      return { ...view, photo: wrapIndex(action.photo, total) }
    }
    case 'story':
      return { wedding: wrapIndex(view.wedding + action.delta, WEDDINGS.length), photo: 0 }
  }
}
