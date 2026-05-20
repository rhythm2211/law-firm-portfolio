import { LAW_IMG } from '../data/siteData'
import { SafeImg, SectionEyebrow } from './shared'

export function Showcase() {
  const frames = [
    { src: LAW_IMG.gavelCloseup, label: 'Litigation · Crown Court 4' },
    { src: LAW_IMG.signingDocs, label: 'M&A · Closing 03:42' },
    { src: LAW_IMG.legalDesk, label: 'Brief · Chambers' },
    { src: LAW_IMG.lawBooks, label: 'Trial prep · Authority bundles' },
    { src: LAW_IMG.justiceStatue, label: 'Royal Courts · Strand' },
  ]
  return (
    <section className="bg-paper py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionEyebrow number="03" label="Inside the firm" />
            <h2 className="mt-6 font-serif text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.04] tracking-[-0.02em] text-ink max-w-[22ch]">
              The work doesn't happen in brochures. <em>Hover any frame.</em>
            </h2>
          </div>
          <p className="max-w-[36ch] text-[14px] text-ash leading-relaxed">
            A glimpse of the rooms where our partners spend their days — trial preparation,
            closing tables, and chambers from Holborn to Hong Kong.
          </p>
        </div>

        <div className="flex gap-3 h-[440px]">
          {frames.map((f, i) => (
            <div key={i} className="frame bg-ink2 group">
              <SafeImg
                src={f.src}
                alt={f.label}
                className="kb-pan w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
              <div className="absolute top-3 left-3 text-[11px] tracking-[0.16em] uppercase text-white/90 bg-black/30 backdrop-blur rounded-full px-2.5 py-1">
                {f.label}
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/70 bg-black/40 rounded px-1.5 py-0.5">
                FRAME · {String(i + 1).padStart(2, '0')}/{String(frames.length).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
