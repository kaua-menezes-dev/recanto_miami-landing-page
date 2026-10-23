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
    /** Visit request — same wording as the current site's "Agendar visita" CTA (Section 04 closing CTA). */
    visit: 'Olá! Gostaria de agendar uma visita ao Recanto Miami.',
  },
} as const
