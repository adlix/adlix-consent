import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/session'

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { code, password } = body

  if (!code || !password) {
    return NextResponse.json({ error: 'Code und neues Passwort erforderlich.' }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Passwort muss mindestens 6 Zeichen lang sein.' }, { status: 400 })
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation: password,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      return NextResponse.json(
        { error: data.error?.message || 'Zurücksetzen fehlgeschlagen. Der Link könnte abgelaufen sein.' },
        { status: 400 }
      )
    }

    const data = await res.json()
    // Auto-login after password reset
    if (data.jwt) {
      await setSession(data.jwt)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Verbindungsfehler.' }, { status: 500 })
  }
}