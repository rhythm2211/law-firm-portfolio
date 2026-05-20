const API_BASE = import.meta.env.VITE_API_URL || ''

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface BookingPayload {
  name: string
  email: string
  phone?: string
  practiceArea: string
  preferredDate: string
  preferredTime: string
  message?: string
}

export interface Booking extends BookingPayload {
  id: string
  status: string
  createdAt: string
}

async function parseApiError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string }
    return body.error ?? res.statusText
  } catch {
    return res.statusText
  }
}

export async function sendChatMessage(
  messages: ChatMessage[],
  sessionId?: string,
): Promise<{ reply: string; sessionId: string }> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, sessionId }),
  })
  if (!res.ok) throw new Error(await parseApiError(res))
  return res.json()
}

export async function createBooking(payload: BookingPayload): Promise<Booking> {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await parseApiError(res))
  return res.json()
}

export async function getAvailableSlots(date: string): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/bookings/slots?date=${encodeURIComponent(date)}`)
  if (!res.ok) throw new Error(await parseApiError(res))
  return res.json()
}
