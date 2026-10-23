import { useEffect, useId, useRef, useState, type FormEvent, type Ref } from 'react'
import { AlertCircle, Check } from 'lucide-react'
import { WhatsAppCta } from '../../components/ui/WhatsAppCta'
import { whatsapp } from '../../config/contact'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import {
  EMPTY_INQUIRY,
  EVENT_TYPES,
  GUEST_RANGES,
  buildInquiryMessage,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from './inquiry'

const STORAGE_KEY = 'recanto-miami:inquiry'
const OPENING_MS = 1200

/** Draft values are kept for the visit only (sessionStorage); nothing leaves the browser. */
function readDraft(): Inquiry {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_INQUIRY
    const draft = { ...EMPTY_INQUIRY, ...(JSON.parse(raw) as Partial<Inquiry>) }
    return {
      name: String(draft.name),
      eventType: (EVENT_TYPES as readonly string[]).includes(draft.eventType) ? draft.eventType : '',
      date: String(draft.date),
      dateUndecided: draft.dateUndecided === true,
      guests: (GUEST_RANGES as readonly string[]).includes(draft.guests) ? draft.guests : '',
      notes: String(draft.notes),
    }
  } catch {
    return EMPTY_INQUIRY
  }
}

function todayIso() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

type ChipGroupProps<T extends string> = {
  legend: string
  name: string
  options: readonly T[]
  value: T | ''
  onChange: (value: T) => void
  required?: boolean
  error?: string
  firstRef?: Ref<HTMLInputElement>
}

/** Design System "Choice Chip" set as a native radio group (arrow keys move, Space selects). */
function ChipGroup<T extends string>({ legend, name, options, value, onChange, required, error, firstRef }: ChipGroupProps<T>) {
  const errorId = useId()
  return (
    <fieldset className="min-w-0" aria-describedby={error ? errorId : undefined}>
      <legend className="mb-3 text-text-primary type-field-label">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option, index) => (
          <label key={option} className="plan-chip">
            <input
              ref={index === 0 ? firstRef : undefined}
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={required}
              aria-invalid={error ? true : undefined}
              className="sr-only"
            />
            <Check aria-hidden="true" size={18} strokeWidth={1.5} className="plan-chip-check" />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-3 flex items-center gap-2 text-clay type-caption">
          <AlertCircle aria-hidden="true" size={16} strokeWidth={1.5} className="shrink-0" />
          {error}
        </p>
      )}
    </fieldset>
  )
}

/**
 * Section 07 inquiry form (Figma component "Plan / Inquiry Form").
 *
 * Validation runs on submit, then live once the visitor has tried to send (or
 * has touched the name field). A valid submit builds the message from the
 * current site's template and opens wa.me in a new tab or the app. Opening
 * WhatsApp is not sending: the status line only says the message is ready.
 */
