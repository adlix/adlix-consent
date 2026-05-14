import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/session'

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

/**
 * Verify a one-time login code and authenticate the user.
 */
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, code } = body

  if (!email || !code) {
    return NextResponse.json({ error: 'E-Mail und Code erforderlich.' }, { status: 400 })
  }

  const adminToken = process.env.STRAPI_API_TOKEN
  if (!adminToken) {
    return NextResponse.json({ error: 'Einmalcode-Anmeldung nicht konfiguriert.' }, { status: 500 })
  }

  try {
    // Find user by email
    const userRes = await fetch(
      `${STRAPI_URL}/api/users?filters[email][$eq]=${encodeURIComponent(email)}`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    )

    if (!userRes.ok) {
      return NextResponse.json({ error: 'Ungültiger Code.' }, { status: 401 })
    }

    const users = await userRes.json()
    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Ungültiger Code.' }, { status: 401 })
    }

    const user = users[0]

    // Verify code
    if (user.loginCode !== code) {
      return NextResponse.json({ error: 'Ungültiger Code.' }, { status: 401 })
    }

    // Check expiry
    if (user.loginCodeExpires && new Date(user.loginCodeExpires) < new Date()) {
      return NextResponse.json(
        { error: 'Code abgelaufen. Bitte fordere einen neuen an.' },
        { status: 401 }
      )
    }

    // Clear the code
    await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        loginCode: null,
        loginCodeExpires: null,
      }),
    })

    // Generate a new JWT for the user via Strapi
    // We need to use the admin token to get a JWT for the user
    // Strapi doesn't have a direct "generate token for user" endpoint,
    // so we'll use the custom approach: create a token via the users-permissions service
    // For now, we'll use the admin token as a workaround by calling a custom Strapi endpoint

    // Alternative: Use Strapi's Auth API with a temporary approach
    // The cleanest solution is to create a custom Strapi controller that generates a JWT for a user
    const tokenRes = await fetch(`${STRAPI_URL}/api/auth/one-time-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    })

    if (!tokenRes.ok) {
      return NextResponse.json({ error: 'Anmeldung fehlgeschlagen.' }, { status: 401 })
    }

    const tokenData = await tokenRes.json()
    if (tokenData.jwt) {
      await setSession(tokenData.jwt)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Verbindungsfehler.' }, { status: 500 })
  }
}
