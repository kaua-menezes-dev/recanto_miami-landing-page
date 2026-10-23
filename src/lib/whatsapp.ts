const PHONE_PATTERN = /^\d{10,15}$/

/** Normalises a phone number to the digits-only international format wa.me expects. */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

/**
 * Formats a Brazilian number for display: '5511989464713' → '(11) 98946-4713'.
 * Anything else falls back to '+<digits>' rather than guessing a format.
 */
export function formatPhoneBR(phone: string): string {
  const digits = normalizePhone(phone)
  const match = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(digits)
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : `+${digits}`
}

/**
 * Builds a click-to-chat URL that opens WhatsApp with an editable, pre-filled
 * message. Nothing is sent until the visitor confirms inside WhatsApp.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = normalizePhone(phone)
  if (!PHONE_PATTERN.test(digits)) {
    throw new Error('Invalid WhatsApp phone number: expected 10–15 digits in international format.')
  }
  const text = message.trim()
  return text
    ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${digits}`
}
