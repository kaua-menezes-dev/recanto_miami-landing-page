import type { CSSProperties } from 'react'
import { ChevronDown, Pause, Play } from 'lucide-react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { WhatsAppCta } from '../../components/ui/WhatsAppCta'
import { HeroVideo } from './HeroVideo'
import { useHeroVideo } from './useHeroVideo'

type HeroProps = { quoteHref: string }

/** Credit for the film, shown bottom-right once the owner confirms it (open item). */
const FILM_CREDIT: string | null = null

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/**
 * Section 01 — Hero (Figma: "Hero / Desktop 1440", "Tablet 768", "Mobile 390", rev 2).
 * Editorial, bottom-anchored composition over the venue film.
 */
export function Hero({ quoteHref }: HeroProps) {
  const { videoRef, status, toggle, autoplay } = useHeroVideo()
  const isPlaying = status === 'playing'

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="mode-evening relative isolate flex min-h-svh flex-col overflow-hidden bg-surface-base text-text-primary"
    >
      <HeroVideo videoRef={videoRef} autoplay={autoplay} />

      {/* Full-bleed band that carries the contrast overlay; its top padding is the fade zone. */}
      <div className="hero-content-scrim mt-auto w-full pt-28 md:pt-20 xl:pt-40">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 md:gap-12 md:px-10 lg:px-20 xl:gap-16">
          <div className="flex flex-col gap-7 md:gap-10 xl:grid xl:grid-cols-12 xl:items-end xl:gap-x-6 xl:gap-y-0">
            {/* Headline block — columns 1–8 */}
            <div className="flex flex-col gap-4 md:gap-6 xl:col-span-8 xl:gap-7">
              <p className="flex items-center gap-4 text-text-accent type-eyebrow enter-rise" style={delay(200)}>
                <span aria-hidden="true" className="h-px w-12 shrink-0 bg-gold" />
                Casamentos · Festas · Eventos
              </p>
              <h1 id="hero-title" className="max-w-[820px] text-text-heading type-hero-title">
                <span className="block enter-rise" style={delay(280)}>
                  O seu próximo
                </span>{' '}
                <span className="block enter-rise" style={delay(360)}>
                  grande <em className="italic">momento</em>
                </span>{' '}
                <span className="block enter-rise" style={delay(440)}>
                  começa aqui.
                </span>
              </h1>
            </div>
  
            {/* Intro + actions — columns 9–12 */}
            <div className="flex flex-col gap-6 md:gap-8 xl:col-span-4">
              <p className="max-w-[520px] text-text-secondary type-body-lede enter-rise" style={delay(560)}>
                Do tão esperado “sim” às comemorações mais especiais, um lugar para viver momentos que ficam na
                memória.
              </p>
              <div
                className="flex flex-col items-start gap-5 md:flex-row md:gap-8 xl:flex-col xl:gap-5 enter-rise"
                style={delay(660)}
              >
                <WhatsAppCta href={quoteHref} label="Pedir orçamento no WhatsApp" className="w-full md:w-[360px] xl:w-full" />
                <ButtonLink variant="text" href="#o-recanto" showArrow>
                  Conhecer o Recanto
                </ButtonLink>
              </div>
            </div>
          </div>
  
          {/* Foot bar — video control · scroll cue · film credit */}
          <div
            className="grid grid-cols-[1fr_auto] items-center border-t border-border-subtle pb-4 pt-3 md:grid-cols-3 md:pb-6 md:pt-5 xl:pb-7 enter-fade"
            style={delay(820)}
          >
            <div className="justify-self-start">
              {status !== 'unavailable' && (
                <button
                  type="button"
                  onClick={toggle}
                  className="group flex items-center gap-3 rounded-full text-text-primary type-caption"
                >
                  <span className="flex size-13 items-center justify-center rounded-full border border-border-strong text-text-heading transition-colors duration-200 ease-settle group-hover:bg-action-primary-bg group-hover:text-action-primary-fg">
                    {isPlaying ? (
                      <Pause aria-hidden="true" size={24} strokeWidth={1.5} />
                    ) : (
                      <Play aria-hidden="true" size={24} strokeWidth={1.5} />
                    )}
                  </span>
                  {isPlaying ? 'Pausar filme' : 'Reproduzir filme'}
                </button>
              )}
            </div>
  
            <p aria-hidden="true" className="hidden items-center gap-2 justify-self-center text-text-secondary type-caption md:flex">
              Role para descobrir
              <ChevronDown size={24} strokeWidth={1.5} />
            </p>
  
            <p className="justify-self-end text-right text-text-secondary type-caption">
              {FILM_CREDIT && `Filme: ${FILM_CREDIT}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
