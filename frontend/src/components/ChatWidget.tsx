import { useEffect, useRef, useState } from 'react'
import { sendChatMessage, type ChatMessage } from '../lib/api'

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Good evening. I'm the Meridian duty assistant — a confidential intake channel staffed by AI. I can answer questions on practice areas, fees, and conflicts, and route your matter to the right partner. How can I help?",
}

const QUICK = [
  "I'm being sued — what are my first 48 hours?",
  'Do you take a fixed fee for M&A diligence?',
  'Can you handle a cross-border IP injunction?',
]

interface ChatWidgetProps {
  open: boolean
  onClose: () => void
  onBook: () => void
}

export function ChatWidget({ open, onClose, onBook }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open, loading])

  const send = async (override?: string) => {
    const text = (override ?? input).trim()
    if (!text || loading) return
    setInput('')
    const next = [...messages, { role: 'user' as const, content: text }]
    setMessages(next)
    setLoading(true)

    try {
      const { reply, sessionId: sid } = await sendChatMessage(next, sessionId)
      setSessionId(sid)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "I'm unable to reach the duty desk at this moment. Please leave a brief on the consultation form and a partner will respond within 24 hours.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-end md:justify-end p-0 md:p-6 pointer-events-none">
      <div className="pointer-events-auto modal-card w-full md:w-[420px] h-[80svh] md:h-[640px] bg-paper border border-border md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="bg-ink text-paper px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-gold animate-ping opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <div>
              <div className="text-[14px]">Duty Counsel · AI</div>
              <div className="text-[10px] tracking-[0.16em] uppercase text-paper/55">
                Confidential · 24/7
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-paper/70 hover:text-paper transition-colors"
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {messages.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className={
                  'max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ' +
                  (m.role === 'user'
                    ? 'bg-ink text-paper rounded-br-md'
                    : 'bg-cream text-ink border border-border rounded-bl-md')
                }
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-cream border border-border rounded-2xl rounded-bl-md px-4 py-3 inline-flex gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-ash animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-ash animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-ash animate-bounce" />
              </div>
            </div>
          )}
          {messages.length > 1 && !loading && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onBook()
                }}
                className="w-full inline-flex items-center justify-between gap-3 border border-border bg-paper hover:bg-cream rounded-xl px-4 py-3 text-[13px] text-ink transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect
                      x="2"
                      y="3"
                      width="10"
                      height="9"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path d="M2 6h10M5 2v2M9 2v2" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  Book a partner consultation
                </span>
                <span className="text-brand">→</span>
              </button>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="px-5 pb-2 flex flex-wrap gap-2">
            {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => void send(q)}
                className="text-[12px] px-3 py-1.5 rounded-full border border-border bg-cream hover:bg-paper text-ink transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            void send()
          }}
          className="border-t border-border bg-paper p-3 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your matter — confidentially"
            className="flex-1 bg-cream border border-border rounded-full px-4 py-2.5 text-[13px] placeholder-ash focus:outline-none focus:border-brand"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-10 w-10 grid place-items-center rounded-full bg-brand hover:bg-brandSoft disabled:bg-border disabled:text-ash text-white transition-colors"
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
