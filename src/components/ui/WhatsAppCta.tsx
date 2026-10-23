import { useId } from 'react'
import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'

type WhatsAppCtaProps = {
  /** Link mode: opens this wa.me URL. Omit it to render a form submit button (Section 07). */
  href?: string
  label: string
  /** Inline: helper line + arrow (hero). Floating: elevated, no helper (menu sheet). */
  context?: 'inline' | 'floating'
  /** Inline helper line; defaults to the generic wording. */
  helper?: string
  className?: string
}

const HELPER = 'A mensagem abre pronta no WhatsApp; nada é enviado sem você confirmar.'

/** Design System "WhatsApp CTA": the primary conversion action. */
export function WhatsAppCta({ href, label, context = 'inline', helper = HELPER, className = '' }: WhatsAppCtaProps) {
  const helperId = useId()
  const isInline = context === 'inline'
  const isSubmit = href === undefined

  const classes = `group inline-flex min-h-15 w-full items-center justify-center gap-3 rounded-xs bg-action-primary-bg px-7 py-4.5 text-action-primary-fg type-label transition-colors duration-200 ease-settle hover:bg-action-primary-bg-hover active:bg-action-primary-bg-pressed ${
    isInline ? '' : 'shadow-[0_8px_24px_rgb(23_43_36/0.14)]'
  }`
  const content = (
    <>
      <WhatsAppIcon className="size-6 shrink-0" />
      <span>{label}</span>
      {isInline && (
        <ArrowRight
          aria-hidden="true"
          size={20}
          strokeWidth={1.5}
          className={`shrink-0 ${isSubmit ? 'transition-transform duration-200 ease-settle group-hover:translate-x-1 motion-reduce:transition-none' : ''}`}
        />
      )}
      <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
    </>
  )

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {isSubmit ? (
        // Narrower side padding below 768px keeps the longer form label on one line on 360px phones.
        <button
          type="submit"
          aria-describedby={isInline ? helperId : undefined}
          className={`${classes} cursor-pointer max-md:px-4`}
        >
          {content}
        </button>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby={isInline ? helperId : undefined}
          className={classes}
        >
          {content}
        </a>
      )}
      {isInline && (
        <p id={helperId} className="type-caption text-text-secondary">
          {helper}
        </p>
      )}
    </div>
  )
}
