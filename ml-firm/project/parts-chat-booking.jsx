/* global React */

// ============ Chat Widget ============
function ChatWidget({ open, onClose, onBook }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Good evening. I'm the Meridian duty assistant — a confidential intake channel staffed by AI. I can answer questions on practice areas, fees, and conflicts, and route your matter to the right partner. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const send = async (override) => {
    const text = (override || input).trim();
    if (!text || loading) return;
    setInput("");
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    const system =
      "You are the duty assistant for Meridian Law Partners, a fictional UK-led law firm with offices in London, New York, and Singapore. Practice areas: Commercial Litigation, Corporate & M&A, Intellectual Property, Employment & Executive, Private Wealth & Trusts, Real Estate. Be concise (under 80 words), formal but warm, in the voice of a magic-circle firm. Always remind users that you are not legal advice and offer to book a partner consultation when appropriate. Do not invent specific fees; describe ranges qualitatively.";

    try {
      const reply = await window.claude.complete({
        messages: [
          { role: "user", content: `SYSTEM:\n${system}\n\nUSER:\n${text}` },
        ],
      });
      setMessages([...next, { role: "assistant", content: reply.trim() }]);
    } catch (e) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "I'm unable to reach the duty desk at this moment. Please leave a brief on the consultation form and a partner will respond within 24 hours.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quick = [
    "I'm being sued — what are my first 48 hours?",
    "Do you take a fixed fee for M&A diligence?",
    "Can you handle a cross-border IP injunction?",
  ];

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-end md:justify-end p-0 md:p-6 pointer-events-none">
          <div
            className="pointer-events-auto modal-card w-full md:w-[420px] h-[80svh] md:h-[640px] bg-paper border border-border md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
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
                onClick={onClose}
                className="text-paper/70 hover:text-paper transition-colors"
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed " +
                      (m.role === "user"
                        ? "bg-ink text-paper rounded-br-md"
                        : "bg-cream text-ink border border-border rounded-bl-md")
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
              {/* Booking suggestion */}
              {messages.length > 1 && !loading && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onBook();
                    }}
                    className="w-full inline-flex items-center justify-between gap-3 border border-border bg-paper hover:bg-cream rounded-xl px-4 py-3 text-[13px] text-ink transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M2 6h10M5 2v2M9 2v2" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      Book a partner consultation
                    </span>
                    <span className="text-brand">→</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length === 1 && (
              <div className="px-5 pb-2 flex flex-wrap gap-2">
                {quick.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[12px] px-3 py-1.5 rounded-full border border-border bg-cream hover:bg-paper text-ink transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
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
      )}
    </>
  );
}

