import { LAW_IMG, OFFICES } from '../data/siteData'
import { MeridianMark, OfficeClock, SafeImg, SectionEyebrow } from './shared'

export function ContactFooter({
  onBook,
  onChat,
}: {
  onBook: () => void
  onChat: () => void
}) {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <SafeImg src={LAW_IMG.cityNight} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/40" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 pt-24 lg:pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14">
          {/* CTA block */}
          <div>
            <SectionEyebrow number="09" label="Engage Meridian" />
            <h2 className="mt-6 font-serif text-[clamp(2.2rem,6vw,5rem)] leading-[0.98] tracking-[-0.02em] max-w-[14ch]">
              If the matter is on your desk, it is already on ours.
            </h2>
            <p className="mt-8 max-w-[52ch] text-[16px] text-paper/75 leading-relaxed">
              Tell us the brief in confidence. A partner will reply within 24 hours with an
              initial view on strategy, fit, and conflicts — at no charge.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onBook}
                className="tr-btn group bg-brand hover:bg-brandSoft text-white pl-6 pr-2 py-2 rounded-full transition-colors"
              >
                <span className="tr-stack">
                  <span>Book a consultation</span>
                  <span>Book a consultation</span>
                </span>
                <span className="ml-2 h-8 w-8 rounded-full bg-white grid place-items-center transition-transform duration-500 group-hover:-rotate-45">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="#C8531D" strokeWidth="1.6" />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                onClick={onChat}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:border-white/30 px-5 py-3 rounded-full transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[13px]">Speak to duty counsel now</span>
              </button>
            </div>
          </div>

          {/* Offices */}
          <div className="grid gap-6">
            {OFFICES.map((o, i) => (
              <div key={o.city} className="border border-white/10 bg-white/[0.03] rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="font-serif text-[1.5rem]">{o.city}</div>
                  <OfficeClock tz={o.tz} />
                </div>
                <div className="mt-3 text-[13px] text-paper/65 leading-relaxed">
                  {o.address}
                </div>
                <div className="mt-4 text-[11px] tracking-[0.18em] uppercase text-gold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Office {String(i + 1).padStart(2, '0')} · Open
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="my-16 h-px bg-white/10" />

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
          <div className="flex items-center gap-3">
            <MeridianMark className="h-10 w-10" />
            <div>
              <div className="font-serif text-[1.5rem]">Meridian Law Partners LLP</div>
              <div className="text-[12px] text-paper/55">
                Authorised &amp; regulated by the Solicitors Regulation Authority · SRA 612847
              </div>
            </div>
          </div>
          <div className="text-[12px] text-paper/55 grid grid-cols-2 md:flex md:items-center gap-x-8 gap-y-2">
            <a href="#" className="nav-link">
              Diversity &amp; inclusion
            </a>
            <a href="#" className="nav-link">
              Pro bono
            </a>
            <a href="#" className="nav-link">
              Privacy
            </a>
            <a href="#" className="nav-link">
              Terms
            </a>
          </div>
        </div>

        <div className="mt-6 text-[10px] tracking-[0.18em] uppercase text-paper/35">
          © 1987 — 2026 Meridian Law Partners LLP. This is a demonstration site.
          No solicitor-client relationship is formed by viewing this page.
        </div>
      </div>
    </footer>
  )
}
