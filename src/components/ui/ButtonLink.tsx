import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'secondary' | 'text'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant: Variant
  children: ReactNode
  showArrow?: boolean
}

const base =
  'group inline-flex items-center rounded-xs type-label transition-[background-color,border-color,gap] duration-200 ease-settle'

const variants: Record<Variant, string> = {
  // Button / Style=Secondary — 1px inside stroke + 16/32 padding in Figma (51px tall);
  // CSS borders sit outside the padding, so vertical padding is 15px.
  secondary:
    'gap-3 border border-action-secondary-fg px-8 py-[15px] text-action-secondary-fg hover:bg-action-secondary-bg-hover',
  // Button / Style=Text — inline link, gold underline, arrow nudges on hover.
  text: 'gap-3 border-b border-gold py-2 text-action-secondary-fg hover:gap-4 hover:border-action-secondary-fg',
}

/** Link styled as a Design System button (navigation, not form submission). */
export function ButtonLink({ variant, children, showArrow = false, className = '', ...rest }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {showArrow && <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} className="shrink-0" />}
    </a>
  )
}
