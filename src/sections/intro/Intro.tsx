import type { CSSProperties } from 'react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { useInViewOnce, useScrollReveal } from './useScrollReveal'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/** Real venue photo "cerimonia-altar" (current site; also in the Figma file), art-directed per breakpoint. */
const PHOTO = '/media/intro/intro'

/**
 * Section 02 — Intro / O Recanto (Figma: "Intro / Desktop 1440", "Tablet 768",
 * "Mobile 390", rev 1). A testimonial-led pause after the Hero: the bride's quote
 * is read first, then a real venue photo opens from a contained window to its
 * settled width as the visitor scrolls.
 *
 * Quote line breaks follow the approved frames: five lines from 1280px
 * (Display/LG 80), six lines below (H1 56 on tablet, Mobile/H2 30 on phones).
 * The emphasised last sentence always sits on its own line.
 */
export function Intro() {
  const { ref: quoteRef, inView } = useInViewOnce<HTMLElement>()
  const stageRef = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="o-recanto"
      aria-labelledby="intro-title"
      className="mode-day bg-surface-base pb-16 pt-24 text-text-primary md:pb-24 md:pt-32 xl:pb-32 xl:pt-40"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-5 md:gap-24 md:px-10 lg:px-20 xl:gap-32">
        <figure
          ref={quoteRef}
          className={`flex w-full flex-col items-center gap-6 text-center md:gap-8 xl:gap-12 ${inView ? 'is-inview' : ''}`}
        >
          <h2
            id="intro-title"
            className="flex items-center gap-2.5 text-text-accent type-eyebrow md:gap-4 enter-on-view"
            style={delay(0)}
          >
            <span aria-hidden="true" className="h-px w-5 shrink bg-gold md:w-8 xl:w-10" />
            Palavras de quem viveu o Recanto
            <span aria-hidden="true" className="h-px w-5 shrink bg-gold md:w-8 xl:w-10" />
          </h2>

          <blockquote className="w-full max-w-[1280px] text-text-heading type-intro-quote enter-on-view" style={delay(80)}>
            <p>
              “Eu não queria salão
              <br className="xl:hidden" /> fechado,
              <br className="hidden xl:inline" /> nem igreja,
              <br className="xl:hidden" /> nem campo,
              <br className="hidden xl:inline" /> nem praia.
              <br className="xl:hidden" /> Queria algo
              <br /> diferente e lindo.
              <em className="block italic text-text-accent">É como se unisse tudo.”</em>
            </p>
          </blockquote>

          <figcaption
            className="flex flex-col items-center gap-3 text-text-secondary type-body-sm md:flex-row md:gap-4 enter-on-view"
            style={delay(160)}
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold md:w-12" />
            <span className="max-w-[280px] md:max-w-none">
              Noiva do Recanto, no depoimento
              <br className="md:hidden" /> “Todo mundo elogiou!”
            </span>
            <span aria-hidden="true" className="hidden h-px w-12 bg-gold md:block" />
          </figcaption>
        </figure>

        <div className="flex w-full flex-col items-center gap-8 md:gap-12 xl:gap-14">
          <div
            ref={stageRef}
            className="intro-reveal-stage relative aspect-[4/5] w-full max-w-[1280px] overflow-hidden bg-sand md:aspect-[3/2] xl:aspect-video"
          >
            <picture>
              <source
                media="(min-width: 80rem)"
                type="image/webp"
                srcSet={`${PHOTO}-16x9-1280.webp 1280w, ${PHOTO}-16x9-1920.webp 1920w`}
                sizes="(min-width: 1440px) 1280px, calc(100vw - 160px)"
              />
              <source
                media="(min-width: 48rem)"
                type="image/webp"
                srcSet={`${PHOTO}-3x2-960.webp 960w, ${PHOTO}-3x2-1376.webp 1376w`}
                sizes="(min-width: 64rem) calc(100vw - 160px), calc(100vw - 80px)"
              />
              <img
                src={`${PHOTO}-4x5-640.webp`}
                srcSet={`${PHOTO}-4x5-640.webp 640w, ${PHOTO}-4x5-864.webp 864w`}
                sizes="calc(100vw - 40px)"
                width={864}
                height={1080}
                loading="lazy"
                decoding="async"
                alt="Espaço de cerimônia do Recanto Miami sob cobertura de vidro: cortinas claras entre colunas, lustres de cristal e um corredor espelhado ladeado por arranjos de rosas brancas, com jardim e palmeiras ao redor."
                className="intro-reveal-media absolute inset-0 size-full object-cover"
              />
            </picture>
          </div>

          <ButtonLink variant="text" href="#espacos" showArrow>
            Conheça nossos espaços
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
