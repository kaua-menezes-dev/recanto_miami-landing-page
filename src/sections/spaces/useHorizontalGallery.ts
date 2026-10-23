import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import { clamp, limitLag, parallaxPercent, scrollProgress, smoothTowards } from './galleryMotion'

export type GalleryMode = 'linked' | 'native'

/**
 * Pinned, scroll-linked motion only where it is comfortable: fine pointer, tablet
 * width up, enough height to hold the stage, motion allowed.
 */
const LINKED_QUERY =
  '(min-width: 48rem) and (min-height: 32rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

/** Pinned scroll after the last photo has arrived (× viewport height), so the final composition is seen at rest. */
const END_HOLD = 0.2

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
 * `linked` (desktop/tablet with a mouse or trackpad): pinned horizontal journey.
 * The stage (gallery + rail) is `position: sticky`, centred in the viewport, and a
 * spacer after it adds exactly the pinned scroll distance: the measured travel
 * (track width − visible width, 1px of scroll per px of travel) plus a short hold
 * at the end. The page scrolls natively the whole time — no wheel handling, no
 * scroll writes; the pin is plain CSS, so it starts and releases without a jump.
 * Progress is 0 until the stage reaches its centred position (the first photo
 * stays on the content margin while Section 02 and the intro are read) and 1 when
 * the travel is consumed. As in the reference, the translation follows its target
 * through a frame-rate independent lerp and every photo drifts inside its frame
 * (±8% overscan) by its distance from the viewport centre; `limitLag` keeps the
 * lerp from trailing past either end of the pin, so the last photo is in place
 * before the pin releases and the first one is back home when scrolling up.
 *
 * Layout is measured only on mount and resize (body, track and stage observed);
 * scroll and animation frames read `scrollY` and cached numbers and write
 * transforms directly, so React never re-renders while scrolling. The loop sleeps
 * once the track has settled.
 *
 * `native` (touch devices, phones, reduced motion): no transforms. The gallery is a
 * native horizontal scroller; the rail, counter and prev/next buttons follow it.
 */
export function useHorizontalGallery() {
  const mode = useSyncExternalStore(subscribeMode, getMode, getServerMode)
  const stageRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
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

    // ---------- linked (pinned) ----------
    const stage = stageRef.current
    const spacer = spacerRef.current
    if (!stage || !spacer) return

    let frame = 0
    let lastTime = 0
    let current = 0
    let target = 0
    let travel = 0
    let pinStart = 0
    let pinEnd = 0
    let viewportWidth = 0
    let centers: number[] = []

    const readTarget = () => {
      target = scrollProgress(window.scrollY, pinStart, pinStart + travel) * travel
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
      current = limitLag(smoothTowards(current, target, elapsed), target, window.scrollY, pinStart, pinEnd)
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

    let lastSpacer = ''
    let lastTop = ''

    const measure = () => {
      const viewportHeight = window.innerHeight
      const stageHeight = stage.offsetHeight
      viewportWidth = viewport.clientWidth
      // The track carries the page margins as padding, so its full width minus the
      // visible width puts photo 01 on the left margin at 0 and the last photo on
      // the right margin at the end.
      travel = Math.max(0, track.scrollWidth - viewportWidth)
      const pinTop = Math.max(0, Math.round((viewportHeight - stageHeight) / 2))
      const distance = Math.round(travel + viewportHeight * END_HOLD)

      // Write only on change: these resize the body, which this observer watches.
      const top = `${pinTop}px`
      const height = `${distance}px`
      if (top !== lastTop) stage.style.top = lastTop = top
      if (height !== lastSpacer) spacer.style.height = lastSpacer = height

      // The spacer is never stuck, so its document position is stable while pinned.
      const spacerTop = spacer.getBoundingClientRect().top + window.scrollY
      pinStart = spacerTop - stageHeight - pinTop
      pinEnd = pinStart + distance
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
    resizeObserver.observe(stage)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      stage.style.removeProperty('top')
      spacer.style.removeProperty('height')
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

  return { mode, stageRef, spacerRef, viewportRef, trackRef, railRef, counterRef, prevRef, nextRef, step }
}
