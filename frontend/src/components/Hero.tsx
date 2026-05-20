import { LAW_IMG, STATS } from '../data/siteData'
import { MeridianMark, SafeImg } from './shared'

interface NavProps {
  onBook: () => void
  onChat: () => void
}

function Navbar({ onBook, onChat }: NavProps) {
  const links = [
    ['Practice', '#practice'],
    ['Cases', '#cases'],
    ['People', '#people'],
    ['Insights', '#insights'],
    ['About', '#about'],
  ] as const

  return (
    <nav className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-6 py-6 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5">
          <MeridianMark />
          <span className="text-paper text-[15px] tracking-[0.04em]">
            MERIDIAN<span className="text-gold mx-1">·</span>LAW
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-9 text-[13px] text-paper/85">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} className="nav-link">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onChat}
            className="hidden md:inline-flex items-center gap-2 text-paper/85 text-[13px] nav-link"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Ask counsel
          </button>
          <button
            type="button"
            onClick={onBook}
            className="inline-flex items-center gap-2 bg-brand hover:bg-brandSoft text-white text-[13px] px-4 py-2 rounded-full transition-colors"
          >
            Book consultation
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export function Hero({ onBook, onChat }: NavProps) {
  return (
    <section id="top" className="relative min-h-[100svh] text-paper overflow-hidden">
      <div className="absolute inset-0 hero-wash" />
      <div className="hero-glow-a" />
      <div className="hero-glow-b" />
      <div className="absolute inset-0 grain" />

      <SafeImg
        src={LAW_IMG.courthouseColumns}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.18] mix-blend-luminosity kb-pan"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />

      <Navbar onBook={onBook} onChat={onChat} />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 pt-32 lg:pt-40 pb-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-10 bg-gold" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-gold">
            Est. 1987 · A counsel-led firm
          </span>
        </div>

        <h1 className="font-serif text-[clamp(2.6rem,8.4vw,7.5rem)] leading-[0.95] tracking-[-0.02em] max-w-[18ch]">
          Strategic counsel
          <br />
          for matters that <em className="text-gold">cannot</em> be lost.
        </h1>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
          <p className="text-[17px] leading-relaxed text-paper/75 max-w-[52ch]">
            Meridian is a 62-lawyer disputes-and-corporate firm advising listed companies,
            private capital, and ultra-high-net-worth families on the matters that decide
            the next decade of their business. We don&apos;t take the work we cannot win.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
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
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 hover:border-white/30 text-paper px-5 py-3 rounded-full transition-colors"
            >
              <span className="relative flex">
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-gold animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="text-[13px]">Ask the AI duty counsel</span>
              <span className="text-[10px] font-mono text-paper/60 border border-white/15 rounded px-1.5 py-[1px]">
                24/7
              </span>
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-none text-paper">
                {s.value}
              </div>
              <div className="mt-2 text-[12px] text-paper/55 uppercase tracking-[0.14em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.22em] uppercase text-paper/45 flex flex-col items-center gap-2">
        <span>Scroll</span>
        <span className="block h-8 w-px bg-paper/30" />
      </div>
    </section>
  )
}
