import type { CSSProperties } from 'react'
import { useInViewOnce } from '../intro/useScrollReveal'
import { COLUMNS, TESTIMONIALS, type Testimonial } from './testimonialData'
import { useCardReveal, useColumnCount, useColumnDrift } from './useTestimonialsMotion'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties
const byId = new Map(TESTIMONIALS.map((testimonial) => [testimonial.id, testimonial]))

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { featured } = testimonial
  return (
    <figure
      data-reveal={testimonial.id}
      className={`testimonials-card flex flex-col gap-3 ${featured ? 'bg-forest text-ivory' : 'bg-ivory text-text-primary'}`}
    >
      <p className={`type-testimonial-title ${featured ? 'text-ivory' : 'text-text-heading'}`}>{testimonial.title}</p>
      <blockquote className="type-testimonial-quote">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="flex flex-col gap-0.5 pt-3">
        <span className={`type-label ${featured ? 'text-ivory' : 'text-text-heading'}`}>{testimonial.name}</span>
        <span className={`type-caption ${featured ? 'text-ivory-muted' : 'text-text-secondary'}`}>{testimonial.event}</span>
      </figcaption>
    </figure>
  )
}

/**
 * Section 06 — Depoimentos (Figma: "Testimonials / Desktop 1440", "Tablet 768",
 * "Mobile 390", rev 2). A compact masonry of six real testimonials, inspired by
 * 21st.dev Testimonial V2: the columns drift by a few pixels at different rates
 * as the page scrolls (no loop, no pinning) and the cards enter once, staggered.
 * No CTA — this section is social proof only.
 */
export function Testimonials() {
  const { ref: headingRef, inView } = useInViewOnce<HTMLDivElement>()
  const columnCount = useColumnCount()
  const driftRef = useColumnDrift<HTMLElement>()
  const gridRef = useCardReveal<HTMLDivElement>(columnCount)

  return (
    <section
      ref={driftRef}
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="testimonials mode-day bg-sand pb-24 pt-16 text-text-primary md:pb-32 md:pt-24 xl:pb-40 xl:pt-32"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-5 md:gap-16 md:px-10 lg:px-20">
        <div
          ref={headingRef}
          className={`flex flex-col items-center gap-4 text-center md:gap-6 ${inView ? 'is-inview' : ''}`}
        >
          <span aria-hidden="true" className="h-px w-10 bg-gold enter-on-view md:w-12" style={delay(0)} />
          <p className="text-text-accent type-eyebrow enter-on-view" style={delay(80)}>
            Depoimentos
          </p>
          <h2 id="testimonials-title" className="text-text-heading type-testimonials-display enter-on-view" style={delay(160)}>
            Histórias que <br className="md:hidden" />
            <em className="italic">permanecem.</em>
          </h2>
          <p
            className="max-w-[350px] text-text-secondary type-body-lg enter-on-view md:max-w-[560px] xl:max-w-[620px]"
            style={delay(240)}
          >
            Cada celebração carrega momentos únicos. Conheça algumas das histórias que fizeram parte do Recanto Miami.
          </p>
        </div>

        <div ref={gridRef} data-columns={columnCount} className="testimonials-grid">
          {COLUMNS[columnCount].map((column, index) => (
            <div key={`${columnCount}-${index}`} data-col={index} className="testimonials-column">
              {column.map((id) => {
                const testimonial = byId.get(id)
                return testimonial ? <TestimonialCard key={id} testimonial={testimonial} /> : null
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
