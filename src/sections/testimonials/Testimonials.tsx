import { Pause, Play } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { useInViewOnce } from '../intro/useScrollReveal'
import { COLUMNS, TESTIMONIALS, type Testimonial } from './testimonialData'
import { LOOP_COPIES } from './testimonialsMotion'
import { useCardReveal, useColumnCount, useLoopVisibility, useReducedMotion } from './useTestimonialsMotion'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties
const byId = new Map(TESTIMONIALS.map((testimonial) => [testimonial.id, testimonial]))

function TestimonialCard({ testimonial, copy }: { testimonial: Testimonial; copy: number }) {
  const { featured } = testimonial
  return (
    <figure
      data-reveal={testimonial.id}
      data-copy={copy}
      // Copies after the first only close the loop: hidden from assistive tech and focus.
      aria-hidden={copy > 0 || undefined}
      inert={copy > 0}
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
 * "Mobile 390", rev 2). A compact masonry of six real testimonials.
 *
 * Motion reproduces 21st.dev Testimonial V2 (inspected in its preview bundle):
 * each column is a list that moves up by one copy of its cards, linearly and
 * forever (15s / 19s / 17s), rendered several times so the loop is seamless,
 * inside a window with a 10% top/bottom fade. Here the window is as tall as the
 * approved composition, the loop starts from the Figma rest offsets, and it
 * pauses on hover, focus, the pause button (WCAG 2.2.2) and when off-screen.
 * Phones and reduced motion keep the static masonry. No CTA.
 */
export function Testimonials() {
  const { ref: headingRef, inView } = useInViewOnce<HTMLDivElement>()
  const columnCount = useColumnCount()
  const reducedMotion = useReducedMotion()
  const looping = columnCount > 1 && !reducedMotion
  const copies = looping ? LOOP_COPIES : 1
  const [paused, setPaused] = useState(false)
  const sectionRef = useLoopVisibility<HTMLElement>(looping)
  const gridRef = useCardReveal<HTMLDivElement>(`${columnCount}-${copies}`)

  return (
    <section
      ref={sectionRef}
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

        <div className="flex w-full flex-col items-center gap-8">
          <div
            ref={gridRef}
            data-columns={columnCount}
            data-looping={looping || undefined}
            data-paused={paused || undefined}
            className="testimonials-grid"
          >
            {COLUMNS[columnCount].map((column, index) => (
              <div key={`${columnCount}-${index}`} data-col={index} className="testimonials-column">
                <div className="testimonials-track" style={{ '--copies': copies } as CSSProperties}>
                  {Array.from({ length: copies }, (_, copy) =>
                    column.map((id) => {
                      const testimonial = byId.get(id)
                      return testimonial ? (
                        <TestimonialCard key={`${id}-${copy}`} testimonial={testimonial} copy={copy} />
                      ) : null
                    }),
                  )}
                </div>
              </div>
            ))}
          </div>

          {looping && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              className="group flex items-center gap-3 rounded-full text-text-secondary type-caption"
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-border-strong text-text-heading transition-colors duration-200 ease-settle group-hover:bg-action-primary-bg group-hover:text-action-primary-fg">
                {paused ? (
                  <Play aria-hidden="true" size={20} strokeWidth={1.5} />
                ) : (
                  <Pause aria-hidden="true" size={20} strokeWidth={1.5} />
                )}
              </span>
              {paused ? 'Retomar depoimentos' : 'Pausar depoimentos'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
