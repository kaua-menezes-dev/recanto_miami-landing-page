const PHONE_PATTERN = /^\d{10,15}$/

/** Normalises a phone number to the digits-only international format wa.me expects. */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
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
