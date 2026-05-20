interface ChatLauncherProps {
  onClick: () => void
  hidden: boolean
}

export function ChatLauncher({ onClick, hidden }: ChatLauncherProps) {
  if (hidden) return null
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 bg-ink hover:bg-ink2 text-paper rounded-full pl-3 pr-4 py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] transition-colors"
    >
      <span className="relative inline-flex h-8 w-8 grid place-items-center rounded-full bg-brand">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 4.5C2 3.67 2.67 3 3.5 3h7c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5H6l-3 2v-2H3.5C2.67 10 2 9.33 2 8.5v-4Z"
            stroke="white"
            strokeWidth="1.2"
          />
        </svg>
      </span>
      <span className="text-[13px]">Ask duty counsel</span>
      <span className="font-mono text-[10px] text-gold border border-white/15 rounded px-1.5 py-[1px]">
        AI
      </span>
    </button>
  )
}