// ============ Booking Modal ============
function BookingModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    practice: "Commercial Litigation",
    urgency: "Within a week",
    date: nextBusinessDay(),
    slot: "10:00",
    name: "",
    company: "",
    email: "",
    brief: "",
  });

  function set(key) {
    return (e) => setForm({ ...form, [key]: e.target.value });
  }

  function reset() {
    setStep(1);
    setForm({
      practice: "Commercial Litigation",
      urgency: "Within a week",
      date: nextBusinessDay(),
      slot: "10:00",
      name: "",
      company: "",
      email: "",
      brief: "",
    });
  }

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card w-full max-w-[760px] max-h-[90svh] bg-paper rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-[260px_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Side */}
        <aside className="bg-ink text-paper p-7 hidden md:flex flex-col">
          <div className="flex items-center gap-2">
            <MeridianMark className="h-7 w-7" />
            <span className="text-[13px] tracking-[0.04em]">MERIDIAN<span className="text-gold mx-1">·</span>LAW</span>
          </div>
          <div className="mt-10">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-gold mb-2">
              Initial consultation
            </div>
            <div className="font-serif text-[1.9rem] leading-tight">
              45 minutes with a partner.
            </div>
            <p className="mt-4 text-[13px] text-paper/65 leading-relaxed">
              Confidential. Conflicts-checked. No charge if we cannot help — written
              recommendation regardless.
            </p>
          </div>

          <ol className="mt-10 space-y-3 text-[12px]">
            {["Matter & timing", "Your details", "Confirm"].map((s, i) => (
              <li
                key={s}
                className={
                  "flex items-center gap-3 " +
                  (i + 1 === step ? "text-paper" : i + 1 < step ? "text-paper/60" : "text-paper/35")
                }
              >
                <span
                  className={
                    "h-6 w-6 grid place-items-center rounded-full text-[11px] border " +
                    (i + 1 === step
                      ? "bg-brand border-brand text-white"
                      : i + 1 < step
                      ? "border-paper/40"
                      : "border-paper/20")
                  }
                >
                  {i + 1 < step ? "✓" : i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>

          <div className="mt-auto pt-10 text-[11px] text-paper/45 leading-relaxed">
            Calls handled in confidence under SRA Code of Conduct. We never share your brief
            with third parties without consent.
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between p-5 border-b border-border md:hidden">
            <span className="font-serif text-lg">Book consultation</span>
            <button onClick={onClose} aria-label="Close" className="text-ash">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex justify-end p-4">
            <button onClick={onClose} aria-label="Close" className="text-ash hover:text-ink transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>

          <div className="px-7 pb-7 flex-1">
            {step === 1 && (
              <div>
                <h3 className="font-serif text-[1.7rem] text-ink leading-tight">
                  Tell us about the matter.
                </h3>
                <p className="mt-2 text-[13px] text-ash">
                  Anything you share is treated as privileged from this moment.
                </p>
                <div className="mt-6 space-y-5">
                  <Field label="Practice area">
                    <select value={form.practice} onChange={set("practice")} className="input">
                      {window.PRACTICE_AREAS.map((p) => (
                        <option key={p.code}>{p.title}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Urgency">
                    <div className="grid grid-cols-3 gap-2">
                      {["Today", "Within a week", "Exploratory"].map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setForm({ ...form, urgency: u })}
                          className={
                            "rounded-full text-[12px] py-2 border transition-colors " +
                            (form.urgency === u
                              ? "bg-ink text-paper border-ink"
                              : "bg-cream text-ink border-border hover:border-ink")
                          }
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Preferred date">
                    <input type="date" value={form.date} onChange={set("date")} className="input" />
                  </Field>
                  <Field label="Time slot (GMT)">
                    <div className="grid grid-cols-4 gap-2">
                      {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, slot: t })}
                          className={
                            "rounded-md text-[12px] py-2 border transition-colors font-mono " +
                            (form.slot === t
                              ? "bg-brand text-white border-brand"
                              : "bg-cream text-ink border-border hover:border-ink")
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setStep(2)} className="bg-ink hover:bg-ink2 text-paper text-[13px] px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors">
                    Continue
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-serif text-[1.7rem] text-ink leading-tight">Your details.</h3>
                <p className="mt-2 text-[13px] text-ash">
                  Conflicts-checked before the call. We will not disclose your enquiry to any
                  current client.
                </p>
                <div className="mt-6 space-y-5">
                  <Field label="Full name">
                    <input value={form.name} onChange={set("name")} placeholder="Eleanor Whitmore" className="input" />
                  </Field>
                  <Field label="Company / organisation">
                    <input value={form.company} onChange={set("company")} placeholder="Hartwell Capital" className="input" />
                  </Field>
                  <Field label="Email">
                    <input value={form.email} onChange={set("email")} type="email" placeholder="you@firm.com" className="input" />
                  </Field>
                  <Field label="Brief summary (1–3 sentences)">
                    <textarea
                      value={form.brief}
                      onChange={set("brief")}
                      rows={4}
                      placeholder="Counterparty alleges breach of a 2023 SPA. We are preparing for emergency relief."
                      className="input resize-none"
                    />
                  </Field>
                </div>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(1)} className="text-[13px] text-ash hover:text-ink transition-colors">
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!form.name || !form.email}
                    className="bg-ink hover:bg-ink2 disabled:bg-border disabled:text-ash text-paper text-[13px] px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors"
                  >
                    Review
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 text-brand px-3 py-1 text-[11px] tracking-[0.16em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" /> Consultation confirmed
                </div>
                <h3 className="mt-4 font-serif text-[2rem] text-ink leading-tight">
                  Thank you, {form.name.split(" ")[0] || "—"}.
                </h3>
                <p className="mt-2 text-[14px] text-ash max-w-[44ch]">
                  We have provisionally reserved a 45-minute consultation. A partner will
                  reply within 24 hours to confirm conflicts and circulate the call details.
                </p>
                <dl className="mt-7 grid grid-cols-[120px_1fr] gap-y-3 text-[13px] border-t border-border pt-6">
                  <dt className="text-ash">Practice</dt><dd className="text-ink">{form.practice}</dd>
                  <dt className="text-ash">Urgency</dt><dd className="text-ink">{form.urgency}</dd>
                  <dt className="text-ash">When</dt>
                  <dd className="text-ink font-mono">{formatDate(form.date)} · {form.slot} GMT</dd>
                  <dt className="text-ash">For</dt><dd className="text-ink">{form.name} — {form.company || "—"}</dd>
                  <dt className="text-ash">Contact</dt><dd className="text-ink">{form.email}</dd>
                </dl>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      reset();
                      onClose();
                    }}
                    className="bg-brand hover:bg-brandSoft text-white text-[13px] px-5 py-2.5 rounded-full"
                  >
                    Done
                  </button>
                  <button
                    onClick={reset}
                    className="text-[13px] text-ash hover:text-ink transition-colors"
                  >
                    Book another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.16em] uppercase text-ash mb-2">{label}</span>
      {children}
    </label>
  );
}

function nextBusinessDay() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  if (d.getDay() === 6) d.setDate(d.getDate() + 2);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

// Inject input class (single place)
const _styleEl = document.createElement("style");
_styleEl.textContent = `
.input { width:100%; background:#FBF9F4; border:1px solid #E4DFD3; border-radius:10px; padding:11px 14px; font-size:14px; color:#11151C; transition:border-color .2s ease; font-family:inherit; }
.input:focus { outline:none; border-color:#C8531D; }
`;
document.head.appendChild(_styleEl);

// Floating chat launcher
function ChatLauncher({ onClick, hidden }) {
  if (hidden) return null;
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 bg-ink hover:bg-ink2 text-paper rounded-full pl-3 pr-4 py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] transition-colors"
    >
      <span className="relative inline-flex h-8 w-8 grid place-items-center rounded-full bg-brand">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 4.5C2 3.67 2.67 3 3.5 3h7c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5H6l-3 2v-2H3.5C2.67 10 2 9.33 2 8.5v-4Z" stroke="white" strokeWidth="1.2" />
        </svg>
      </span>
      <span className="text-[13px]">Ask duty counsel</span>
      <span className="font-mono text-[10px] text-gold border border-white/15 rounded px-1.5 py-[1px]">AI</span>
    </button>
  );
}

Object.assign(window, { ChatWidget, BookingModal, ChatLauncher });
