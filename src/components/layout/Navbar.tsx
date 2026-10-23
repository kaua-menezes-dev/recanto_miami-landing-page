import { useState } from 'react'
import { Menu } from 'lucide-react'
import { brand, sectionNav } from '../../config/site'
import { ButtonLink } from '../ui/ButtonLink'
import { MobileMenu } from './MobileMenu'

type NavbarProps = { quoteHref: string }

/**
 * Navbar / Theme=Over media (Evening mode), positioned over the hero film.
 * Desktop (≥1280): three zones — brand · links centred on the viewport · CTA.
 * The two outer grid tracks are equal (1fr), so the links sit on the true
 * centre line regardless of logo or CTA width.
 * Tablet/mobile: wordmark + "Menu" (44px target) opening the menu sheet.
 */
export function Navbar({ quoteHref }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="mode-evening nav-over-media absolute inset-x-0 top-0 z-20 enter-fade [--delay:100ms]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-20 xl:grid xl:h-22 xl:grid-cols-[1fr_auto_1fr] xl:gap-8">
        <a href="#inicio" className="justify-self-start text-text-heading type-wordmark" aria-label={`${brand.name} — início`}>
          {brand.name}
        </a>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {sectionNav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group flex flex-col gap-1.5 py-3 text-text-primary type-nav"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="h-px w-full bg-transparent transition-colors duration-200 ease-settle group-hover:bg-text-primary group-aria-[current=true]:bg-gold"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden justify-self-end xl:block">
          <ButtonLink variant="secondary" href={quoteHref} target="_blank" rel="noopener noreferrer">
            Solicitar orçamento
            <span className="sr-only"> pelo WhatsApp (abre em uma nova aba)</span>
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-1 flex min-h-11 items-center gap-2 py-2.5 pl-2.5 pr-1 text-text-heading type-label xl:hidden"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen(true)}
        >
          Menu
          <Menu aria-hidden="true" size={24} strokeWidth={1.5} />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} quoteHref={quoteHref} />
    </header>
  )
}
