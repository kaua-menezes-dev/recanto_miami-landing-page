import type { ReactNode } from 'react'
import { ArrowUp, Mail, MapPin } from 'lucide-react'
import { venue, whatsapp } from '../../config/contact'
import { brand, sectionNav } from '../../config/site'
import { buildWhatsAppUrl, formatPhoneBR } from '../../lib/whatsapp'
import { ButtonLink } from '../ui/ButtonLink'
import { InstagramIcon } from '../ui/InstagramIcon'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

const chatHref = buildWhatsAppUrl(whatsapp.phone, '')
const NEW_TAB = ' (abre em uma nova aba)'

type ContactItemProps = {
  icon: ReactNode
  label: string
  value: ReactNode
  href?: string
  external?: boolean
}

/** Footer / Contact Item: gold icon, eyebrow label, value. The whole row is the link (≥48px). */
function ContactItem({ icon, label, value, href, external = false }: ContactItemProps) {
  const content = (
    <>
      <span className="shrink-0 text-gold">{icon}</span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-text-secondary type-eyebrow">{label}</span>
        <span className="break-words text-text-heading type-body-md underline-offset-4 decoration-gold group-hover:underline">
          {value}
        </span>
      </span>
      {external && <span className="sr-only">{NEW_TAB}</span>}
    </>
  )
  const classes = 'group flex min-h-12 gap-4 py-3'

  return href ? (
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </a>
  ) : (
    <div className={classes}>{content}</div>
  )
}

const iconButton =
  'flex size-13 items-center justify-center rounded-full border border-border-strong text-text-heading transition-colors duration-200 ease-settle hover:bg-action-secondary-bg-hover'

/**
 * Section 08 — Footer (Figma "Final / Desktop 1440", "Tablet 768", "Mobile 390").
 * Same Deep Night surface the final photo dissolves into, so the page ends in
 * one atmosphere: wordmark → anchor nav → contact row → utility bar.
 * Contact data comes from `config/contact.ts` (current site, pending owner
 * confirmation). Desktop: 4 contact columns and a three-zone bottom bar;
 * tablet: 2×2 grid; phones: stacked. Utility bars stack and centre below 1280px.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mode-evening bg-surface-base text-text-primary">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-5 pb-8 md:gap-12 md:px-10 md:pb-10 xl:gap-14 xl:px-20">
        <a href="#inicio" className="text-text-heading type-footer-wordmark" aria-label={`${brand.name} — voltar ao início`}>
          {brand.name}
        </a>

        <nav aria-label="Rodapé">
          <ul className="flex flex-col items-center gap-1 md:flex-row md:gap-6 xl:gap-10">
            {sectionNav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="group flex min-h-11 flex-col justify-center gap-1.5 py-3 text-text-primary type-nav">
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="h-px w-full bg-transparent transition-colors duration-200 ease-settle group-hover:bg-text-primary"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <hr className="w-full border-0 border-t border-border-subtle" />

        <address className="grid w-full gap-y-5 not-italic md:grid-cols-2 md:gap-x-6 md:gap-y-8 xl:grid-cols-4 xl:gap-6">
          <ContactItem
            icon={<WhatsAppIcon className="size-6" />}
            label="WhatsApp"
            value={formatPhoneBR(whatsapp.phone)}
            href={chatHref}
            external
          />
          <ContactItem
            icon={<InstagramIcon className="size-6" />}
            label="Instagram"
            value={venue.instagram.handle}
            href={venue.instagram.url}
            external
          />
          <ContactItem
            icon={<Mail aria-hidden="true" size={24} strokeWidth={1.5} />}
            label="E-mail"
            value={venue.email}
            href={`mailto:${venue.email}`}
          />
          <div className="flex flex-col items-start gap-2">
            <ContactItem
              icon={<MapPin aria-hidden="true" size={24} strokeWidth={1.5} />}
              label="Endereço"
              value={
                <>
                  <span className="block">{venue.address.street}</span>
                  <span className="block">{venue.address.locality}</span>
                </>
              }
            />
            <ButtonLink variant="text" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" showArrow>
              Abrir no mapa
              <span className="sr-only">{NEW_TAB}</span>
            </ButtonLink>
          </div>
        </address>

        <hr className="w-full border-0 border-t border-border-subtle" />

        <div className="flex w-full flex-col items-center gap-5 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-6">
          <ul className="flex gap-3 xl:justify-self-start" aria-label="Redes e contato">
            <li>
              <a href={venue.instagram.url} target="_blank" rel="noopener noreferrer" className={iconButton}>
                <InstagramIcon className="size-6" />
                <span className="sr-only">Instagram{NEW_TAB}</span>
              </a>
            </li>
            <li>
              <a href={chatHref} target="_blank" rel="noopener noreferrer" className={iconButton}>
                <WhatsAppIcon className="size-6" />
                <span className="sr-only">WhatsApp{NEW_TAB}</span>
              </a>
            </li>
          </ul>

          <a href="#inicio" className="flex min-h-11 items-center gap-1.5 text-text-secondary type-caption hover:text-text-primary">
            Voltar ao topo
            <ArrowUp aria-hidden="true" size={16} strokeWidth={1.5} />
          </a>

          <p className="text-center text-text-secondary type-caption xl:justify-self-end">
            © {year} {brand.name} · Casamentos &amp; Eventos
          </p>
        </div>
      </div>
    </footer>
  )
}
