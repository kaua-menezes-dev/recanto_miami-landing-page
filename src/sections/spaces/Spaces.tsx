import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useHorizontalGallery } from './useHorizontalGallery'

type Photo = {
  file: string
  name: string
  /** Frame ratio on tablet/desktop (Figma crop); phones always use 3:2. */
  ratio: string
  /** Keeps the important part of the scene inside the crop. */
  position: string
  alt: string
}

/** Real venue photos (current site, /img/), as selected in Figma "Spaces / Desktop 1440" rev 1. */
const PHOTOS: Photo[] = [
  {
    file: 'jardim-vista',
    name: 'Jardim',
    ratio: '2 / 1',
    position: '50% 55%',
    alt: 'Vista aberta do jardim do Recanto Miami, com palmeiras, tenda de voil e céu azul.',
  },
  {
    file: 'cerimonia-corredor',
    name: 'Jardim coberto',
    ratio: '16 / 9',
    position: '50% 55%',
    alt: 'Jardim coberto com cobertura transparente, bancos de madeira no gramado e palmeiras ao redor.',
  },
  {
    file: 'piscina',
    name: 'Piscina',
    ratio: '3 / 2',
    position: '50% 50%',
    alt: 'Piscina azul cercada de palmeiras, estátuas e balaústres no jardim.',
  },
  {
    file: 'salao',
    name: 'Salão de festas',
    ratio: '16 / 9',
    position: '50% 60%',
    alt: 'Salão de festas com mesas redondas, cadeiras douradas, lustres e cortinas rosé.',
  },
]

const SRC = '/media/spaces'
const total = String(PHOTOS.length).padStart(2, '0')

/**
 * Section 03 — Nossos Espaços (Figma: "Spaces / Desktop 1440", "Tablet 768",
 * "Mobile 390", "Desktop 1440 · Reduced motion", rev 1). The venue is the
 * protagonist: a left-aligned editorial intro, then a panoramic track of real
 * photos that drifts horizontally while the page scrolls vertically (see
 * useHorizontalGallery). Phones, touch devices and reduced motion get a native
 * horizontal scroller instead. No CTA: this section is about discovery.
 */
export function Spaces() {
  const { mode, viewportRef, trackRef, railRef, counterRef, prevRef, nextRef, step } = useHorizontalGallery()
  const native = mode === 'native'

  return (
    <section
      id="espacos"
      aria-labelledby="spaces-title"
      data-gallery={mode}
      className="spaces mode-day bg-surface-base pb-16 pt-6 text-text-primary md:pb-24 md:pt-8 lg:pb-32"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 md:gap-4 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-20">
        {/* Bottom padding = the Section Heading component's built-in space under the title. */}
        <div className="flex max-w-[760px] flex-col pb-5 md:pb-8">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          <p className="mt-4 text-text-accent type-eyebrow md:mt-6">O espaço</p>
          <h2 id="spaces-title" className="mt-4 text-text-heading type-section-title">
            Um cenário para celebrar
            <br />
            <em className="italic">do seu jeito.</em>
          </h2>
        </div>
        <p className="text-text-secondary type-body-md md:max-w-[520px] lg:mb-1 lg:w-[400px] lg:shrink-0">
          Conheça os ambientes do Recanto Miami e imagine como cada detalhe pode fazer parte do seu casamento, festa ou
          evento.
        </p>
      </div>

      <div
        ref={viewportRef}
        className="spaces-viewport mt-8 md:mt-12 lg:mt-16"
        {...(native ? { tabIndex: 0, role: 'region', 'aria-label': 'Galeria dos ambientes (role para os lados)' } : {})}
      >
        <ul ref={trackRef} className="spaces-track" aria-label="Ambientes do Recanto Miami">
          {PHOTOS.map((photo, index) => (
            <li key={photo.file} className="spaces-item">
              <figure>
                <div className="spaces-frame" style={{ '--ratio': photo.ratio } as CSSProperties}>
                  <img
                    src={`${SRC}/${photo.file}-1280.webp`}
                    srcSet={`${SRC}/${photo.file}-828.webp 828w, ${SRC}/${photo.file}-1280.webp 1280w, ${SRC}/${photo.file}-1920.webp 1920w`}
                    sizes="(min-width: 64rem) 1160px, (min-width: 48rem) 880px, 330px"
                    width={1920}
                    height={1280}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    alt={photo.alt}
                    className="spaces-image"
                    style={{ objectPosition: photo.position }}
                  />
                </div>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="text-text-accent type-eyebrow tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-text-secondary type-caption">{photo.name}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-5 flex w-full max-w-[1440px] items-center gap-6 px-5 md:mt-6 md:px-10 lg:mt-8 lg:px-20">
        <div aria-hidden="true" className="flex h-6 flex-1 items-center gap-6">
          <span className="relative h-px flex-1 bg-border-subtle">
            <span ref={railRef} className="spaces-rail-active" />
          </span>
          <span className="text-text-secondary type-eyebrow tabular-nums">
            <span ref={counterRef}>01</span> / {total}
          </span>
        </div>
        {native && (
          <div className="hidden gap-3 md:flex">
            <button
              ref={prevRef}
              type="button"
              aria-label="Ambiente anterior"
              onClick={() => step(-1)}
              className="spaces-step"
            >
              <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.5} />
            </button>
            <button ref={nextRef} type="button" aria-label="Próximo ambiente" onClick={() => step(1)} className="spaces-step">
              <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      {native && (
        <p className="mx-auto mt-3 flex w-full items-center gap-2 px-5 text-text-secondary type-caption md:hidden">
          Deslize para ver os ambientes
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
        </p>
      )}
    </section>
  )
}
