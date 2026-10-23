import type { CSSProperties } from 'react'
import { WhatsAppCta } from '../../components/ui/WhatsAppCta'
import { useInViewOnce } from '../intro/useScrollReveal'
import { useFinalExpansion } from './useFinalExpansion'

type FinalCtaProps = { visitHref: string }

const SRC = '/media/spaces'
const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/**
 * Section 08 — Final CTA (Figma: "Final / Desktop 1440" rev 2, "Final / Tablet
 * 768", "Final / Mobile 390", "Final — Design notes (rev 3)"). A cinematic
 * closing statement after Reference 1: the real covered-garden photo under a
 * Deep Night scrim, an oversized staggered headline and one invitation that
 * opens WhatsApp with the visit message. The scrim dissolves into the footer.
 *
 * Motion: the photo arrives framed on the ivory left by Section 07 and opens
 * to full-bleed — scroll-linked from 768px (useFinalExpansion), a single
 * 600ms step on phones. The copy rises in once (80ms stagger, CTA last).
 * Reduced motion: full-bleed from the start, copy fades in 200ms.
 */
export function FinalCta({ visitHref }: FinalCtaProps) {
  const stageRef = useFinalExpansion<HTMLDivElement>()
  const { ref: frameRef, inView: frameOpen } = useInViewOnce<HTMLDivElement>(0, '0px 0px -20% 0px')
  const { ref: copyRef, inView: copyInView } = useInViewOnce<HTMLDivElement>(0.2, '0px 0px -10% 0px')

  return (
    <section id="contato" aria-labelledby="final-title" className="mode-evening final-section text-text-primary">
      <div ref={frameRef} className={frameOpen ? 'is-open' : ''}>
        <div ref={stageRef} className="final-stage">
          <img
            src={`${SRC}/cerimonia-corredor-1280.webp`}
            srcSet={`${SRC}/cerimonia-corredor-828.webp 828w, ${SRC}/cerimonia-corredor-1280.webp 1280w, ${SRC}/cerimonia-corredor-1920.webp 1920w`}
            sizes="100vw"
            width={1920}
            height={1280}
            alt=""
            loading="lazy"
            decoding="async"
            className="final-photo"
          />
          <div aria-hidden="true" className="final-scrim" />

          <div ref={copyRef} className={`final-copy ${copyInView ? 'is-inview' : ''}`}>
            <p className="final-eyebrow text-text-accent type-eyebrow final-enter" style={delay(0)}>
              Recanto Miami · Casamentos &amp; Eventos
            </p>

            <h2 id="final-title" className="text-text-heading type-hero-title final-title">
              <span className="sr-only">Alguns momentos merecem um lugar à altura.</span>
              <span aria-hidden="true" className="final-lines max-md:hidden">
                <span className="final-line final-enter" style={delay(80)}>
                  Alguns momentos
                </span>
                <span className="final-line final-enter" style={delay(160)}>
                  merecem um lugar
                </span>
                <span className="final-line final-enter" style={delay(240)}>
                  à <em className="italic">altura</em>.
                </span>
              </span>
              <span aria-hidden="true" className="final-lines md:hidden">
                <span className="final-line final-enter" style={delay(80)}>
                  Alguns momentos
                </span>
                <span className="final-line final-enter" style={delay(160)}>
                  merecem um
                </span>
                <span className="final-line final-enter" style={delay(240)}>
                  lugar à <em className="italic">altura</em>.
                </span>
              </span>
            </h2>

            <p className="final-support text-text-primary type-body-lg final-enter" style={delay(320)}>
              Transforme sua próxima celebração em uma memória para a vida toda.
            </p>

            <div className="final-cta final-enter" style={delay(480)}>
              <WhatsAppCta
                href={visitHref}
                label="Agende uma visita"
                helper="Abre o WhatsApp com uma mensagem pronta para agendar sua visita. Nada é enviado sem você confirmar."
                className="w-full text-center md:w-[420px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
