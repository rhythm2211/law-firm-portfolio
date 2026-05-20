import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateReply } from './chat.js'
import { db } from './db.js'
import type { BookingInput, ChatMessage } from './types.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'data')
fs.mkdirSync(dataDir, { recursive: true })

const app = express()
const PORT = Number(process.env.PORT) || 3001

const ALL_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', firm: 'Meridian Law Partners' })
})

app.post('/api/chat', (req, res) => {
  const { messages, sessionId } = req.body as {
    messages: ChatMessage[]
    sessionId?: string
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages required' })
    return
  }

  const sid = sessionId ?? randomUUID()
  const now = new Date().toISOString()

  const existing = db
    .prepare('SELECT id FROM chat_sessions WHERE id = ?')
    .get(sid)
  if (!existing) {
    db.prepare('INSERT INTO chat_sessions (id, created_at) VALUES (?, ?)').run(
      sid,
      now,
    )
  }

  const lastUser = messages.filter((m) => m.role === 'user').at(-1)
  if (lastUser) {
    db.prepare(
      'INSERT INTO chat_messages (session_id, role, content, created_at) VALUES (?, ?, ?, ?)',
    ).run(sid, 'user', lastUser.content, now)
  }

  const reply = generateReply(messages)

  db.prepare(
    'INSERT INTO chat_messages (session_id, role, content, created_at) VALUES (?, ?, ?, ?)',
  ).run(sid, 'assistant', reply, now)

  res.json({ reply, sessionId: sid })
})

app.get('/api/bookings/slots', (req, res) => {
  const date = req.query.date as string
  if (!date) {
    res.status(400).json({ error: 'date query required' })
    return
  }

  const booked = db
    .prepare(
      'SELECT preferred_time FROM bookings WHERE preferred_date = ? AND status != ?',
    )
    .all(date, 'cancelled') as { preferred_time: string }[]

  const taken = new Set(booked.map((b) => b.preferred_time))
  const available = ALL_SLOTS.filter((s) => !taken.has(s))
  res.json(available)
})

app.post('/api/bookings', (req, res) => {
  const body = req.body as BookingInput

  if (
    !body.name ||
    !body.email ||
    !body.practiceArea ||
    !body.preferredDate ||
    !body.preferredTime
  ) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  const conflict = db
    .prepare(
      'SELECT id FROM bookings WHERE preferred_date = ? AND preferred_time = ? AND status != ?',
    )
    .get(body.preferredDate, body.preferredTime, 'cancelled')

  if (conflict) {
    res.status(409).json({ error: 'Time slot no longer available' })
    return
  }

  const id = randomUUID()
  const createdAt = new Date().toISOString()

  db.prepare(
    `INSERT INTO bookings (id, name, email, phone, practice_area, preferred_date, preferred_time, message, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
  ).run(
    id,
    body.name,
    body.email,
    body.phone ?? null,
    body.practiceArea,
    body.preferredDate,
    body.preferredTime,
    body.message ?? null,
    createdAt,
  )

  res.status(201).json({
    id,
    name: body.name,
    email: body.email,
    phone: body.phone,
    practiceArea: body.practiceArea,
    preferredDate: body.preferredDate,
    preferredTime: body.preferredTime,
    message: body.message,
    status: 'pending',
    createdAt,
  })
})

app.get('/api/bookings', (_req, res) => {
  const rows = db
    .prepare(
      'SELECT id, name, email, phone, practice_area as practiceArea, preferred_date as preferredDate, preferred_time as preferredTime, message, status, created_at as createdAt FROM bookings ORDER BY created_at DESC LIMIT 50',
    )
    .all()
  res.json(rows)
})

const staticDir =
  process.env.STATIC_DIR || path.join(__dirname, '..', '..', 'frontend', 'dist')

if (fs.existsSync(path.join(staticDir, 'index.html'))) {
  app.use(express.static(staticDir))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'))
  })
  console.log(`Serving frontend from ${staticDir}`)
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Meridian Law running on http://0.0.0.0:${PORT}`)
})