export function InquiryForm() {
  const ids = { name: useId(), nameError: useId(), date: useId(), notes: useId() }
  const [values, setValues] = useState<Inquiry>(readDraft)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [nameTouched, setNameTouched] = useState(false)
  const [opening, setOpening] = useState(false)
  const [openedUrl, setOpenedUrl] = useState<string | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const eventTypeRef = useRef<HTMLInputElement>(null)
  const openingTimer = useRef(0)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values))
    } catch {
      // Storage can be unavailable (private mode); the form still works.
    }
  }, [values])

  useEffect(() => () => window.clearTimeout(openingTimer.current), [])

  const update = (patch: Partial<Inquiry>) => {
    const next = { ...values, ...patch }
    setValues(next)
    setOpenedUrl(null)
    if (attempted) setErrors(validateInquiry(next))
    else if (nameTouched && 'name' in patch) setErrors((current) => ({ ...current, name: validateInquiry(next).name }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateInquiry(values)
    setAttempted(true)
    setErrors(found)
    if (found.name) {
      nameRef.current?.focus()
      return
    }
    if (found.eventType) {
      eventTypeRef.current?.focus()
      return
    }

    const url = buildWhatsAppUrl(whatsapp.phone, buildInquiryMessage(values))
    window.open(url, '_blank', 'noopener,noreferrer')
    setOpenedUrl(url)
    setOpening(true)
    window.clearTimeout(openingTimer.current)
    openingTimer.current = window.setTimeout(() => setOpening(false), OPENING_MS)
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Planeje seu evento" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label htmlFor={ids.name} className="text-text-heading type-field-label">
          Seu nome
        </label>
        <div className="relative">
          <input
            ref={nameRef}
            id={ids.name}
            type="text"
            name="name"
            autoComplete="given-name"
            placeholder="Como podemos te chamar?"
            required
            value={values.name}
            onChange={(event) => update({ name: event.target.value })}
            onBlur={() => {
              if (nameTouched || attempted) setErrors((current) => ({ ...current, name: validateInquiry(values).name }))
            }}
            onInput={() => setNameTouched(true)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? ids.nameError : undefined}
            className={`plan-field ${errors.name ? 'pr-12' : ''}`}
          />
          {errors.name && (
            <AlertCircle
              aria-hidden="true"
              size={20}
              strokeWidth={1.5}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-clay"
            />
          )}
        </div>
        {errors.name && (
          <p id={ids.nameError} className="text-clay type-caption">
            {errors.name}
          </p>
        )}
      </div>

      <ChipGroup
        legend="Tipo de evento"
        name="eventType"
        options={EVENT_TYPES}
        value={values.eventType}
        onChange={(eventType) => update({ eventType })}
        required
        error={errors.eventType}
        firstRef={eventTypeRef}
      />

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-[260px] flex-1 flex-col gap-2">
          <label htmlFor={ids.date} className="text-text-heading type-field-label">
            Data desejada
          </label>
          {values.dateUndecided ? (
            <input id={ids.date} type="text" value="A definir" disabled className="plan-field" />
          ) : (
            <input
              id={ids.date}
              type="date"
              name="date"
              min={todayIso()}
              value={values.date}
              onChange={(event) => update({ date: event.target.value })}
              className={`plan-field ${values.date ? '' : 'is-empty'}`}
            />
          )}
        </div>
        <button
          type="button"
          aria-pressed={values.dateUndecided}
          onClick={() => update({ dateUndecided: !values.dateUndecided, date: '' })}
          className="plan-chip h-13"
        >
          <Check aria-hidden="true" size={18} strokeWidth={1.5} className="plan-chip-check" />
          <span>Ainda não tenho data</span>
        </button>
      </div>

      <ChipGroup
        legend="Número de convidados"
        name="guests"
        options={GUEST_RANGES}
        value={values.guests}
        onChange={(guests) => update({ guests })}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor={ids.notes} className="text-text-heading type-field-label">
          Conte um pouco mais sobre seu evento{' '}
          <span className="font-normal text-text-secondary">(opcional)</span>
        </label>
        <textarea
          id={ids.notes}
          name="notes"
          rows={3}
          placeholder="Cerimônia no local, estilo da festa, cardápio, dúvidas…"
          value={values.notes}
          onChange={(event) => update({ notes: event.target.value })}
          className="plan-field plan-textarea"
        />
      </div>

      <div className="flex flex-col">
        <WhatsAppCta label={opening ? 'Abrindo o WhatsApp…' : 'Conversar sobre meu evento'} className="w-full md:w-[420px]" />
        {/* Always mounted so screen readers announce the update politely. */}
        <p role="status" className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-text-heading type-body-sm ${openedUrl ? 'mt-8' : ''}`}>
          {openedUrl && (
            <>
              <Check aria-hidden="true" size={16} strokeWidth={1.5} className="shrink-0" />
              <span>Abrimos o WhatsApp com sua mensagem pronta — é só revisar e enviar.</span>
              <a href={openedUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                Não abriu? Tentar novamente
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  )
}
