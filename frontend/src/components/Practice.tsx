import { useState } from 'react'
import { PRACTICE_AREAS, previewImageFor } from '../data/siteData'
import { SafeImg, SectionEyebrow } from './shared'

export function Practice() {
  const [active, setActive] = useState(0)
  const area = PRACTICE_AREAS[active]
  return (
    <section id="practice" className="bg-ink text-paper py-24 lg:py-32 relative overflow-hidden">
      <div className="spotlight" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <SectionEyebrow number="02" label="Practice" />
            <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-[-0.02em] max-w-[18ch]">
              Six practice groups, one bench.
            </h2>
          </div>
          <p className="max-w-[42ch] text-[15px] text-paper/65 leading-relaxed">
            Each group operates with deep sector knowledge and a shared culture of
            trial-ready advocacy. Matters cross groups by design — never by accident.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List */}
          <ol className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
            {PRACTICE_AREAS.map((p, i) => (
              <li key={p.code}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={
                    'practice-tile group w-full text-left py-6 lg:py-8 px-2 grid grid-cols-[auto_1fr_auto] gap-6 items-baseline ' +
                    (active === i ? 'text-paper' : 'text-paper/55 hover:text-paper')
                  }
                >
                  <span className="font-mono text-[11px] text-brand">{p.code}</span>
                  <div>
                    <div className="font-serif text-[clamp(1.4rem,2.4vw,2.1rem)] leading-tight">
                      {p.title}
                    </div>
                    <div
                      className={
                        'overflow-hidden transition-[max-height,opacity] duration-500 ' +
                        (active === i ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0')
                      }
                    >
                      <p className="text-[14px] text-paper/70 max-w-[58ch] leading-relaxed">
                        {p.long}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2.5 py-1 rounded-full border border-white/15 text-paper/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="pt-1 pt-arrow">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 16 L16 4 M7 4 H16 V13" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* Live preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-12 self-start">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-ink2">
              <SafeImg
                key={area.code}
                src={previewImageFor(area.code)}
                alt={area.title}
                className="kb-pan w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="text-[11px] tracking-[0.22em] uppercase text-gold mb-3">
                  {area.code} · Practice
                </div>
                <div className="font-serif text-[1.8rem] leading-tight">{area.title}</div>
                <p className="mt-3 text-[14px] text-paper/75 max-w-[40ch]">
                  {area.short}
                </p>
                <div className="mt-5 pt-5 border-t border-white/15 flex items-baseline gap-2">
                  <div className="stat-tick" />
                  <span className="font-mono text-[12px] text-paper/85">{area.metric}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
