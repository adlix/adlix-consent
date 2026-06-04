import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { setSession } from '@/lib/session'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { id, first_name, last_name, username, photo_url, auth_date, hash } = body

  if (!BOT_TOKEN) return NextResponse.json({ error: 'Telegram nicht konfiguriert.' }, { status: 500 })

  // Verify hash per Telegram spec
  const dataCheckString = Object.entries({
    auth_date,
    first_name,
    id,
    ...(last_name ? { last_name } : {}),
    ...(photo_url ? { photo_url } : {}),
    ...(username ? { username } : {}),
  })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n')

  const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest()
  const expectedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

  if (expectedHash !== hash) {
    return NextResponse.json({ error: 'Ungültige Telegram-Daten.' }, { status: 401 })
  }

  // auth_date must not be older than 1 hour
  if (Date.now() / 1000 - Number(auth_date) > 3600) {
    return NextResponse.json({ error: 'Telegram-Auth abgelaufen.' }, { status: 401 })
  }

  const adminToken = process.env.STRAPI_API_TOKEN
  if (!adminToken) return NextResponse.json({ error: 'Server nicht konfiguriert.' }, { status: 500 })

  // Search user by telegramId in Strapi
  const telegramId = String(id)
  const searchRes = await fetch(
    `${STRAPI_URL}/api/users?filters[telegramId][$eq]=${telegramId}`,
    { headers: { Authorization: `Bearer ${adminToken}` } }
  )
  const users = await searchRes.json()

  let jwt: string

  if (users && users.length > 0) {
    // Existing user — log in via one-time-login
    const tokenRes = await fetch(`${STRAPI_URL}/api/auth/one-time-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: users[0].id }),
    })
    if (!tokenRes.ok) {
      return NextResponse.json({ error: 'Anmeldung fehlgeschlagen.' }, { status: 401 })
    }
    const tokenData = await tokenRes.json()
    jwt = tokenData.jwt
  } else {
    // New user — register
    const email = `telegram_${telegramId}@telegram.local`
    const uname = username || `telegram_${telegramId}`
    const registerRes = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: uname,
        email,
        password: crypto.randomBytes(32).toString('hex'),
      }),
    })
    if (!registerRes.ok) {
      return NextResponse.json({ error: 'Registrierung fehlgeschlagen.' }, { status: 400 })
    }
    const regData = await registerRes.json()
    // Save telegramId on user
    await fetch(`${STRAPI_URL}/api/users/${regData.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        telegramId,
        telegramUsername: username || null,
      }),
    })
    jwt = regData.jwt
  }

  await setSession(jwt)
  return NextResponse.json({ ok: true })
}
