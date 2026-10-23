import type { CSSProperties } from 'react'
import { useInViewOnce, useScrollReveal } from '../intro/useScrollReveal'
import { useAmbientVideo } from './useAmbientVideo'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

const SRC = '/media/experiences'

/** Facts stated on the current site (recantomiami-eventos.vercel.app) — owner confirmation pending. */
const CEREMONY_DETAILS = ['Altar com tenda de voil', 'Corredor espelhado sob lustres de cristal', 'Bancos no gramado, entre palmeiras']
const OCCASIONS = ['Debutante (15 anos)', 'Aniversários', 'Eventos corporativos', 'E outras celebrações']
const FEATURES = [
  { title: 'Até 250 convidados', text: 'Cerimônia e festa no mesmo lugar.' },
  { title: 'Mobiliário incluso', text: 'Mesas, cadeiras, sofás, aparador e lounges.' },
  { title: 'Suíte da noiva', text: 'Sala privativa para cabelo e maquiagem, com banheira de hidromassagem.' },
  { title: 'Espaço kids', text: 'Para os pequenos aproveitarem enquanto os adultos celebram.' },
  { title: 'Gerador stand-by', text: 'Se faltar energia na rua, a festa continua.' },
  { title: 'Equipe de apoio', text: 'Limpeza dos banheiros e segurança durante todo o evento.' },
]

/**
 * Section 05 — Experiências e Serviços (Figma: "Experiences / Desktop 1440",
 * "Tablet 768", "Mobile 390", storyboards "Reveal R1–R3" and "Expansion E1–E3 /
 * M1–M3", rev 1). A calm editorial chapter after the wedding gallery: a centred
 * intro, two alternating photo/text pairs, the venue's structure, and a closing
 * landscape that widens from the content margins to full bleed as the page
 * scrolls. Photos and text enter once (clip reveal + rise); the expansion is
 * scroll-linked through useScrollReveal, never pinned. No CTA in this section.
 */
