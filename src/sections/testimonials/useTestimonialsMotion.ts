import { useEffect, useRef, useSyncExternalStore } from 'react'
import type { ColumnCount } from './testimonialData'
import { REVEAL_STAGGER_MS, driftFactor, revealOrder, sectionProgress } from './testimonialsMotion'

const DESKTOP = '(min-width: 80rem)'
const TABLET = '(min-width: 48rem)'

const subscribe = (onChange: () => void) => {
  const queries = [DESKTOP, TABLET].map((query) => window.matchMedia(query))
  queries.forEach((query) => query.addEventListener('change', onChange))
  return () => queries.forEach((query) => query.removeEventListener('change', onChange))
}

const getColumnCount = (): ColumnCount =>
  window.matchMedia(DESKTOP).matches ? 3 : window.matchMedia(TABLET).matches ? 2 : 1

/** Masonry column count: 3 from 1280px (desktop frame), 2 from 768px, 1 on phones. */
export function useColumnCount() {
  return useSyncExternalStore(subscribe, getColumnCount, () => 3 as ColumnCount)
}

/**
 * Scroll-linked column drift (Figma "Storyboard / Drift / S1–S3").
 *
 * Writes `--drift` (−1 → 1) on the element; each column turns it into its own
 * translateY via `--drift-amp` in CSS, so React never re-renders while scrolling
 * and only `transform` changes. The scroll listener is attached only while the
 * section is near the viewport and reads layout once per animation frame.
 * Reduced motion: `--drift` stays at 0 (rest offsets) and nothing is listened to.
 */
export function useColumnDrift<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let listening = false

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight
      const remaining = document.documentElement.scrollHeight - viewport - window.scrollY
      const drift = driftFactor(sectionProgress(rect.top, rect.height, viewport, remaining))
      el.style.setProperty('--drift', drift.toFixed(4))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const startListening = () => {
      if (listening) return
      listening = true
      el.dataset.drifting = ''
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule, { passive: true })
    }

    const stopListening = () => {
      if (!listening) return
      listening = false
      delete el.dataset.drifting
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) startListening()
        else stopListening()
        // Settle exactly at −1 or 1 after a fast scroll past the section.
        schedule()
      },
      { rootMargin: '10% 0px' },
    )

    const apply = () => {
      observer.disconnect()
      stopListening()
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      if (reducedMotion.matches) {
        el.style.setProperty('--drift', '0')
        return
      }
      update()
      observer.observe(el)
    }

    apply()
    reducedMotion.addEventListener('change', apply)

    return () => {
      reducedMotion.removeEventListener('change', apply)
      observer.disconnect()
      stopListening()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}

/**
 * One-shot staggered entrance for the cards (`[data-reveal]` descendants).
 *
 * A single IntersectionObserver marks each card `data-revealed` the first time
 * it enters; cards entering together are staggered in reading order. Revealed
 * ids are remembered, so a layout change (columns re-render on resize) never
 * replays the entrance. Attribute writes only — no React state.
 */
export function useCardReveal<T extends HTMLElement>(layoutKey: ColumnCount) {
  const ref = useRef<T>(null)
  const revealed = useRef(new Set<string>())

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const show = (card: HTMLElement, delay: number) => {
      card.style.setProperty('--reveal-delay', `${delay}ms`)
      card.dataset.revealed = ''
      revealed.current.add(card.dataset.reveal ?? '')
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
          show(card, index * REVEAL_STAGGER_MS)
          observer.unobserve(card)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    for (const card of cards) {
      if (revealed.current.has(card.dataset.reveal ?? '')) show(card, 0)
      else observer.observe(card)
    }

    return () => observer.disconnect()
  }, [layoutKey])

  return ref
}
