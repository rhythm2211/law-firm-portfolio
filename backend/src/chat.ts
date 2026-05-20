import type { ChatMessage } from './types.js'

const KNOWLEDGE: Record<string, string> = {
  litigation:
    'Our Litigation team handles complex commercial disputes, class actions, and appellate matters. Initial consultations are typically 45 minutes.',
  corporate:
    'Corporate Law covers M&A, governance, securities, and regulatory compliance. We advise FTSE 250 companies and growth-stage ventures.',
  employment:
    'Employment practice handles executive contracts, workplace disputes, and HR advisory for employers and senior executives.',
  family:
    'Family Law focuses on estate planning, trusts, and high-net-worth family matters across UK and international jurisdictions.',
  booking:
    'You can book a consultation online — choose your practice area, preferred date, and available time slot. Our team confirms within 24 hours.',
  fees:
    'Fee structures vary by matter type — we offer fixed fees for consultations, hourly rates for litigation, and retainer arrangements for corporate clients.',
  location:
    'Meridian Law Partners is headquartered at 25 Finsbury Square, London EC2A 1DX. We also offer secure video consultations.',
  hours:
    'Office hours are Monday–Friday, 8:30 AM – 6:30 PM GMT. Emergency counsel lines are available for retained clients.',
}

function matchTopic(text: string): string | null {
  const lower = text.toLowerCase()
  if (/litigat|dispute|court|lawsuit|trial/.test(lower)) return 'litigation'
  if (/corporate|m&a|merger|governance|securities/.test(lower)) return 'corporate'
  if (/employ|workplace|hr|executive contract/.test(lower)) return 'employment'
  if (/family|estate|trust|will|inherit/.test(lower)) return 'family'
  if (/book|schedule|appointment|consult|meeting/.test(lower)) return 'booking'
  if (/fee|cost|price|rate|charge/.test(lower)) return 'fees'
  if (/location|address|office|where|london/.test(lower)) return 'location'
  if (/hour|open|time|when/.test(lower)) return 'hours'
  return null
}

export function generateReply(messages: ChatMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')
  if (!lastUser) {
    return "I'm here to help. Ask about our practice areas, booking a consultation, fees, or office location."
  }

  const topic = matchTopic(lastUser.content)
  if (topic) {
    return `${KNOWLEDGE[topic]} Would you like to book a consultation? I can guide you to our booking form.`
  }

  if (/hello|hi|hey|good (morning|afternoon|evening)/i.test(lastUser.content)) {
    return 'Welcome to Meridian Law Partners. How can I assist you today — practice areas, booking, or general inquiries?'
  }

  return (
    'Thank you for your inquiry. Meridian Law Partners specialises in Litigation, Corporate, Employment, IP, Family, and Real Estate law. ' +
    'For specific legal advice, please book a confidential consultation with one of our attorneys. ' +
    'I can help with general information about our services, fees, and booking process.'
  )
}
