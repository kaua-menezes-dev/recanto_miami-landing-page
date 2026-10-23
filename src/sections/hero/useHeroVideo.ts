import { useCallback, useEffect, useRef, useState } from 'react'

export type HeroVideoStatus = 'playing' | 'paused' | 'unavailable'

type NetworkInformationLike = { saveData?: boolean }

function shouldAutoplay(): boolean {
  if (typeof window === 'undefined') return false
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  return !reducedMotion && !connection?.saveData
}

/**
 * Owns playback for the hero film.
 * - Autoplays muted unless the visitor prefers reduced motion or Save-Data is on;
 *   in those cases the poster shows and "Reproduzir filme" starts it on demand.
 * - A visitor's explicit pause is respected; otherwise the film pauses while the
 *   hero is off-screen to save CPU/battery and resumes when it returns.
 * - Load/playback errors fall back to the poster and hide the control.
 */
export function useHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const [autoplay] = useState(shouldAutoplay)
  const [status, setStatus] = useState<HeroVideoStatus>('paused')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // React does not reliably reflect `muted` as an attribute; mobile autoplay needs it.
    video.muted = true

    const onPlay = () => setStatus('playing')
    const onPause = () => setStatus((s) => (s === 'unavailable' ? s : 'paused'))
    const onError = () => setStatus('unavailable')
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('error', onError)
    const lastSource = video.querySelector('source:last-of-type')
    lastSource?.addEventListener('error', onError)

    if (autoplay) {
      video.play().catch(() => setStatus('paused'))
    }

    let observer: IntersectionObserver | undefined
    if (autoplay && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry || userPausedRef.current) return
        if (entry.isIntersecting) video.play().catch(() => undefined)
        else video.pause()
      })
      observer.observe(video)
    }

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('error', onError)
      lastSource?.removeEventListener('error', onError)
      observer?.disconnect()
    }
  }, [autoplay])

  const toggle = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      userPausedRef.current = false
      video.play().catch(() => setStatus('unavailable'))
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }, [])

  return { videoRef, status, toggle, autoplay }
}
