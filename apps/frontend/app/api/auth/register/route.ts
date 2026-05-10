import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/session'

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { username, email, password } = body

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 })
  }

  const strapiRes = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })

  if (!strapiRes.ok) {
    const data = await strapiRes.json()
    return NextResponse.json(
      { error: data.error?.message || 'Registrierung fehlgeschlagen.' },
      { status: 400 }
    )
  }

  const data = await strapiRes.json()
  await setSession(data.jwt)

  return NextResponse.json({ ok: true })
}
