import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from 'react'
import { LAW_FALLBACK } from '../data/siteData'

export function MeridianMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="currentColor" className="text-paper/30" />
      <path
        d="M8 22 L13 10 L16 18 L19 10 L24 22"
        stroke="currentColor"
        className="text-paper"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="16" r="1.4" fill="currentColor" className="text-gold" />
    </svg>
  )
}

export function SectionEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[11px] text-brand">[ {number} ]</span>
      <span className="h-px w-10 bg-border" />
      <span className="text-[11px] tracking-[0.22em] uppercase text-ash">{label}</span>
    </div>
  )
}

export function SafeImg({
  src,
  alt = '',
  className = '',
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (e.currentTarget.src !== LAW_FALLBACK) {
          e.currentTarget.src = LAW_FALLBACK
        }
      }}
      {...rest}
    />
  )
}

export function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono text-paper/60">London · {time}</span>
}

const TZ_MAP: Record<string, string> = {
  GMT: 'Europe/London',
  EST: 'America/New_York',
  SGT: 'Asia/Singapore',
}

export function OfficeClock({ tz }: { tz: string }) {
  const [t, setT] = useState('--:--')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: TZ_MAP[tz] || 'UTC',
    })
    const tick = () => setT(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [tz])
  return (
    <span className="font-mono text-[12px] text-paper/65">
      {t} <span className="text-gold/70">{tz}</span>
    </span>
  )
}

export function Pillar({
  number,
  title,
  body,
}: {
  number: string
  title: string
  body: string
}) {
  return (
    <div className="max-w-[18ch]">
      <div className="font-mono text-[11px] text-brand mb-1">— {number}</div>
      <div className="font-serif text-[22px] text-ink leading-tight">{title}</div>
      <div className="mt-1 text-[13px] text-ash leading-relaxed">{body}</div>
    </div>
  )
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-xl p-4 bg-paper">
      <div className="font-serif text-[1.6rem] leading-none text-ink">{value}</div>
      <div className="mt-2 text-[10px] tracking-[0.16em] uppercase text-ash">{label}</div>
    </div>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.16em] uppercase text-ash mb-2">
        {label}
      </span>
      {children}
    </label>
  )
}

export function nextBusinessDay(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  if (d.getDay() === 6) d.setDate(d.getDate() + 2)
  if (d.getDay() === 0) d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}
