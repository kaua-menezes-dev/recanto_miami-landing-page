import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent, SyntheticEvent } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { pad2, swipeDirection, wrapIndex } from './storiesMotion'
import { PHOTO_CREDIT, WEDDINGS, photoSize, photoSources } from './weddings'

export type AlbumRequest = {
  wedding: number
  photo: number
  /** The gallery card that opened the album: morph origin and focus return target. */
  opener: HTMLElement
}

export type AlbumPhase = 'opening' | 'open' | 'closing'

type StoryAlbumProps = {
  request: AlbumRequest
  onPhase: (phase: AlbumPhase) => void
  onClosed: () => void
}

/** Reference morph curves: open power4.inOut 1.2s, close power3.inOut (= DS Drift) 1s. */
const OPEN_MS = 1200
const OPEN_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'
const CLOSE_MS = 1000
const CLOSE_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'
/** Non-morph close (another photo is showing, or reduced motion). */
const FADE_MS = 360

const HISTORY_KEY = 'storiesAlbum'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const rectKeyframe = (rect: DOMRect) => ({
  left: `${rect.left}px`,
  top: `${rect.top}px`,
  width: `${rect.width}px`,
  height: `${rect.height}px`,
})

/**
 * Wedding album lightbox (Figma: "Album / Desktop 1440 · 01–05", "Album / Mobile 390 · 01–05",
 * "Storyboard / S1–S4"). Evening mode, native modal <dialog> (page inert, scroll locked
 * and kept in place by `html:has(dialog[open])`).
 *
 * Opening follows the reference: the clicked photo morphs from its card into the album
 * stage (1.2s power4.inOut) while the other cards fade, then the story panel appears.
 * Closing (Voltar, ×, Esc or browser Back) morphs the photo back into its card and
 * returns focus to it. Inside: previous/next, thumbnails, ←/→ keys and swipe.
 */
