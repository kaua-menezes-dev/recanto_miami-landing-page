/**
 * Section 07 inquiry form: options and WhatsApp message.
 *
 * Fields, options and the message template mirror the current official site's
 * form (audited 2026-10-23, recorded in the Figma design notes for Section 07).
 * Only values the visitor provided are inserted; undecided date/guests read
 * "a definir", exactly as on the current site.
 */
export const EVENT_TYPES = [
  'Casamento',
  'Debutante (15 anos)',
  'Aniversário',
  'Evento corporativo',
  'Outro evento',
] as const

export const GUEST_RANGES = ['Ainda não sei', 'Até 80', '80 a 120', '120 a 160', '160 a 200', '200 a 250'] as const

export type EventType = (typeof EVENT_TYPES)[number]
export type GuestRange = (typeof GUEST_RANGES)[number]

export type Inquiry = {
  name: string
  eventType: EventType | ''
  /** ISO `yyyy-mm-dd` from the native date input, or '' when not chosen. */
  date: string
  dateUndecided: boolean
  guests: GuestRange | ''
  notes: string
}

export const EMPTY_INQUIRY: Inquiry = {
  name: '',
  eventType: '',
  date: '',
  dateUndecided: false,
  guests: '',
  notes: '',
}

export type InquiryErrors = Partial<Record<'name' | 'eventType', string>>

export const ERROR_MESSAGES = {
  name: 'Digite seu nome para personalizarmos a mensagem.',
  eventType: 'Escolha o tipo de evento para montarmos sua mensagem.',
} as const

/** Required: name and event type. Date, guests and notes stay optional. */
export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {}
  if (!inquiry.name.trim()) errors.name = ERROR_MESSAGES.name
  if (!inquiry.eventType) errors.eventType = ERROR_MESSAGES.eventType
  return errors
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/** "2027-08-15" → "15 de agosto de 2027"; anything else → "a definir". */
export function formatEventDate(iso: string): string {
  const match = ISO_DATE.exec(iso)
  if (!match) return 'a definir'
  const [, year, month, day] = match
  // Noon UTC keeps the calendar day stable in every time zone.
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12))
  if (Number.isNaN(date.getTime())) return 'a definir'
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function buildInquiryMessage(inquiry: Inquiry): string {
  const name = inquiry.name.trim()
  const notes = inquiry.notes.trim()
  const guests = inquiry.guests && inquiry.guests !== 'Ainda não sei' ? inquiry.guests : 'a definir'
  const lines = [
    `Olá! ${name ? `Sou ${name} e g` : 'G'}ostaria de um orçamento no Recanto Miami.`,
    '',
    `• Evento: ${inquiry.eventType || 'a definir'}`,
    `• Data: ${inquiry.dateUndecided ? 'a definir' : formatEventDate(inquiry.date)}`,
    `• Convidados: ${guests}`,
  ]
  if (notes) lines.push('', notes)
  return lines.join('\n')
}
