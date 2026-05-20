import { useState } from 'react'
import { CASES, TESTIMONIALS } from '../data/siteData'
import { SafeImg, SectionEyebrow, Stat } from './shared'

export function Cases() {
  const [activeId, setActiveId] = useState(CASES[0].id)
  const active = CASES.find((c) => c.id === activeId) ?? CASES[0]
  return (
    <section id="cases" className="bg-cream py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grain" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionEyebrow number="04" label="Selected matters" />
            <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-[-0.02em] text-ink max-w-[18ch]">
              The matters that decide quarters — and careers.
            </h2>
          </div>
          <p className="max-w-[42ch] text-[15px] text-ash leading-relaxed">
            Four representative engagements from the last 24 months. Client identities are
            redacted where confidentiality applies; outcomes are reported on the public record.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List */}
          <div className="lg:col-span-7">
            <ol className="divide-y divide-border border-t border-b border-border">
              {CASES.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(c.id)}
                    onClick={() => setActiveId(c.id)}
                    className={
                      'w-full text-left grid grid-cols-[auto_1fr_auto] gap-6 items-baseline py-6 lg:py-8 transition-colors ' +
                      (activeId === c.id ? 'text-ink' : 'text-ash hover:text-ink')
                    }
                  >
                    <span className="font-mono text-[11px] text-brand">
                      M-{String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex flex-wrap gap-3 mb-2 text-[11px] tracking-[0.16em] uppercase">
                        <span className="text-brand">{c.category}</span>
                        <span>·</span>
                        <span>{c.year}</span>
                        <span>·</span>
                        <span>{c.duration}</span>
                      </div>
                      <h3 className="font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight text-ink">
                        {c.headline}
                      </h3>
                      <div
                        className={
                          'overflow-hidden transition-[max-height,opacity] duration-500 ' +
                          (activeId === c.id
                            ? 'max-h-96 opacity-100 mt-4'
                            : 'max-h-0 opacity-0')
                        }
                      >
                        <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
                          <div className="text-[14px] leading-relaxed text-ash max-w-[58ch]">
                            <p>{c.summary}</p>
                            <p className="mt-3 text-ink">
                              <span className="text-brand font-medium">Outcome.</span>{' '}
                              {c.outcome}
                            </p>
                            <p className="mt-3 text-[12px] tracking-[0.12em] uppercase text-ash">
                              Client · {c.client}
                            </p>
                          </div>
                          <div className="bg-ink text-paper rounded-xl px-5 py-4 text-right shrink-0">
                            <div className="font-serif text-[2rem] leading-none">
                              {c.stat.value}
                            </div>
                            <div className="text-[10px] tracking-[0.16em] uppercase mt-2 text-paper/60">
                              {c.stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="pt-1">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M4 14 L14 4 M6 4 H14 V12"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Media preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-12 self-start">
            <div className="case-card relative overflow-hidden rounded-2xl aspect-[4/5] bg-ink">
              <SafeImg
                key={active.id}
                src={active.poster}
                alt={active.headline}
                className="kb-pan w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-paper">
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-gold mb-2">
                  Matter file · {active.year}
                </div>
                <div className="font-serif text-[1.7rem] leading-tight">
                  {active.headline}
                </div>
                <div className="mt-4 flex items-center gap-3 text-[12px] text-paper/70">
                  <span className="h-1 w-1 rounded-full bg-brand" />
                  <span>{active.category}</span>
                  <span>·</span>
                  <span>{active.duration}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-white/70 bg-black/30 backdrop-blur rounded px-2 py-1">
                ON RECORD
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Stat label="Disputed value resolved, 2025" value="£1.2B+" />
              <Stat label="Trial advocacy hours" value="14,200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Methodology() {
  const steps = [
    {
      n: '01',
      title: 'Brief',
      body:
        'A partner takes the call. We listen, we map the matter, and we tell you within 48 hours whether we can win.',
    },
    {
      n: '02',
      title: 'Strategy',
      body:
        'A bespoke team is built around the matter. We commit to a written theory of the case before the first invoice.',
    },
    {
      n: '03',
      title: 'Execution',
      body:
        "We move at the pace the matter demands. You receive a weekly partner-signed status — never an AI summary.",
    },
    {
      n: '04',
      title: 'Resolution',
      body:
        'Trial, settlement, or close — we deliver the outcome we promised, or we explain in person why the picture changed.',
    },
  ]
  return (
    <section className="bg-paper py-24 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <SectionEyebrow number="05" label="Method" />
            <h2 className="mt-6 font-serif text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.04] tracking-[-0.02em] text-ink">
              How a matter moves through Meridian.
            </h2>
            <p className="mt-6 text-[15px] text-ash leading-relaxed max-w-[40ch]">
              Predictable, written, partner-led. Our clients say the surprise — given the
              calibre — is the transparency.
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {steps.map((s) => (
              <li key={s.n} className="bg-paper p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[11px] text-brand">{s.n}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="font-serif text-[1.6rem] text-ink">{s.title}</div>
                <p className="mt-3 text-[14px] text-ash leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const [i, setI] = useState(0)
  const t = TESTIMONIALS[i]
  return (
    <section className="bg-ink text-paper py-24 lg:py-32 relative overflow-hidden">
      <div className="spotlight" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionEyebrow number="06" label="In their words" />
        <blockquote className="mt-12 max-w-[36ch] mx-auto md:max-w-[80ch] md:mx-0">
          <div className="font-serif text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.18] tracking-[-0.01em]">
            <span className="text-brand">"</span>
            {t.quote}
            <span className="text-brand">"</span>
          </div>
          <footer className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-6">
            <div>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-gold">
                Verified client
              </div>
              <div className="mt-2 text-[15px] text-paper">{t.name}</div>
              <div className="text-[13px] text-paper/55">{t.org}</div>
            </div>
            <div className="flex items-center gap-3">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setI(idx)}
                  className={
                    'h-1.5 rounded-full transition-all ' +
                    (i === idx ? 'w-10 bg-brand' : 'w-5 bg-white/20 hover:bg-white/40')
                  }
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
