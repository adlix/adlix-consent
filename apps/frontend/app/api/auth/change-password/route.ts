import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function POST(req: NextRequest) {
  const cookieStore = req.cookies
  const jwt = cookieStore.get('consent_session')?.value

  if (!jwt) {
    return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 })
  }

  const body = await req.json()
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Aktuelles und neues Passwort erforderlich.' }, { status: 400 })
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: 'Neues Passwort muss mindestens 6 Zeichen lang sein.' }, { status: 400 })
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        currentPassword,
        password: newPassword,
        passwordConfirmation: newPassword,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      return NextResponse.json(
        { error: data.error?.message || 'Passwort Änderung fehlgeschlagen.' },
        { status: 400 }
      )
    }

    // Strapi returns a new JWT after password change — not needed here
    await res.json()

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Verbindungsfehler.' }, { status: 500 })
  }
}