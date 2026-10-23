import { useEffect, useRef } from 'react'
import { smoothTowards } from '../spaces/galleryMotion'
import { COLUMN_FACTOR, STORIES_EASE, depthOffset } from './storiesMotion'

/** Depth motion only where it is comfortable: fine pointer, tablet width up, motion allowed. */
const DEPTH_QUERY = '(min-width: 48rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
/** The custom "Ver história" cursor needs a real hover-capable pointer. */
const CURSOR_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
/** Reference reveal: cards entering together appear 120ms apart, top to bottom. */
const REVEAL_STAGGER = 120
/** ~120ms cursor lag (DS "Cursor / Ver álbum"): lerp per 60fps frame. */
const CURSOR_EASE = 0.28

/**
 * Section 04 gallery behaviour, all outside React state (no re-render while scrolling):
 *
 * - Reveal (all devices): as in the reference, a card's photo fades in (1s) and
 *   its caption appears character by character when it enters the viewport, and
 *   resets when it leaves so the entrance replays. Cards entering together are
 *   staggered top to bottom.
 * - Depth (fine pointer, ≥768px, motion allowed): the page scrolls natively; each
 *   card is translated by its column's speed factor around the viewport centre,
 *   eased like the reference's scrubbed playhead. Layout is measured on resize
 *   only; the loop runs while the gallery is near the viewport and sleeps once settled.
 * - Cursor (hover-capable fine pointer): a 104px "Ver história" disc follows the
 *   pointer with a short lag while it is over a photo.
 */
export function useStoriesGallery() {
  const galleryRef = useRef<HTMLOListElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // ---------- reveal ----------
  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return
    const cards = Array.from(gallery.querySelectorAll<HTMLElement>('[data-card]'))

    const observer = new IntersectionObserver((entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        .forEach((entry, index) => {
          const card = entry.target as HTMLElement
          card.style.setProperty('--reveal-delay', `${index * REVEAL_STAGGER}ms`)
          card.dataset.revealed = ''
        })
      for (const entry of entries) {
        if (!entry.isIntersecting) delete (entry.target as HTMLElement).dataset.revealed
      }
    })
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // ---------- depth ----------
  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return
    const query = window.matchMedia(DEPTH_QUERY)
    const cards = Array.from(gallery.querySelectorAll<HTMLElement>('[data-card]'))
    let stop: (() => void) | undefined

    const start = () => {
      let frame = 0
      let lastTime = 0
      let smoothed = window.scrollY
      let target = smoothed
      let viewportHeight = window.innerHeight
      let centers: number[] = []
      const factors = cards.map((card) => COLUMN_FACTOR[card.dataset.column === 'right' ? 'right' : 'left'])

      const render = () => {
        for (let i = 0; i < cards.length; i++) {
          const offset = depthOffset(centers[i]! - smoothed, viewportHeight, factors[i]!)
          cards[i]!.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
        }
      }

      const tick = (time: number) => {
        const elapsed = lastTime ? Math.min(64, time - lastTime) : 16.67
        lastTime = time
        smoothed = smoothTowards(smoothed, target, elapsed, STORIES_EASE)
        render()
        if (smoothed !== target) {
          frame = requestAnimationFrame(tick)
        } else {
          frame = 0
          lastTime = 0
        }
      }
      const wake = () => {
        if (!frame) frame = requestAnimationFrame(tick)
      }
      const onScroll = () => {
        target = window.scrollY
        wake()
      }

      // Untransformed document centres (offsetTop ignores transforms).
      const measure = () => {
        viewportHeight = window.innerHeight
        const top = gallery.getBoundingClientRect().top + window.scrollY
        centers = cards.map((card) => top + card.offsetTop + card.offsetHeight / 2)
        target = window.scrollY
      }

      let listening = false
      const listen = (on: boolean) => {
        if (on === listening) return
        listening = on
        if (on) {
          window.addEventListener('scroll', onScroll, { passive: true })
          onScroll()
        } else {
          window.removeEventListener('scroll', onScroll)
        }
      }

      measure()
      smoothed = target
      render()

      const near = new IntersectionObserver(([entry]) => listen(Boolean(entry?.isIntersecting)), {
        rootMargin: '50% 0px',
      })
      near.observe(gallery)
      const resizeObserver = new ResizeObserver(() => {
        measure()
        wake()
      })
      resizeObserver.observe(document.body)

      return () => {
        near.disconnect()
        resizeObserver.disconnect()
        listen(false)
        if (frame) cancelAnimationFrame(frame)
        for (const card of cards) card.style.removeProperty('transform')
      }
    }

    const apply = () => {
      stop?.()
      stop = query.matches ? start() : undefined
    }
    apply()
    query.addEventListener('change', apply)
    return () => {
      query.removeEventListener('change', apply)
      stop?.()
    }
  }, [])

  // ---------- custom cursor ----------
  useEffect(() => {
    const gallery = galleryRef.current
    const cursor = cursorRef.current
    if (!gallery || !cursor) return
    const query = window.matchMedia(CURSOR_QUERY)
    let stop: (() => void) | undefined

    const start = () => {
      let frame = 0
      let x = 0
      let y = 0
      let targetX = 0
      let targetY = 0
      let active = false
      let lastTime = 0

      const tick = (time: number) => {
        const elapsed = lastTime ? Math.min(64, time - lastTime) : 16.67
        lastTime = time
        x = smoothTowards(x, targetX, elapsed, CURSOR_EASE)
        y = smoothTowards(y, targetY, elapsed, CURSOR_EASE)
        cursor.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        if (x !== targetX || y !== targetY) {
          frame = requestAnimationFrame(tick)
        } else {
          frame = 0
          lastTime = 0
        }
      }

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        targetX = event.clientX
        targetY = event.clientY
        const overPhoto = (event.target as Element).closest('[data-photo]') !== null
        if (overPhoto !== active) {
          active = overPhoto
          if (active) {
            // Appear where the pointer is, then follow with the lag.
            x = targetX
            y = targetY
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
          }
          cursor.dataset.active = active ? 'true' : 'false'
        }
        if (active && !frame) frame = requestAnimationFrame(tick)
      }
      const onLeave = () => {
        active = false
        cursor.dataset.active = 'false'
      }

      gallery.addEventListener('pointermove', onMove, { passive: true })
      gallery.addEventListener('pointerleave', onLeave)
      return () => {
        gallery.removeEventListener('pointermove', onMove)
        gallery.removeEventListener('pointerleave', onLeave)
        if (frame) cancelAnimationFrame(frame)
        onLeave()
      }
    }

    const apply = () => {
      stop?.()
      stop = query.matches ? start() : undefined
    }
    apply()
    query.addEventListener('change', apply)
    return () => {
      query.removeEventListener('change', apply)
      stop?.()
    }
  }, [])

  return { galleryRef, cursorRef }
}
