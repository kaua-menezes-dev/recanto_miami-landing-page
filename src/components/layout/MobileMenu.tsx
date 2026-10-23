import { useEffect, useRef } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { brand, sectionNav } from '../../config/site'
import { WhatsAppCta } from '../ui/WhatsAppCta'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  quoteHref: string
}

/**
 * Menu Sheet / Mobile (Evening mode). Native modal <dialog>: the page behind
 * is inert, Esc closes it and focus returns to the "Menu" button.
 * Opens with a 360ms fade + 12px rise; instant under reduced motion.
 */
export function MobileMenu({ open, onClose, quoteHref }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      id="menu-principal"
      aria-label="Menu"
      onClose={onClose}
      className="mode-evening m-0 h-dvh max-h-none w-full max-w-none bg-surface-base p-0 text-text-primary backdrop:bg-night/60 xl:hidden"
    >
      <div className="sheet-enter flex min-h-full flex-col gap-4 px-5 pb-8 pt-3 md:px-10 lg:px-20">
        <div className="flex items-center justify-between">
          <span className="text-text-heading type-wordmark">{brand.name}</span>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 flex min-h-11 items-center gap-2 py-2.5 pl-2.5 pr-1 text-text-heading type-label"
          >
            Fechar
            <X aria-hidden="true" size={24} strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Menu principal" className="pt-14">
          <ul className="flex flex-col gap-1">
            {sectionNav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between border-b border-border-subtle py-3.5 text-text-heading type-menu-link"
                >
                  {item.label}
                  <ArrowRight aria-hidden="true" size={24} strokeWidth={1.5} className="text-gold" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <WhatsAppCta href={quoteHref} label="Pedir orçamento no WhatsApp" context="floating" className="mt-auto" />
      </div>
    </dialog>
  )
}
