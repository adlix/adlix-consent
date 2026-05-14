import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/session'

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: 'E-Mail und Passwort erforderlich.' }, { status: 400 })
  }

  const strapiRes = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: email, password }),
  })

  if (!strapiRes.ok) {
    return NextResponse.json({ error: 'E-Mail oder Passwort falsch.' }, { status: 401 })
  }

  const data = await strapiRes.json()
  await setSession(data.jwt)

  return NextResponse.json({ ok: true })
}
