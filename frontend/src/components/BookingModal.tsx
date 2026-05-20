import { useEffect, useState, type ChangeEvent } from 'react'
import { PRACTICE_AREAS } from '../data/siteData'
import { createBooking, getAvailableSlots } from '../lib/api'
import { Field, formatDate, nextBusinessDay, MeridianMark } from './shared'

const DEFAULT_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']

type BookingModalProps = {
  open: boolean
  onClose: () => void
}

type BookingForm = {
  practice: string
  urgency: string
  date: string
  slot: string
  name: string
  company: string
  email: string
  brief: string
}

function defaultForm(): BookingForm {
  return {
    practice: PRACTICE_AREAS[0]?.title ?? 'Commercial Litigation',
    urgency: 'Within a week',
    date: nextBusinessDay(),
    slot: '10:00',
    name: '',
    company: '',
    email: '',
    brief: '',
  }
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<BookingForm>(defaultForm)
  const [slots, setSlots] = useState<string[]>(DEFAULT_SLOTS)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setSlotsLoading(true)
    void getAvailableSlots(form.date)
      .then((available) => {
        if (cancelled) return
        setSlots(available.length > 0 ? available : [])
        setForm((prev) => {
          if (available.includes(prev.slot)) return prev
          return { ...prev, slot: available[0] ?? '' }
        })
      })
      .catch(() => {
        if (!cancelled) setSlots(DEFAULT_SLOTS)
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [open, form.date])

  async function confirmBooking() {
    if (!form.name || !form.email || !form.slot) return
    setSubmitting(true)
    setError(null)
    const messageParts = [
      form.urgency ? `Urgency: ${form.urgency}` : '',
      form.company ? `Organisation: ${form.company}` : '',
      form.brief,
    ].filter(Boolean)

    try {
      await createBooking({
        name: form.name,
        email: form.email,
        practiceArea: form.practice,
        preferredDate: form.date,
        preferredTime: form.slot,
        message: messageParts.join('\n\n') || undefined,
      })
      setStep(3)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not complete booking')
    } finally {
      setSubmitting(false)
    }
  }

  function fieldChange<K extends keyof BookingForm>(key: K) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }
  }

  function reset() {
    setStep(1)
    setForm(defaultForm())
    setError(null)
    setSubmitting(false)
  }

  function handleClose() {
    reset()
    onClose()
  }

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={handleClose} role="presentation">
      <div
        className="modal-card w-full max-w-[760px] max-h-[90svh] bg-paper rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-[260px_1fr]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <aside className="bg-ink text-paper p-7 hidden md:flex flex-col">
          <div className="flex items-center gap-2">
            <MeridianMark className="h-7 w-7" />
            <span className="text-[13px] tracking-[0.04em]">
              MERIDIAN<span className="text-gold mx-1">·</span>LAW
            </span>
          </div>
          <div className="mt-10">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-gold mb-2">
              Initial consultation
            </div>
            <div id="booking-modal-title" className="font-serif text-[1.9rem] leading-tight">
              45 minutes with a partner.
            </div>
            <p className="mt-4 text-[13px] text-paper/65 leading-relaxed">
              Confidential. Conflicts-checked. No charge if we cannot help — written recommendation
              regardless.
            </p>
          </div>

          <ol className="mt-10 space-y-3 text-[12px]">
            {['Matter & timing', 'Your details', 'Confirm'].map((s, i) => (
              <li
                key={s}
                className={
                  'flex items-center gap-3 ' +
                  (i + 1 === step
                    ? 'text-paper'
                    : i + 1 < step
                      ? 'text-paper/60'
                      : 'text-paper/35')
                }
              >
                <span
                  className={
                    'h-6 w-6 grid place-items-center rounded-full text-[11px] border ' +
                    (i + 1 === step
                      ? 'bg-brand border-brand text-white'
                      : i + 1 < step
                        ? 'border-paper/40'
                        : 'border-paper/20')
                  }
                >
                  {i + 1 < step ? '✓' : i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>

          <div className="mt-auto pt-10 text-[11px] text-paper/45 leading-relaxed">
            Calls handled in confidence under SRA Code of Conduct. We never share your brief with third
            parties without consent.
          </div>
        </aside>

        <div className="flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between p-5 border-b border-border md:hidden">
            <span className="font-serif text-lg">Book consultation</span>
            <button type="button" onClick={handleClose} aria-label="Close" className="text-ash">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex justify-end p-4">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="text-ash hover:text-ink transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>

          <div className="px-7 pb-7 flex-1">
            {step === 1 && (
              <div>
                <h3 className="font-serif text-[1.7rem] text-ink leading-tight">
                  Tell us about the matter.
                </h3>
                <p className="mt-2 text-[13px] text-ash">
                  Anything you share is treated as privileged from this moment.
                </p>
                <div className="mt-6 space-y-5">
                  <Field label="Practice area">
                    <select value={form.practice} onChange={fieldChange('practice')} className="input">
                      {PRACTICE_AREAS.map((p) => (
                        <option key={p.code} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Urgency">
                    <div className="grid grid-cols-3 gap-2">
                      {['Today', 'Within a week', 'Exploratory'].map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, urgency: u }))}
                          className={
                            'rounded-full text-[12px] py-2 border transition-colors ' +
                            (form.urgency === u
                              ? 'bg-ink text-paper border-ink'
                              : 'bg-cream text-ink border-border hover:border-ink')
                          }
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Preferred date">
                    <input
                      type="date"
                      value={form.date}
                      onChange={fieldChange('date')}
                      className="input"
                    />
                  </Field>
                  <Field label="Time slot (GMT)">
                    {slotsLoading ? (
                      <p className="text-[13px] text-ash">Loading available times…</p>
                    ) : slots.length === 0 ? (
                      <p className="text-[13px] text-brand">
                        No slots left on this date — pick another day.
                      </p>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {slots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, slot: t }))}
                            className={
                              'rounded-md text-[12px] py-2 border transition-colors font-mono ' +
                              (form.slot === t
                                ? 'bg-brand text-white border-brand'
                                : 'bg-cream text-ink border-border hover:border-ink')
                            }
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!form.slot || slots.length === 0}
                    className="bg-ink hover:bg-ink2 disabled:bg-border disabled:text-ash text-paper text-[13px] px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors"
                  >
                    Continue
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-serif text-[1.7rem] text-ink leading-tight">Your details.</h3>
                <p className="mt-2 text-[13px] text-ash">
                  Conflicts-checked before the call. We will not disclose your enquiry to any current
                  client.
                </p>
                <div className="mt-6 space-y-5">
                  <Field label="Full name">
                    <input
                      value={form.name}
                      onChange={fieldChange('name')}
                      placeholder="Eleanor Whitmore"
                      className="input"
                    />
                  </Field>
                  <Field label="Company / organisation">
                    <input
                      value={form.company}
                      onChange={fieldChange('company')}
                      placeholder="Hartwell Capital"
                      className="input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      value={form.email}
                      onChange={fieldChange('email')}
                      type="email"
                      placeholder="you@firm.com"
                      className="input"
                    />
                  </Field>
                  <Field label="Brief summary (1–3 sentences)">
                    <textarea
                      value={form.brief}
                      onChange={fieldChange('brief')}
                      rows={4}
                      placeholder="Counterparty alleges breach of a 2023 SPA. We are preparing for emergency relief."
                      className="input resize-none"
                    />
                  </Field>
                </div>
                {error && (
                  <p className="mt-4 text-[13px] text-brand" role="alert">
                    {error}
                  </p>
                )}
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[13px] text-ash hover:text-ink transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => void confirmBooking()}
                    disabled={!form.name || !form.email || submitting}
                    className="bg-ink hover:bg-ink2 disabled:bg-border disabled:text-ash text-paper text-[13px] px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors"
                  >
                    {submitting ? 'Booking…' : 'Confirm booking'}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 text-brand px-3 py-1 text-[11px] tracking-[0.16em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" /> Consultation confirmed
                </div>
                <h3 className="mt-4 font-serif text-[2rem] text-ink leading-tight">
                  Thank you, {form.name.split(' ')[0] || '—'}.
                </h3>
                <p className="mt-2 text-[14px] text-ash max-w-[44ch]">
                  We have provisionally reserved a 45-minute consultation. A partner will reply within 24
                  hours to confirm conflicts and circulate the call details.
                </p>
                <dl className="mt-7 grid grid-cols-[120px_1fr] gap-y-3 text-[13px] border-t border-border pt-6">
                  <dt className="text-ash">Practice</dt>
                  <dd className="text-ink">{form.practice}</dd>
                  <dt className="text-ash">Urgency</dt>
                  <dd className="text-ink">{form.urgency}</dd>
                  <dt className="text-ash">When</dt>
                  <dd className="text-ink font-mono">
                    {formatDate(form.date)} · {form.slot} GMT
                  </dd>
                  <dt className="text-ash">For</dt>
                  <dd className="text-ink">
                    {form.name} — {form.company || '—'}
                  </dd>
                  <dt className="text-ash">Contact</dt>
                  <dd className="text-ink">{form.email}</dd>
                </dl>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-brand hover:bg-brandSoft text-white text-[13px] px-5 py-2.5 rounded-full"
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[13px] text-ash hover:text-ink transition-colors"
                  >
                    Book another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
