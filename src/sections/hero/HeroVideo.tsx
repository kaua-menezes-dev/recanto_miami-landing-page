import type { RefObject } from 'react'

type HeroVideoProps = {
  videoRef: RefObject<HTMLVideoElement | null>
  autoplay: boolean
}

const MEDIA = '/media/hero'

/**
 * Decorative background film (original Recanto Miami venue video, web-optimised).
 * Absolutely positioned behind the content, so it never shifts layout; the
 * first-frame poster paints immediately while the video streams.
 */
export function HeroVideo({ videoRef, autoplay }: HeroVideoProps) {
  return (
    <div className="absolute inset-0 -z-10 bg-night" aria-hidden="true">
      <video
        ref={videoRef}
        className="size-full object-cover object-center"
        poster={`${MEDIA}/hero-poster.webp`}
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload={autoplay ? 'auto' : 'none'}
        tabIndex={-1}
      >
        <source src={`${MEDIA}/hero-1080p.mp4`} type="video/mp4" media="(min-width: 1024px)" />
        <source src={`${MEDIA}/hero-720p.mp4`} type="video/mp4" />
      </video>
      <div className="hero-scrim absolute inset-0" />
    </div>
  )
}
