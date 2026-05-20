import { LiveClock } from './shared'

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper text-[11px] tracking-[0.18em] uppercase">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-6 py-2">
        <span className="text-gold/90">Chambers UK 2026 · Band 1 in Commercial Litigation</span>
        <div className="hidden md:flex items-center gap-6 text-paper/70">
          <span>London · New York · Singapore</span>
          <LiveClock />
        </div>
      </div>
    </div>
  )
}