export function Experiences() {
  const { ref: ceremonyRef, inView: ceremonyInView } = useInViewOnce<HTMLDivElement>(0.15)
  const { ref: celebrationsRef, inView: celebrationsInView } = useInViewOnce<HTMLDivElement>(0.15)
  const { ref: venueRef, inView: venueInView } = useInViewOnce<HTMLDivElement>(0.15)
  const { ref: featuresRef, inView: featuresInView } = useInViewOnce<HTMLDivElement>(0.15)
  const finalRef = useScrollReveal<HTMLDivElement>({ anchor: 'top' })
  const celebrationVideoRef = useAmbientVideo()

  return (
    <section
      id="experiencias"
      aria-labelledby="experiences-title"
      className="experiences mode-day bg-surface-base pt-6 text-text-primary md:pt-8"
    >
      <div className="exp-container">
        {/* ---------- Intro ---------- */}
        <header className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          <p className="mt-5 text-text-accent type-eyebrow md:mt-6">Experiências e serviços</p>
          <h2 id="experiences-title" className="mt-3.5 text-text-heading type-exp-display md:mt-4 xl:mt-5">
            Cada detalhe faz
            <br className="md:hidden" /> parte
            <br className="hidden md:inline" /> <em className="italic">da história.</em>
          </h2>
          <p className="mt-5 max-w-[330px] text-text-secondary type-body-md md:mt-6 md:max-w-[500px] xl:mt-8 xl:max-w-[600px] xl:text-[20px] xl:leading-[1.6]">
            Do tão esperado sim às celebrações mais especiais, descubra as possibilidades de viver seu momento no Recanto
            Miami.
          </p>
        </header>

        {/* ---------- Block 01 — Cerimônias ---------- */}
        <div
          ref={ceremonyRef}
          className={`exp-pair exp-pair-ceremony mt-24 md:mt-32 xl:mt-40 ${ceremonyInView ? 'is-inview' : ''}`}
        >
          <figure className="exp-pair-media">
            <div className="exp-reveal exp-ratio-4x5 exp-bleed-left">
              <img
                src={`${SRC}/cerimonia-altar-4x5-1024.webp`}
                srcSet={`${SRC}/cerimonia-altar-4x5-640.webp 640w, ${SRC}/cerimonia-altar-4x5-1024.webp 1024w`}
                sizes="(min-width: 80rem) 616px, (min-width: 48rem) 56vw, 90vw"
                width={1024}
                height={1280}
                loading="lazy"
                decoding="async"
                alt="Altar com tenda de voil e corredor espelhado sob lustres de cristal no jardim coberto do Recanto Miami."
                className="exp-image"
              />
            </div>
            <figcaption className="exp-caption">Altar com tenda de voil, no jardim coberto</figcaption>
          </figure>
          <div className="exp-pair-text">
            <p className="text-text-accent type-eyebrow enter-on-view" style={delay(200)}>
              01 — Cerimônias
            </p>
            <h3 className="exp-heading-gap text-text-heading type-exp-heading enter-on-view" style={delay(280)}>
              O momento
              <br className="hidden md:inline" /> <em className="italic">do sim.</em>
            </h3>
            <p className="exp-body-gap text-text-primary type-exp-pair-body enter-on-view" style={delay(360)}>
              No jardim coberto, entre palmeiras, a luz do dia entra pela cobertura transparente. Do altar de voil até a
              saída, a fileira de lustres de cristal acompanha o cortejo.
            </p>
            <ul className="exp-list-gap enter-on-view" style={delay(440)}>
              {CEREMONY_DETAILS.map((item) => (
                <li key={item} className="exp-detail-row text-text-primary type-body-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Block 02 — Festas e celebrações ---------- */}
        <div
          ref={celebrationsRef}
          className={`exp-pair exp-pair-celebrations mt-24 md:mt-32 xl:mt-44 ${celebrationsInView ? 'is-inview' : ''}`}
        >
          <figure className="exp-pair-media">
            {/* Real celebration film (vertical source) covering the approved frame in place of the placeholder. */}
            <div className="exp-reveal exp-reveal-from-left exp-ratio-celebration exp-bleed-right">
              <video
                ref={celebrationVideoRef}
                className="exp-image"
                poster={`${SRC}/celebracao-poster.webp`}
                width={720}
                height={1280}
                muted
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                preload="none"
                tabIndex={-1}
                aria-label="Festa de casamento no Recanto Miami: noivos, banda ao vivo e convidados dançando sob os lustres de cristal."
              >
                <source src={`${SRC}/celebracao-720p.mp4`} type="video/mp4" />
              </video>
            </div>
            <figcaption className="exp-caption exp-caption-bleed-right">Celebração real no Recanto Miami</figcaption>
          </figure>
          <div className="exp-pair-text">
            <p className="text-text-accent type-eyebrow enter-on-view" style={delay(200)}>
              02 — Festas e celebrações
            </p>
            <h3 className="exp-heading-gap text-text-heading type-exp-heading enter-on-view" style={delay(280)}>
              Momentos que merecem
              <br className="hidden xl:inline" /> <em className="italic">ser celebrados.</em>
            </h3>
            <p className="exp-body-gap exp-measure text-text-primary type-exp-pair-body enter-on-view" style={delay(360)}>
              O jardim, a galeria e o salão também recebem debutantes, aniversários e eventos corporativos, com o mesmo
              cuidado de um grande dia.
            </p>
            <ul className="exp-occasions-gap exp-measure enter-on-view" style={delay(440)} aria-label="Celebrações">
              {OCCASIONS.map((item) => (
                <li key={item} className="exp-occasion-row text-text-heading type-exp-occasion">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Block 03 — Estrutura e diferenciais ---------- */}
        <div ref={venueRef} className={`exp-venue mt-24 md:mt-32 xl:mt-44 ${venueInView ? 'is-inview' : ''}`}>
          <div className="exp-venue-heading">
            <p className="text-text-accent type-eyebrow enter-on-view" style={delay(200)}>
              03 — Estrutura e diferenciais
            </p>
            <h3 className="exp-heading-gap text-text-heading type-exp-heading enter-on-view" style={delay(280)}>
              Um espaço pensado para
              <br className="hidden xl:inline" /> viver <em className="italic">momentos especiais.</em>
            </h3>
          </div>
          <p
            className="exp-venue-lede text-text-secondary type-body-md enter-on-view"
            style={delay(360)}
          >
            Cerimônia e festa no mesmo endereço, no bairro Água Azul, em Guarulhos, com a estrutura inclusa na locação.
          </p>
          <figure className="exp-venue-figure">
            <div className="exp-reveal exp-reveal-plain exp-venue-photo">
              <img
                src={`${SRC}/buffet-verde-1280.webp`}
                srcSet={`${SRC}/buffet-verde-828.webp 828w, ${SRC}/buffet-verde-1280.webp 1280w, ${SRC}/buffet-verde-1920.webp 1920w`}
                sizes="(min-width: 80rem) 74vw, (min-width: 48rem) 84vw, 100vw"
                width={1920}
                height={1280}
                loading="lazy"
                decoding="async"
                alt="Galeria coberta do Recanto Miami com lustres de cristal, arranjos de flores brancas e mesa posta."
                className="exp-image"
              />
            </div>
            <figcaption className="exp-venue-caption enter-on-view" style={delay(360)}>
              <span className="text-text-accent type-eyebrow xl:block">Fig. 03</span>
              <span className="text-text-secondary type-caption">
                <span className="xl:hidden"> — </span>Galeria coberta, com lustres de cristal
                <span className="hidden md:inline"> e painel floral</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div ref={featuresRef} className={`exp-venue-facts ${featuresInView ? 'is-inview' : ''}`}>
          <ul className="exp-features" aria-label="Diferenciais do Recanto Miami">
            {FEATURES.map((feature, index) => (
              <li key={feature.title} className="exp-feature enter-on-view" style={delay(index * 80)}>
                <span className="text-text-accent type-eyebrow tabular-nums" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="text-text-heading type-exp-feature-title">{feature.title}</h4>
                <p className="text-text-secondary type-body-sm">{feature.text}</p>
              </li>
            ))}
          </ul>
          <p className="exp-services enter-on-view" style={delay(480)}>
            <span className="exp-services-label text-text-accent type-eyebrow">Serviços da casa</span>
            <span className="exp-services-text text-text-heading type-exp-quote">
              Buffet, decoração, assessoria e DJ, da própria casa.
            </span>
          </p>
        </div>
      </div>

      {/* ---------- Final photographic expansion ---------- */}
      <div ref={finalRef} className="exp-final mt-24 md:mt-32 xl:mt-44">
        <img
          src="/media/spaces/jardim-vista-1280.webp"
          srcSet="/media/spaces/jardim-vista-828.webp 828w, /media/spaces/jardim-vista-1280.webp 1280w, /media/spaces/jardim-vista-1920.webp 1920w"
          sizes="(min-width: 80rem) 100vw, (min-width: 48rem) 125vw, 215vw"
          width={1920}
          height={1280}
          loading="lazy"
          decoding="async"
          alt="Jardim do Recanto Miami com palmeiras, tenda de voil e balaústres sob o céu azul."
          className="exp-final-image"
        />
        <div aria-hidden="true" className="exp-final-scrim" />
        <div className="exp-final-statement">
          <span aria-hidden="true" className="block h-px w-10 bg-gold" />
          <p className="mt-5 text-ivory type-exp-statement md:mt-6 xl:mt-7">
            Cada celebração tem sua essência.
            <em className="block italic">Cada história merece um lugar especial.</em>
          </p>
        </div>
      </div>
    </section>
  )
}
