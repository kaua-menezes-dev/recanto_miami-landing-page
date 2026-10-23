/**
 * WhatsApp conversion settings, isolated so the owner can confirm them in one place.
 *
 * Source: the current official site (https://recantomiami-eventos.vercel.app/),
 * which links to wa.me/5511989464713 with these pre-filled messages.
 * Status: pending owner confirmation (docs/content/content-audit.md).
 * Override the number per environment with VITE_WHATSAPP_PHONE.
 */
const DEFAULT_PHONE = '5511989464713'

export const whatsapp = {
  phone: import.meta.env.VITE_WHATSAPP_PHONE || DEFAULT_PHONE,
  messages: {
    /** Quote request — same wording as the current site's "orçamento" CTA. */
    quote: 'Olá! Vim pelo site e gostaria de um orçamento no Recanto Miami.',
    /** Visit request — same wording as the current site's "Agendar visita" CTA (Section 04 closing CTA, Section 08). */
    visit: 'Olá! Gostaria de agendar uma visita ao Recanto Miami.',
  },
} as const

/**
 * Venue contact details shown in the footer (Section 08).
 *
 * Source: the current official site's footer and links (read 2026-10-23).
 * Status: pending owner confirmation, like the WhatsApp number above.
 */
export const venue = {
  email: 'grupomiamieventos@gmail.com',
  instagram: {
    handle: '@recantomiami_eventos',
    url: 'https://www.instagram.com/recantomiami_eventos/',
  },
  address: {
    street: 'Av. Acapulco, 186',
    locality: 'Água Azul, Guarulhos - SP',
  },
  /** Google Maps directions, same destination as the current site. */
  mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Recanto Miami Eventos, Av. Acapulco 186, Água Azul, Guarulhos SP',
  )}`,
} as const
