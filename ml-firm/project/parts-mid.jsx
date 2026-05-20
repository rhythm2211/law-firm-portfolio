/* global React */

// ============ About / Philosophy ============
function About({ onBook }) {
  return (
    <section id="about" className="bg-paper relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grain" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionEyebrow number="01" label="The firm" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-10">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-[clamp(2rem,5vw,4.2rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              We were founded in 1987 on a single conviction:
              <em className="text-brand"> the best counsel is partner-led, every hour.</em>
            </h2>
            <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.7] text-ash">
              Four decades on, that has not changed. Every Meridian matter is run by a
              partner who is in the room — at the deposition, at the negotiation, at the
              hearing — not on a billing schedule. Our 62 lawyers across London, New York,
              and Singapore choose their matters carefully and represent fewer of them than
              our peers. The result is the calibre of judgement that wins the work that
              matters.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
              <Pillar number="01" title="Counsel-led" body="A partner runs every matter, end to end." />
              <Pillar number="02" title="Selective" body="We decline more work than we take." />
              <Pillar number="03" title="Discreet" body="Confidentiality is engineered into our process." />
            </div>

            <div className="mt-12">
              <button
                onClick={onBook}
                className="tr-btn group bg-ink hover:bg-ink2 text-paper pl-6 pr-2 py-2 rounded-full transition-colors"
              >
                <span className="tr-stack">
                  <span>Speak to a partner</span>
                  <span>Speak to a partner</span>
                </span>
                <span className="ml-2 h-8 w-8 rounded-full bg-brand grid place-items-center transition-transform duration-500 group-hover:-rotate-45">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-5 grid-rows-6 gap-3 h-[520px]">
            <div className="col-span-3 row-span-4 overflow-hidden rounded-2xl bg-ink2">
              <SafeImg src={window.LAW_IMG.lawLibrary} alt="Law library — leather-bound legal volumes" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl bg-ink2">
              <SafeImg src={window.LAW_IMG.gavelDesk} alt="Gavel on barrister's desk" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl bg-ink2">
              <SafeImg src={window.LAW_IMG.courthouse} alt="Courthouse façade" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl bg-ink2 relative">
              <SafeImg src={window.LAW_IMG.contractHandshake} alt="Closing-table handshake" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-paper text-[12px] tracking-[0.16em] uppercase">
                Closing room · 12 Bedford Sq.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({ number, title, body }) {
  return (
    <div className="max-w-[18ch]">
      <div className="font-mono text-[11px] text-brand mb-1">— {number}</div>
      <div className="font-serif text-[22px] text-ink leading-tight">{title}</div>
      <div className="mt-1 text-[13px] text-ash leading-relaxed">{body}</div>
    </div>
  );
}

function SectionEyebrow({ number, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[11px] text-brand">[ {number} ]</span>
      <span className="h-px w-10 bg-border" />
      <span className="text-[11px] tracking-[0.22em] uppercase text-ash">{label}</span>
    </div>
  );
}

// ============ Practice Areas ============
function Practice() {
  const [active, setActive] = useState(0);
  const area = window.PRACTICE_AREAS[active];
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
            {window.PRACTICE_AREAS.map((p, i) => (
              <li key={p.code}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={
                    "practice-tile group w-full text-left py-6 lg:py-8 px-2 grid grid-cols-[auto_1fr_auto] gap-6 items-baseline " +
                    (active === i ? "text-paper" : "text-paper/55 hover:text-paper")
                  }
                >
                  <span className="font-mono text-[11px] text-brand">{p.code}</span>
                  <div>
                    <div className="font-serif text-[clamp(1.4rem,2.4vw,2.1rem)] leading-tight">
                      {p.title}
                    </div>
                    <div
                      className={
                        "overflow-hidden transition-[max-height,opacity] duration-500 " +
                        (active === i ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0")
                      }
                    >
                      <p className="text-[14px] text-paper/70 max-w-[58ch] leading-relaxed">
                        {p.long}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-white/15 text-paper/70">
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
  );
}

function previewImageFor(code) {
  const map = {
    "01": window.LAW_IMG.judgeGavel,
    "02": window.LAW_IMG.contractHandshake,
    "03": window.LAW_IMG.lawBooks,
    "04": window.LAW_IMG.signingDocs,
    "05": window.LAW_IMG.lawLibrary,
    "06": window.LAW_IMG.courtBuilding,
  };
  return map[code];
}

// ============ Showcase Mosaic (static images, Ken Burns) ============
function Showcase() {
  const frames = [
    { src: window.LAW_IMG.gavelCloseup, label: "Litigation · Crown Court 4" },
    { src: window.LAW_IMG.signingDocs, label: "M&A · Closing 03:42" },
    { src: window.LAW_IMG.legalDesk, label: "Brief · Chambers" },
    { src: window.LAW_IMG.lawBooks, label: "Trial prep · Authority bundles" },
    { src: window.LAW_IMG.justiceStatue, label: "Royal Courts · Strand" },
  ];
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
                FRAME · {String(i + 1).padStart(2, "0")}/{String(frames.length).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SafeImg — universal fallback ============
function SafeImg({ src, alt = "", className = "", ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (e.currentTarget.src !== window.LAW_FALLBACK) {
          e.currentTarget.src = window.LAW_FALLBACK;
        }
      }}
      {...rest}
    />
  );
}

Object.assign(window, { About, Practice, Showcase, SectionEyebrow, SafeImg });
