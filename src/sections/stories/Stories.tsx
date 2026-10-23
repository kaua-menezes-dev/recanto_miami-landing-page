import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { WhatsAppCta } from '../../components/ui/WhatsAppCta'
import { StoryAlbum } from './StoryAlbum'
import type { AlbumPhase, AlbumRequest } from './StoryAlbum'
import { columnOf, pad2 } from './storiesMotion'
import { useStoriesGallery } from './useStoriesGallery'
import { GALLERY, WEDDINGS, photoSize, photoSources } from './weddings'

type StoriesProps = {
  visitHref: string
}

/** Caption text split into characters for the reference's character-by-character reveal. */
function Chars({ text, from }: { text: string; from: number }) {
  return Array.from(text).map((char, index) => (
    <span key={index} className="stories-char" style={{ '--ci': from + index } as CSSProperties}>
      {char}
    </span>
  ))
}

/**
 * Section 04 — Histórias Reais (Figma: "Real Stories / Desktop 1440", "Mobile 390",
 * component "Real Stories / Gallery Item", rev 1 — approved 2026-10-23).
 *
 * The Codrops "Infinite Scroll Gallery with Page Transitions" on natural page scroll:
 * real photos from the five weddings on the current site, two per wedding, in the
 * approved asymmetric two-column composition (one staggered column on phones). Cards
 * reveal as they enter, columns drift at different speeds (useStoriesGallery), and a
 * card opens that wedding's album (StoryAlbum). Instead of capturing the wheel to loop
 * forever, the first cards return as a "loop seam" that dissolves into the closing
 * CTA, so the visitor always continues down the page.
 */
export function Stories({ visitHref }: StoriesProps) {
  const { galleryRef, cursorRef } = useStoriesGallery()
  const [album, setAlbum] = useState<(AlbumRequest & { key: number; card: number }) | null>(null)
  const [phase, setPhase] = useState<AlbumPhase | null>(null)

  const onClosed = useCallback(() => {
    setAlbum(null)
    setPhase(null)
  }, [])

  return (
    <section
      id="casamentos"
      aria-labelledby="stories-title"
      data-album={phase ?? undefined}
      className="stories mode-day bg-surface-base pb-16 pt-6 text-text-primary md:pb-24 md:pt-8 lg:pb-32"
    >
      {/* Title and paragraph share a row only where the two-line title fits (Desktop 1440: 760 + 400 → from 1376px). */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-5 md:px-10 lg:px-20 min-[86rem]:flex-row min-[86rem]:items-end min-[86rem]:justify-between min-[86rem]:gap-10">
        <div className="flex max-w-[760px] flex-col pb-5 md:pb-8">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          <p className="mt-4 text-text-accent type-eyebrow md:mt-6">Histórias reais · Recanto Miami</p>
          <h2 id="stories-title" className="mt-4 text-text-heading type-section-title">
            Cada história é única.
            <br />
            <em className="italic">O cenário pode ser inesquecível.</em>
          </h2>
        </div>
        <p className="text-text-secondary type-body-md md:max-w-[520px] min-[86rem]:mb-1 min-[86rem]:w-[400px] min-[86rem]:shrink-0">
          Momentos especiais merecem ser lembrados para sempre. Conheça algumas das histórias que ganharam vida no
          Recanto Miami.
        </p>
      </div>

      <div className="stories-gallery-wrap mt-12 lg:mt-[72px]">
        <ol ref={galleryRef} className="stories-gallery" aria-label="Casamentos reais no Recanto Miami">
          {GALLERY.map((card, index) => {
            const wedding = WEDDINGS[card.wedding]!
            const photo = wedding.photos[card.photo]!
            const sources = photoSources(wedding.id, card.photo)
            const size = photoSize(photo.orientation)
            const number = pad2(card.wedding + 1)
            const count = `${wedding.photos.length} fotos`
            const style = {
              '--x': card.desktop.x,
              '--y': card.desktop.y,
              '--w': card.desktop.w,
              '--mx': card.mobile?.x ?? 0,
              '--mw': card.mobile?.w ?? 0,
              '--slot': card.mobile?.slot ?? 0,
            } as CSSProperties
            const active = album?.card === index

            return (
              <li
                key={index}
                data-card=""
                data-column={columnOf(card.desktop.x)}
                data-phone={card.mobile ? undefined : 'hidden'}
                data-active={active ? '' : undefined}
                aria-hidden={card.seam ? true : undefined}
                className="stories-card"
                style={style}
              >
                <button
                  type="button"
                  tabIndex={card.seam ? -1 : undefined}
                  aria-label={`Ver a história de ${wedding.label} — ${count}`}
                  aria-haspopup="dialog"
                  className="stories-open"
                  onClick={(event) => {
                    if (album) return
                    setAlbum({
                      wedding: card.wedding,
                      photo: card.photo,
                      opener: event.currentTarget,
                      key: Date.now(),
                      card: index,
                    })
                  }}
                >
                  <span data-photo="" className="stories-frame">
                    <img
                      src={sources.src}
                      srcSet={sources.srcSet}
                      sizes="(min-width: 90rem) 440px, (min-width: 48rem) 31vw, 82vw"
                      width={size.width}
                      height={size.height}
                      alt=""
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                      className="stories-image"
                    />
                    <span aria-hidden="true" className="stories-scrim" />
                    <span aria-hidden="true" className="stories-chip">
                      Ver história
                      <ArrowRight size={16} strokeWidth={1.5} />
                    </span>
                  </span>
                  <span aria-hidden="true" className="stories-caption">
                    <span className="text-text-accent type-caption tabular-nums">
                      <Chars text={number} from={0} />
                    </span>
                    <span className="text-text-primary type-body-sm">
                      <Chars text={wedding.label} from={number.length} />
                    </span>
                    <span className="stories-count ml-auto text-text-secondary type-caption">
                      <Chars text={count} from={number.length + wedding.label.length} />
                    </span>
                    <span className="stories-hint ml-auto text-text-accent type-caption">Ver história</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        <div aria-hidden="true" className="stories-seam-fade" />
      </div>

      <div aria-hidden="true" ref={cursorRef} className="stories-cursor">
        <span className="stories-cursor-disc type-label">Ver história</span>
      </div>

      <div className="mx-auto mt-2 flex w-full max-w-[800px] flex-col items-center px-5 text-center">
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
        <p className="mt-4 text-text-accent type-eyebrow md:mt-6">Seu dia no Recanto</p>
        <h2 className="mt-4 text-text-heading type-section-title">
          A próxima história
          <br />
          pode ser <em className="italic">a sua.</em>
        </h2>
        <p className="mt-5 text-text-secondary type-body-lg md:mt-8">
          Transforme o seu grande dia em uma experiência inesquecível no Recanto Miami.
        </p>
        <WhatsAppCta
          href={visitHref}
          label="Agende uma visita"
          className="mt-8 w-full text-left md:mt-10 md:max-w-[420px]"
        />
      </div>

      {album && (
        <StoryAlbum
          key={album.key}
          request={album}
          onPhase={setPhase}
          onClosed={onClosed}
        />
      )}
    </section>
  )
}
