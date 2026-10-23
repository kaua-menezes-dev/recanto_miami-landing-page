import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { EMPTY_INQUIRY, buildInquiryMessage, formatEventDate, validateInquiry, type Inquiry } from './inquiry'

const filled: Inquiry = {
  name: '  Mariana ',
  eventType: 'Casamento',
  date: '2027-08-15',
  dateUndecided: false,
  guests: '120 a 160',
  notes: 'Queremos cerimônia e festa no mesmo lugar.',
}

describe('validateInquiry', () => {
  it('requires name and event type only', () => {
    expect(validateInquiry(EMPTY_INQUIRY)).toEqual({
      name: expect.any(String),
      eventType: expect.any(String),
    })
    expect(validateInquiry({ ...EMPTY_INQUIRY, name: 'Ana', eventType: 'Aniversário' })).toEqual({})
  })

  it('treats a whitespace-only name as missing', () => {
    expect(validateInquiry({ ...filled, name: '   ' })).toHaveProperty('name')
  })
})

describe('formatEventDate', () => {
  it('writes the date out in Portuguese without shifting the day', () => {
    expect(formatEventDate('2027-08-15')).toBe('15 de agosto de 2027')
    expect(formatEventDate('2027-01-01')).toBe('1 de janeiro de 2027')
  })

  it('falls back to "a definir"', () => {
    expect(formatEventDate('')).toBe('a definir')
    expect(formatEventDate('15/08/2027')).toBe('a definir')
  })
})

describe('buildInquiryMessage', () => {
  it('follows the current site template', () => {
    expect(buildInquiryMessage(filled)).toBe(
      [
        'Olá! Sou Mariana e gostaria de um orçamento no Recanto Miami.',
        '',
        '• Evento: Casamento',
        '• Data: 15 de agosto de 2027',
        '• Convidados: 120 a 160',
        '',
        'Queremos cerimônia e festa no mesmo lugar.',
      ].join('\n'),
    )
  })

  it('uses "a definir" for an undecided date or guest count and omits empty notes', () => {
    const message = buildInquiryMessage({
      ...filled,
      date: '2027-08-15',
      dateUndecided: true,
      guests: 'Ainda não sei',
      notes: '   ',
    })
    expect(message).toContain('• Data: a definir')
    expect(message).toContain('• Convidados: a definir')
    expect(message.endsWith('• Convidados: a definir')).toBe(true)
  })

  it('encodes safely into a wa.me URL', () => {
    const url = buildWhatsAppUrl('5511989464713', buildInquiryMessage({ ...filled, notes: 'Café & doces? 100%' }))
    const text = new URL(url).searchParams.get('text')
    expect(url.startsWith('https://wa.me/5511989464713?text=')).toBe(true)
    expect(text).toContain('Café & doces? 100%')
    expect(text).toContain('\n• Evento: Casamento')
  })
})
