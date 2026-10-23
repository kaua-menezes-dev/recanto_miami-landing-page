import type { CSSProperties } from 'react'
import { useInViewOnce } from '../intro/useScrollReveal'
import { InquiryForm } from './InquiryForm'

const SRC = '/media/spaces'
const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/**
 * Section 07 — Plan Your Event (Figma: "Plan / Desktop 1440", "Tablet 768",
 * "Mobile 390", "Plan — Design notes (rev 1)"). A quieter editorial beat after
 * the Section 06 masonry: one real photo of the reception hall beside a short
 * inquiry form that opens WhatsApp with a ready, editable message.
 *
 * Motion plays once when the section's top reaches 80% of the viewport: the
 * photo is revealed upward through a clip mask while it settles from 1.06 to 1,
 * then the heading and the form rise in. No pinning, no scroll-linked effects.
 */
export function PlanEvent() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0, '0px 0px -20% 0px')

  return (
    <section
      id="planejar"
      aria-labelledby="plan-title"
      className="mode-day bg-surface-base pb-24 pt-16 text-text-primary md:pb-32 md:pt-24 xl:pb-40 xl:pt-32"
    >
      <div ref={ref} className={`plan-layout mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-20 ${inView ? 'is-inview' : ''}`}>
        <div className="plan-photo">
          <img
            src={`${SRC}/salao-1280.webp`}
            srcSet={`${SRC}/salao-828.webp 828w, ${SRC}/salao-1280.webp 1280w, ${SRC}/salao-1920.webp 1920w`}
            sizes="(min-width: 80rem) 1800px, (min-width: 48rem) 640px, 100vw"
            width={1920}
            height={1280}
            alt="Salão de festa com mesas redondas, cadeiras douradas e cortinas rosé"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="plan-heading">
          <span aria-hidden="true" className="plan-rule" style={delay(200)} />
          <p className="mt-5 text-text-accent type-eyebrow plan-enter md:mt-6" style={delay(240)}>
            Seu próximo evento
          </p>
          <h2 id="plan-title" className="mt-3 text-text-heading type-plan-title plan-enter md:mt-4" style={delay(320)}>
            Vamos planejar algo <em className="italic">especial?</em>
          </h2>
          <p className="mt-4 text-text-secondary type-body-md plan-enter md:mt-6 xl:max-w-[540px]" style={delay(400)}>
            Conte um pouco sobre o que você está imaginando. Estamos prontos para ajudar a transformar esse momento em
            uma experiência inesquecível.
          </p>
        </div>

        <div className="plan-form plan-enter" style={delay(480)}>
          <InquiryForm />
        </div>
      </div>
    </section>
  )
}
