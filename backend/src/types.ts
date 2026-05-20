export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface BookingInput {
  name: string
  email: string
  phone?: string
  practiceArea: string
  preferredDate: string
  preferredTime: string
  message?: string
}
