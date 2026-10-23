import { useEffect, useRef } from 'react'

type NetworkInformationLike = { saveData?: boolean }

/**
 * Ambient playback for a muted, looping, controls-free video.
 * - Plays only while the video intersects the viewport and pauses as soon as it
 *   leaves; with `preload="none"` nothing downloads before the first play.
 * - Reduced motion or Save-Data: never plays; the poster (first frame) stays.
 *   Switching to reduced motion mid-playback rewinds to that same frame.
 * - No React state: the observer drives the element directly.
 */
export function useAmbientVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // React does not reliably reflect `muted` as an attribute; mobile autoplay needs it.
    video.muted = true

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = Boolean((navigator as Navigator & { connection?: NetworkInformationLike }).connection?.saveData)
    let visible = false

    const sync = () => {
      if (visible && !reducedMotion.matches && !saveData) {
        video.play().catch(() => undefined)
        return
      }
      video.pause()
      if (reducedMotion.matches && video.currentTime > 0) video.currentTime = 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      visible = entry.isIntersecting
      sync()
    })
    observer.observe(video)
    reducedMotion.addEventListener('change', sync)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', sync)
      video.pause()
    }
  }, [])

  return ref
}
