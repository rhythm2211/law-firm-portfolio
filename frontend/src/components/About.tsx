import { LAW_IMG } from '../data/siteData'
import { Pillar, SafeImg, SectionEyebrow } from './shared'

export function About({ onBook }: { onBook: () => void }) {
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
              <Pillar
                number="03"
                title="Discreet"
                body="Confidentiality is engineered into our process."
              />
            </div>

            <div className="mt-12">
              <button
                type="button"
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
              <SafeImg
                src={LAW_IMG.lawLibrary}
                alt="Law library — leather-bound legal volumes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl bg-ink2">
              <SafeImg
                src={LAW_IMG.gavelDesk}
                alt="Gavel on barrister's desk"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl bg-ink2">
              <SafeImg
                src={LAW_IMG.courthouse}
                alt="Courthouse façade"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl bg-ink2 relative">
              <SafeImg
                src={LAW_IMG.contractHandshake}
                alt="Closing-table handshake"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-paper text-[12px] tracking-[0.16em] uppercase">
                Closing room · 12 Bedford Sq.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
