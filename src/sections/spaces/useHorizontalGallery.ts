import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import { clamp, parallaxPercent, scrollProgress, smoothTowards } from './galleryMotion'

export type GalleryMode = 'linked' | 'native'

/** Scroll-linked motion only where it is comfortable: fine pointer, tablet width up, motion allowed. */
const LINKED_QUERY = '(min-width: 48rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

function subscribeMode(onChange: () => void) {
  const query = window.matchMedia(LINKED_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getMode = (): GalleryMode => (window.matchMedia(LINKED_QUERY).matches ? 'linked' : 'native')
const getServerMode = (): GalleryMode => 'native'

/**
 * Section 03 panoramic gallery.
 *
 * `linked` (desktop/tablet with a mouse or trackpad): the page keeps its natural
 * vertical scroll and the track is translated horizontally from scroll progress.
 * Progress runs 0 → 1 from the gallery's top edge entering the viewport to its
 * bottom edge leaving it (approved Figma spec), clamped to the page's last scroll
 * position so the final photo always arrives. As in the reference, the translation
 * follows its target through a frame-rate independent lerp and every photo drifts
 * inside its frame (±8% overscan) by its distance from the viewport centre.
 * No pinning, no wheel interception, no scroll-jacking.
 *
 * Layout is measured only on mount and resize; scroll and animation frames read
 * `scrollY` and cached offsets and write transforms directly, so React never
 * re-renders while scrolling. The loop sleeps once the track has settled.
 *
 * `native` (touch devices, phones, reduced motion): no transforms. The gallery is a
 * native horizontal scroller; the rail, counter and prev/next buttons follow it.
 */
export function useHorizontalGallery() {
  const mode = useSyncExternalStore(subscribeMode, getMode, getServerMode)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const items = Array.from(track.children) as HTMLElement[]
    const images = items.map((item) => item.querySelector('img'))
    const total = items.length
    let lastIndex = -1

    const setProgress = (progress: number) => {
      railRef.current?.style.setProperty('--progress', progress.toFixed(4))
      const index = Math.min(total, Math.round(progress * (total - 1)) + 1)
      if (index !== lastIndex && counterRef.current) {
        lastIndex = index
        counterRef.current.textContent = String(index).padStart(2, '0')
      }
    }

    if (mode === 'native') {
      let frame = 0
      let maxScroll = 0

      const update = () => {
        frame = 0
        const left = viewport.scrollLeft
        setProgress(maxScroll > 0 ? clamp(left / maxScroll, 0, 1) : 0)
        if (prevRef.current) prevRef.current.disabled = left <= 1
        if (nextRef.current) nextRef.current.disabled = left >= maxScroll - 1
      }
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update)
      }
      const measure = () => {
        maxScroll = viewport.scrollWidth - viewport.clientWidth
        schedule()
      }

      const resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(viewport)
      resizeObserver.observe(track)
      viewport.addEventListener('scroll', schedule, { passive: true })
      maxScroll = viewport.scrollWidth - viewport.clientWidth
      update()

      return () => {
        resizeObserver.disconnect()
        viewport.removeEventListener('scroll', schedule)
        if (frame) cancelAnimationFrame(frame)
      }
    }

    // ---------- linked ----------
    let frame = 0
    let lastTime = 0
    let current = 0
    let target = 0
    let travel = 0
    let start = 0
    let end = 1
    let viewportWidth = 0
    let centers: number[] = []

    const readTarget = () => {
      target = scrollProgress(window.scrollY, start, end) * travel
    }

    const render = () => {
      track.style.transform = `translate3d(${(-current).toFixed(2)}px, 0, 0)`
      for (let i = 0; i < total; i++) {
        const image = images[i]
        if (!image) continue
        const shift = parallaxPercent(centers[i]! - current, viewportWidth)
        image.style.transform = `translate3d(${shift.toFixed(3)}%, 0, 0)`
      }
      setProgress(travel > 0 ? current / travel : 0)
    }

    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(64, time - lastTime) : 16.67
      lastTime = time
      current = smoothTowards(current, target, elapsed)
      render()
      if (current !== target) {
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
      readTarget()
      wake()
    }

    const measure = () => {
      const rect = viewport.getBoundingClientRect()
      const top = rect.top + window.scrollY
      const viewportHeight = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - viewportHeight
      viewportWidth = viewport.clientWidth
      travel = Math.max(0, track.offsetWidth - viewportWidth)
      start = top - viewportHeight
      end = Math.min(top + rect.height, maxScroll)
      centers = items.map((item) => item.offsetLeft + item.offsetWidth / 2)
      readTarget()
    }

    measure()
    current = target
    render()

    // Body size changes (fonts, sections above) move the gallery: re-measure.
    const resizeObserver = new ResizeObserver(() => {
      measure()
      wake()
    })
    resizeObserver.observe(document.body)
    resizeObserver.observe(track)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      track.style.removeProperty('transform')
      for (const image of images) image?.style.removeProperty('transform')
    }
  }, [mode])

  /** Native mode: move one photo left (-1) or right (1). */
  const step = useCallback((direction: -1 | 1) => {
    const viewport = viewportRef.current
    const first = trackRef.current?.children[0] as HTMLElement | undefined
    if (!viewport || !first) return
    const gap = parseFloat(getComputedStyle(trackRef.current!).columnGap) || 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    viewport.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: reduced ? 'auto' : 'smooth' })
  }, [])

  return { mode, viewportRef, trackRef, railRef, counterRef, prevRef, nextRef, step }
}
