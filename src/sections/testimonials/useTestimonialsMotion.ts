import { useEffect, useRef, useSyncExternalStore } from 'react'
import type { ColumnCount } from './testimonialData'
import { REVEAL_STAGGER_MS, revealOrder } from './testimonialsMotion'

const DESKTOP = '(min-width: 80rem)'
const TABLET = '(min-width: 48rem)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

const subscribeTo = (queries: string[]) => (onChange: () => void) => {
  const lists = queries.map((query) => window.matchMedia(query))
  lists.forEach((list) => list.addEventListener('change', onChange))
  return () => lists.forEach((list) => list.removeEventListener('change', onChange))
}

const subscribeColumns = subscribeTo([DESKTOP, TABLET])
const getColumnCount = (): ColumnCount =>
  window.matchMedia(DESKTOP).matches ? 3 : window.matchMedia(TABLET).matches ? 2 : 1

/** Masonry column count: 3 from 1280px (desktop frame), 2 from 768px, 1 on phones. */
export function useColumnCount() {
  return useSyncExternalStore(subscribeColumns, getColumnCount, () => 3 as ColumnCount)
}

const subscribeReducedMotion = subscribeTo([REDUCED_MOTION])
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
}

/**
 * Runs the column loop only while the section is near the viewport: toggles
 * `data-onscreen`, which CSS uses for `animation-play-state`. The loop itself is
 * a CSS animation on `transform`, so nothing runs on the main thread per frame.
 */
export function useLoopVisibility<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) el.dataset.onscreen = ''
        else delete el.dataset.onscreen
      },
      { rootMargin: '10% 0px' },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      delete el.dataset.onscreen
    }
  }, [enabled])

  return ref
}

/**
 * One-shot staggered entrance for the cards (`[data-reveal]` descendants).
 *
 * A single IntersectionObserver marks each card `data-revealed` the first time
 * it enters; cards entering together are staggered in reading order. Only the
 * first copy of a looping column is observed and its duplicates reveal with it,
 * so cards never fade in again as the loop brings them back. Revealed ids are
 * remembered, so a layout change never replays the entrance. Attribute writes
 * only — no React state.
 */
export function useCardReveal<T extends HTMLElement>(layoutKey: string) {
  const ref = useRef<T>(null)
  const revealed = useRef(new Set<string>())

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const show = (id: string, delay: number) => {
      revealed.current.add(id)
      for (const card of cards) {
        if (card.dataset.reveal !== id) continue
        card.style.setProperty('--reveal-delay', `${delay}ms`)
        card.dataset.revealed = ''
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            card: entry.target as HTMLElement,
            top: entry.boundingClientRect.top,
            left: entry.boundingClientRect.left,
          }))
        revealOrder(entering).forEach(({ card }, index) => {
          show(card.dataset.reveal ?? '', index * REVEAL_STAGGER_MS)
          observer.unobserve(card)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    for (const card of cards) {
      const id = card.dataset.reveal ?? ''
      if (revealed.current.has(id)) show(id, 0)
      else if (card.dataset.copy === '0') observer.observe(card)
    }

    return () => observer.disconnect()
  }, [layoutKey])

  return ref
}
