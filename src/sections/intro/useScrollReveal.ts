import { useEffect, useRef, useState } from 'react'
import { easeDrift } from '../../lib/easing'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * Scroll-linked progress for the Section 02 image reveal.
 *
 * Writes `--reveal-progress` (0 → 1) on the element; CSS turns it into the
 * clip-path window and the inner counter-scale, so React never re-renders while
 * scrolling. Progress starts when the element's top edge enters the viewport and
 * ends when its centre reaches `--reveal-end` × viewport height (read from CSS,
 * so each breakpoint owns its range). It is a pure function of scroll position,
 * so scrolling back reverses the reveal. No pinning, no scroll-jacking.
 *
 * The scroll listener is attached only while the element is near the viewport,
 * reads layout once per animation frame and then writes a single custom property.
 * Reduced motion: progress is fixed at 1 (settled image) and nothing is listened to.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let endRatio = 0.5
    let listening = false

    const readConfig = () => {
      const value = parseFloat(getComputedStyle(el).getPropertyValue('--reveal-end'))
      endRatio = Number.isFinite(value) ? value : 0.5
    }

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight
      const startTop = viewport
      const endTop = viewport * endRatio - rect.height / 2
      const progress = clamp01((startTop - rect.top) / Math.max(1, startTop - endTop))
      el.style.setProperty('--reveal-progress', easeDrift(progress).toFixed(4))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const onResize = () => {
      readConfig()
      schedule()
    }

    const startListening = () => {
      if (listening) return
      listening = true
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', onResize, { passive: true })
    }

    const stopListening = () => {
      if (!listening) return
      listening = false
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onResize)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) startListening()
        else stopListening()
        // Settle exactly at 0 or 1 after a fast scroll past the range.
        schedule()
      },
      { rootMargin: '25% 0px' },
    )

    const apply = () => {
      observer.disconnect()
      stopListening()
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      if (reducedMotion.matches) {
        el.style.setProperty('--reveal-progress', '1')
        return
      }
      readConfig()
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
 * True once the element has entered the viewport (one-shot entrance trigger).
 * `rootMargin` shifts the trigger line, e.g. '0px 0px -20% 0px' fires when the
 * element's top reaches 80% of the viewport height.
 */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.2, rootMargin = '0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, threshold, rootMargin])

  return { ref, inView }
}