export function StoryAlbum({ request, onPhase, onClosed }: StoryAlbumProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const stageImageRef = useRef<HTMLImageElement>(null)
  const ghostRef = useRef<HTMLImageElement | null>(null)
  const backRef = useRef<HTMLButtonElement>(null)
  const swipeRef = useRef<{ x: number; y: number } | null>(null)
  const phaseRef = useRef<AlbumPhase>('opening')
  const historyPushed = useRef(false)
  const titleId = useId()

  const [weddingIndex, setWeddingIndex] = useState(request.wedding)
  const [photoIndex, setPhotoIndex] = useState(request.photo)
  const [phase, setPhaseState] = useState<AlbumPhase>('opening')
  const [morph, setMorph] = useState(true)
  const [navigated, setNavigated] = useState(false)

  const wedding = WEDDINGS[weddingIndex]!
  const photo = wedding.photos[photoIndex]!
  const sources = photoSources(wedding.id, photoIndex)
  const next = WEDDINGS[wrapIndex(weddingIndex + 1, WEDDINGS.length)]!

  // Latest values for the close animation (runs from event handlers).
  const current = useRef({ weddingIndex, photoIndex })
  useLayoutEffect(() => {
    current.current = { weddingIndex, photoIndex }
  }, [weddingIndex, photoIndex])

  const setPhase = useCallback(
    (value: AlbumPhase) => {
      phaseRef.current = value
      setPhaseState(value)
      onPhase(value)
    },
    [onPhase],
  )

  const finish = useCallback(() => {
    const dialog = dialogRef.current
    ghostRef.current?.remove()
    if (dialog?.open) dialog.close()
    request.opener.focus({ preventScroll: true })
    onClosed()
  }, [onClosed, request.opener])

  /**
   * Animates a ghost copy of the photo between two rects (inside the dialog's top
   * layer, above everything); resolves when it lands. The ghost stays in place
   * until `dropGhost`, so the swap to the real image is seamless.
   */
  const flight = useCallback((src: string, from: DOMRect, to: DOMRect, duration: number, easing: string) => {
    const dialog = dialogRef.current
    if (!dialog) return Promise.resolve()
    ghostRef.current?.remove()
    const ghost = document.createElement('img')
    ghost.alt = ''
    ghost.className = 'album-ghost'
    ghost.src = src
    Object.assign(ghost.style, rectKeyframe(from))
    dialog.append(ghost)
    ghostRef.current = ghost
    const animation = ghost.animate([rectKeyframe(from), rectKeyframe(to)], { duration, easing, fill: 'forwards' })
    // Animations pause in background tabs; the album must still settle.
    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, duration + 300))
    return Promise.race([animation.finished.then(() => undefined, () => undefined), timeout]).then(() => {
      Object.assign(ghost.style, rectKeyframe(to))
      animation.cancel()
    })
  }, [])

  const dropGhost = useCallback(() => {
    ghostRef.current?.remove()
    ghostRef.current = null
  }, [])

  const startClose = useCallback(() => {
    if (phaseRef.current === 'closing') return
    const stage = stageImageRef.current
    const frame = request.opener.querySelector<HTMLElement>('[data-photo]')
    const sameView =
      current.current.weddingIndex === request.wedding && current.current.photoIndex === request.photo
    const canMorph = !prefersReducedMotion() && sameView && stage && frame && request.opener.isConnected

    setMorph(Boolean(canMorph))
    setPhase('closing')

    if (!canMorph) {
      window.setTimeout(finish, FADE_MS)
      return
    }
    const from = stage.getBoundingClientRect()
    const to = frame.getBoundingClientRect()
    void flight(stage.currentSrc || stage.src, from, to, CLOSE_MS, CLOSE_EASE).then(finish)
  }, [finish, flight, request, setPhase])

  /** Every UI close goes through history, so browser Back and the buttons share one path. */
  const requestClose = useCallback(() => {
    if (historyPushed.current && (window.history.state as Record<string, unknown> | null)?.[HISTORY_KEY]) {
      historyPushed.current = false
      window.history.back()
    } else {
      startClose()
    }
  }, [startClose])

  // ---------- open ----------
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const stage = stageImageRef.current
    if (!dialog || !stage || dialog.open) return

    dialog.showModal()
    if (!historyPushed.current) {
      historyPushed.current = true
      window.history.pushState({ ...(window.history.state as object | null), [HISTORY_KEY]: true }, '')
    }
    onPhase('opening')

    const frame = request.opener.querySelector<HTMLElement>('[data-photo]')
    const thumb = frame?.querySelector('img')
    // Measured after showModal: the scroll lock has already settled the layout.
    const from = frame?.getBoundingClientRect()
    const to = stage.getBoundingClientRect()
    let cancelled = false

    const reveal = () => {
      if (cancelled || phaseRef.current !== 'opening') return
      dropGhost()
      setPhase('open')
      backRef.current?.focus({ preventScroll: true })
    }

    if (prefersReducedMotion() || !from || !thumb || from.width === 0 || to.width === 0) {
      setMorph(false)
      window.setTimeout(reveal, 200)
    } else {
      // Swap to the real photo once decoded (no blank frame), but never wait past the flight.
      const decoded = Promise.race([
        stage.decode().catch(() => undefined),
        new Promise((resolve) => window.setTimeout(resolve, OPEN_MS + 300)),
      ])
      void Promise.all([flight(thumb.currentSrc || thumb.src, from, to, OPEN_MS, OPEN_EASE), decoded]).then(reveal)
    }
    return () => {
      cancelled = true
    }
    // Runs once per album: the request is fixed for this instance (keyed by the parent).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Browser Back closes the album instead of leaving the page.
  useEffect(() => {
    const onPopState = () => {
      historyPushed.current = false
      startClose()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [startClose])

  // Warm the neighbouring photos so next/previous never show an empty stage.
  useEffect(() => {
    if (phase !== 'open') return
    for (const offset of [1, -1]) {
      const index = wrapIndex(photoIndex + offset, wedding.photos.length)
      const image = new Image()
      image.sizes = STAGE_SIZES
      image.srcset = photoSources(wedding.id, index).srcSet
    }
  }, [phase, photoIndex, wedding])

  const showPhoto = (index: number) => {
    setNavigated(true)
    setPhotoIndex(wrapIndex(index, wedding.photos.length))
  }

  const showNextStory = () => {
    const index = wrapIndex(weddingIndex + 1, WEDDINGS.length)
    setNavigated(true)
    setWeddingIndex(index)
    setPhotoIndex(WEDDINGS[index]!.primary)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (phaseRef.current !== 'open') return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showPhoto(photoIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPhoto(photoIndex - 1)
    }
  }

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    requestClose()
  }

  const onPointerDown = (event: ReactPointerEvent) => {
    swipeRef.current = event.pointerType === 'mouse' ? null : { x: event.clientX, y: event.clientY }
  }
  const onPointerUp = (event: ReactPointerEvent) => {
    const start = swipeRef.current
    swipeRef.current = null
    if (!start || phaseRef.current !== 'open') return
    const direction = swipeDirection(event.clientX - start.x, event.clientY - start.y)
    if (direction) showPhoto(photoIndex + direction)
  }

  const size = photoSize(photo.orientation)
  const total = wedding.photos.length

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      data-phase={phase}
      data-morph={morph}
      onCancel={onCancel}
      onKeyDown={onKeyDown}
      className="stories-album mode-evening m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-text-primary backdrop:bg-transparent"
    >
      <div aria-hidden="true" className="album-backdrop absolute inset-0 bg-surface-base" />
      <div aria-hidden="true" className="album-panel-bg album-chrome absolute inset-y-0 right-0 hidden w-[41.667%] bg-forest lg:block" />

      <div className="album-layout relative h-full overflow-y-auto overscroll-contain lg:grid lg:grid-cols-[58.333%_1fr] lg:grid-rows-[auto_1fr_auto] lg:overflow-hidden">
        {/* Top bar — sticky on phones; first row of the story panel on desktop. */}
        <div className="album-chrome sticky top-0 z-10 flex h-18 items-center justify-between bg-surface-base pl-5 pr-3 lg:static lg:col-start-2 lg:row-start-1 lg:h-auto lg:bg-transparent lg:px-16 lg:pt-10">
          <div className="flex items-center gap-2.5">
            <button
              ref={backRef}
              type="button"
              onClick={requestClose}
              className="flex min-h-11 items-center gap-2 py-3 text-text-primary type-label lg:gap-2.5"
            >
              <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.5} />
              <span className="lg:hidden">Histórias</span>
              <span className="hidden lg:inline">Voltar às histórias</span>
            </button>
            <kbd className="hidden rounded-xs border border-border-subtle px-1.5 py-0.5 font-sans text-text-secondary type-caption lg:inline">
              Esc
            </kbd>
          </div>
          <button type="button" onClick={requestClose} aria-label="Fechar álbum" className="stories-icon-button">
            <X aria-hidden="true" size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Story heading */}
        <div className="album-chrome flex flex-col gap-2 px-5 pb-[46px] pt-4 lg:col-start-2 lg:row-start-2 lg:gap-5 lg:self-center lg:px-16 lg:pb-0 lg:pt-0">
          <p className="text-text-accent type-eyebrow">
            História {pad2(weddingIndex + 1)} de {pad2(WEDDINGS.length)}
          </p>
          <h2 id={titleId} className="text-text-heading type-album-title">
            {wedding.label}
          </h2>
          <p className="text-text-secondary type-caption">
            {total} fotos · Fotos: {PHOTO_CREDIT}
          </p>
        </div>

        {/* Stage */}
        <div
          className="album-stage relative touch-pan-y lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:h-dvh"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeRef.current = null)}
        >
          {/* Sized from the known aspect ratio (container units), so the box exists before the photo loads. */}
          <div className="album-photo-area mx-auto flex h-[488px] max-w-[640px] items-center justify-center lg:absolute lg:inset-x-20 lg:bottom-[196px] lg:top-16 lg:h-auto lg:max-w-none">
            <img
              ref={stageImageRef}
              key={`${wedding.id}-${photoIndex}`}
              src={sources.src}
              srcSet={sources.srcSet}
              sizes={STAGE_SIZES}
              width={size.width}
              height={size.height}
              alt={photo.alt}
              decoding="async"
              draggable={false}
              style={{ '--ratio': size.width / size.height } as CSSProperties}
              className={`album-photo select-none ${navigated ? 'album-photo-enter' : ''}`}
            />
          </div>

          <div className="album-chrome mx-auto mt-3 flex max-w-[680px] items-center justify-between px-5 lg:contents">
            <button
              type="button"
              onClick={() => showPhoto(photoIndex - 1)}
              aria-label="Foto anterior"
              className="stories-icon-button lg:absolute lg:left-6 lg:top-[calc(64px+(100dvh-260px)/2-26px)]"
            >
              <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.5} />
            </button>
            <p
              aria-live="polite"
              className="text-text-secondary type-caption tabular-nums lg:absolute lg:bottom-[142px] lg:left-1/2 lg:-translate-x-1/2"
            >
              <span className="sr-only">Foto </span>
              {pad2(photoIndex + 1)} / {pad2(total)}
            </p>
            <button
              type="button"
              onClick={() => showPhoto(photoIndex + 1)}
              aria-label="Próxima foto"
              className="stories-icon-button lg:absolute lg:right-6 lg:top-[calc(64px+(100dvh-260px)/2-26px)]"
            >
              <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
            </button>
          </div>

          <ul
            aria-label="Fotos deste casamento"
            className="album-chrome album-thumbs mx-auto mt-4 flex max-w-[680px] gap-2 overflow-x-auto px-5 pb-1 lg:absolute lg:bottom-12 lg:left-1/2 lg:mt-0 lg:max-w-none lg:-translate-x-1/2 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {wedding.photos.map((item, index) => (
              <li key={index} className="shrink-0">
                <button
                  type="button"
                  onClick={() => showPhoto(index)}
                  aria-label={`Foto ${index + 1} de ${total}: ${item.alt}`}
                  aria-current={index === photoIndex ? 'true' : undefined}
                  className="album-thumb"
                >
                  <img
                    src={photoSources(wedding.id, index).thumb}
                    alt=""
                    width={384}
                    height={item.orientation === 'landscape' ? 256 : 576}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="size-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Next story */}
        <div className="album-chrome mx-5 mb-9 mt-5 flex flex-col gap-2 border-t border-border-subtle pt-5 lg:col-start-2 lg:row-start-3 lg:mx-16 lg:mb-14 lg:mt-0 lg:gap-3 lg:pt-6">
          <p className="text-text-secondary type-caption">Próxima história</p>
          <button
            type="button"
            onClick={showNextStory}
            className="flex min-h-11 items-center gap-3 self-start text-text-heading lg:gap-4"
          >
            <span className="type-album-next">{next.label}</span>
            <ArrowRight aria-hidden="true" size={24} strokeWidth={1.5} className="text-text-primary" />
          </button>
        </div>
      </div>
    </dialog>
  )
}

const STAGE_SIZES = '(min-width: 64rem) 48vw, 100vw'
