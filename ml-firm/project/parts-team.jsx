/* global React */

// ============ Lawyers / People ============
function People() {
  return (
    <section id="people" className="bg-paper py-24 lg:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionEyebrow number="07" label="People" />
            <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-[-0.02em] text-ink max-w-[20ch]">
              The partners on the matter <em>are</em> the partners in the brochure.
            </h2>
          </div>
          <p className="max-w-[36ch] text-[14px] text-ash leading-relaxed">
            Six profiles below. The fuller bench — including counsel, associates, and our
            non-legal subject-matter experts — is available on request.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {window.LAWYERS.map((l, i) => (
            <LawyerCard key={l.id} lawyer={l} index={i} />
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-t border-border pt-8">
          <div className="text-[14px] text-ash max-w-[60ch]">
            All Meridian partners have practised at the bar or held senior in-house roles
            before joining. <span className="text-ink">Average 18 years' post-qualification experience.</span>
          </div>
          <button className="tr-btn group bg-ink hover:bg-ink2 text-paper pl-6 pr-2 py-2 rounded-full transition-colors">
            <span className="tr-stack">
              <span>See the full bench</span>
              <span>See the full bench</span>
            </span>
            <span className="ml-2 h-8 w-8 rounded-full bg-brand grid place-items-center transition-transform duration-500 group-hover:-rotate-45">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function LawyerCard({ lawyer, index }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-cream border border-border">
      <div className="aspect-[4/5] overflow-hidden bg-ink2">
        <img
          src={lawyer.image}
          alt={lawyer.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-[1.5rem] leading-tight text-ink">
            {lawyer.name}
            {lawyer.rank && (
              <span className="text-brand text-[1rem] ml-2">{lawyer.rank}</span>
            )}
          </h3>
          <span className="font-mono text-[10px] text-ash">
            P-{String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="text-[12px] tracking-[0.12em] uppercase text-brand mt-1">
          {lawyer.title}
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-ash">
          {lawyer.bio}
        </p>
        <dl className="mt-5 pt-5 border-t border-border text-[12px] grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
          <dt className="text-ash">Education</dt>
          <dd className="text-ink">{lawyer.education}</dd>
          <dt className="text-ash">Bar</dt>
          <dd className="text-ink">{lawyer.bar}</dd>
        </dl>
      </div>
    </article>
  );
}

// ============ Insights ============
function Insights() {
  return (
    <section id="insights" className="bg-cream py-24 lg:py-32 relative">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionEyebrow number="08" label="Insights" />
            <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.04] tracking-[-0.02em] text-ink max-w-[20ch]">
              Writing the cases before they happen.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14px] text-ash leading-relaxed">
            Partner-authored briefings, case notes, and commentary on the questions that
            will reach our clients' boards in the next twelve months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {window.INSIGHTS.map((post, i) => (
            <article key={i} className="insight bg-paper rounded-2xl overflow-hidden border border-border flex flex-col sm:flex-row">
              <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-ink2">
                <SafeImg src={post.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col">
                <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] uppercase">
                  <span className="text-brand">{post.tag}</span>
                  <span className="text-ash">{post.date}</span>
                </div>
                <h3 className="mt-3 font-serif text-[1.35rem] leading-[1.18] text-ink">
                  {post.title}
                </h3>
                <div className="mt-auto pt-5 flex items-center justify-between">
                  <span className="text-[12px] text-ash">{post.minutes}</span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-ink">
                    Read brief
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ Contact / Footer ============
function ContactFooter({ onBook, onChat }) {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <SafeImg src={window.LAW_IMG.cityNight} alt="" className="w-full h-full object-cover" />
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
            {window.OFFICES.map((o, i) => (
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
                  Office {String(i + 1).padStart(2, "0")} · Open
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
            <a href="#" className="nav-link">Diversity &amp; inclusion</a>
            <a href="#" className="nav-link">Pro bono</a>
            <a href="#" className="nav-link">Privacy</a>
            <a href="#" className="nav-link">Terms</a>
          </div>
        </div>

        <div className="mt-6 text-[10px] tracking-[0.18em] uppercase text-paper/35">
          © 1987 — 2026 Meridian Law Partners LLP. This is a demonstration site.
          No solicitor-client relationship is formed by viewing this page.
        </div>
      </div>
    </footer>
  );
}

function OfficeClock({ tz }) {
  const tzMap = { GMT: "Europe/London", EST: "America/New_York", SGT: "Asia/Singapore" };
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: tzMap[tz] || "UTC",
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [tz]);
  return (
    <span className="font-mono text-[12px] text-paper/65">
      {t} <span className="text-gold/70">{tz}</span>
    </span>
  );
}

Object.assign(window, { People, Insights, ContactFooter });
