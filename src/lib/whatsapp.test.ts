import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl, formatPhoneBR, normalizePhone } from './whatsapp'

describe('normalizePhone', () => {
  it('keeps digits only', () => {
    expect(normalizePhone('+55 (11) 98946-4713')).toBe('5511989464713')
  })
})

describe('formatPhoneBR', () => {
  it('formats Brazilian mobile and landline numbers', () => {
    expect(formatPhoneBR('5511989464713')).toBe('(11) 98946-4713')
    expect(formatPhoneBR('551124681357')).toBe('(11) 2468-1357')
  })

  it('falls back to international digits for other countries', () => {
    expect(formatPhoneBR('14155550123')).toBe('+14155550123')
  })
})

describe('buildWhatsAppUrl', () => {
  it('encodes accents and punctuation in the pre-filled message', () => {
    const url = buildWhatsAppUrl('5511989464713', 'Olá! Vim pelo site e gostaria de um orçamento no Recanto Miami.')
    expect(url).toBe(
      'https://wa.me/5511989464713?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20um%20or%C3%A7amento%20no%20Recanto%20Miami.',
    )
  })

  it('encodes characters that would break the query string', () => {
    const url = buildWhatsAppUrl('5511989464713', 'A & B #1 ?x=1')
    expect(new URL(url).searchParams.get('text')).toBe('A & B #1 ?x=1')
  })

  it('omits the text parameter for an empty message', () => {
    expect(buildWhatsAppUrl('5511989464713', '   ')).toBe('https://wa.me/5511989464713')
  })

  it('rejects malformed numbers', () => {
    expect(() => buildWhatsAppUrl('123', 'Oi')).toThrow()
  })
})
