import { useEffect, useRef } from 'react'
import { easeDrift } from '../../lib/easing'
import { expansionProgress } from './finalMotion'

const LINKED = '(min-width: 48rem) and (prefers-reduced-motion: no-preference)'

/**
 * Scroll-linked expansion of the Section 08 photo (tablet and desktop).
 *
 * Writes `--final-progress` (0 → 1, Drift curve) on the stage; CSS turns it
 * into a clip-path window that opens from the framed composition to
 * full-bleed. Only the clip changes — the stage's layout box never does — and
 * React never re-renders while scrolling. The listener is attached only while
 * the stage is near the viewport and reads layout once per animation frame.
 *
 * Phones and reduced motion: progress is pinned at 1 and nothing is listened
 * to (phones open the frame in a single CSS step; reduced motion has no frame).
 */
export function useFinalExpansion<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const linked = window.matchMedia(LINKED)
    let frame = 0
    let listening = false

    const update = () => {
      frame = 0
      const progress = expansionProgress(el.getBoundingClientRect().top, window.innerHeight)
      el.style.setProperty('--final-progress', easeDrift(progress).toFixed(4))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const startListening = () => {
      if (listening) return
      listening = true
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule, { passive: true })
    }

    const stopListening = () => {
      if (!listening) return
      listening = false
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) startListening()
        else stopListening()
        // Settle exactly at 0 or 1 after a fast scroll past the range.
        schedule()
      },
      { rootMargin: '10% 0px' },
    )

    const apply = () => {
      observer.disconnect()
      stopListening()
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      if (!linked.matches) {
        el.style.setProperty('--final-progress', '1')
        return
      }
      update()
      observer.observe(el)
    }

    apply()
    linked.addEventListener('change', apply)

    return () => {
      linked.removeEventListener('change', apply)
      observer.disconnect()
      stopListening()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
