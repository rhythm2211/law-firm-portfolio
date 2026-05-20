import { INSIGHTS, LAWYERS, type Lawyer } from '../data/siteData'
import { SafeImg, SectionEyebrow } from './shared'

function LawyerCard({ lawyer, index }: { lawyer: Lawyer; index: number }) {
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
            P-{String(index + 1).padStart(2, '0')}
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
  )
}

export function People() {
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
          {LAWYERS.map((l, i) => (
            <LawyerCard key={l.id} lawyer={l} index={i} />
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-t border-border pt-8">
          <div className="text-[14px] text-ash max-w-[60ch]">
            All Meridian partners have practised at the bar or held senior in-house roles
            before joining. <span className="text-ink">Average 18 years' post-qualification experience.</span>
          </div>
          <button
            type="button"
            className="tr-btn group bg-ink hover:bg-ink2 text-paper pl-6 pr-2 py-2 rounded-full transition-colors"
          >
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
  )
}

export function Insights() {
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
          {INSIGHTS.map((post, i) => (
            <article
              key={i}
              className="insight bg-paper rounded-2xl overflow-hidden border border-border flex flex-col sm:flex-row"
            >
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
  )
}
