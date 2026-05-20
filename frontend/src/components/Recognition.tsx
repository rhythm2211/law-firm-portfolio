import { RECOGNITION } from '../data/siteData'

export function Recognition() {
  const items = [...RECOGNITION, ...RECOGNITION]
  return (
    <section className="bg-ink text-paper py-14 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 mb-8 flex items-center gap-4">
        <span className="text-[11px] tracking-[0.22em] uppercase text-paper/45">Recognition</span>
        <span className="flex-1 h-px bg-white/10" />
        <span className="text-[11px] tracking-[0.22em] uppercase text-paper/45">
          Independently ranked, 2020 – 2026
        </span>
      </div>
      <div className="relative">
        <div className="marquee">
          {items.map((label, i) => (
            <div key={i} className="flex items-center gap-4 text-paper/85 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] leading-none">
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
      </div>
    </section>
  )
}
