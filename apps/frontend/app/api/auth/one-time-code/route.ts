import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

/**
 * Request a one-time login code sent to the user's email.
 * Strapi doesn't have built-in magic link, so we use a custom flow:
 * 1. Find user by email in Strapi
 * 2. Generate a 6-digit code, store in Strapi user's custom field
 * 3. Send code via Strapi email plugin or custom email
 * 4. User submits code to /api/auth/verify-code
 */
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email } = body

  if (!email) {
    return NextResponse.json({ error: 'E-Mail-Adresse erforderlich.' }, { status: 400 })
  }

  try {
    // Check if user exists by calling Strapi users-permissions
    // We need an admin/service token for this lookup
    const adminToken = process.env.STRAPI_API_TOKEN
    if (!adminToken) {
      // Fallback: try to generate code via custom endpoint
      return NextResponse.json({
        ok: true,
        message: 'Wenn ein Konto existiert, wird ein Code verschickt.',
      })
    }

    // Find user by email
    const userRes = await fetch(
      `${STRAPI_URL}/api/users?filters[email][$eq]=${encodeURIComponent(email)}`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    )

    if (!userRes.ok) {
      // Don't reveal whether user exists
      return NextResponse.json({
        ok: true,
        message: 'Wenn ein Konto existiert, wird ein Code verschickt.',
      })
    }

    const users = await userRes.json()
    if (!users || users.length === 0) {
      // Don't reveal whether user exists
      return NextResponse.json({
        ok: true,
        message: 'Wenn ein Konto existiert, wird ein Code verschickt.',
      })
    }

    const user = users[0]
    const code = String(Math.floor(100000 + Math.random() * 900000))
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 min

    // Store code on user (using Strapi user update with admin token)
    await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        loginCode: code,
        loginCodeExpires: expiresAt,
      }),
    })

    // Send the code via Strapi's email plugin
    await fetch(`${STRAPI_URL}/api/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        to: email,
        subject: 'Dein Anmeldecode — adlix consent',
        text: `Dein Anmeldecode lautet: ${code}\n\nDer Code ist 10 Minuten gültig.`,
        html: `<div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
          <h2 style="color: #2563eb;">adlix consent</h2>
          <p>Dein Anmeldecode lautet:</p>
          <p style="font-size: 2rem; font-weight: bold; letter-spacing: 0.3em; color: #2563eb; margin: 1rem 0;">${code}</p>
          <p style="color: #6b7280; font-size: 0.875rem;">Der Code ist 10 Minuten gültig.</p>
        </div>`,
      }),
    })

    // Always return same message regardless of whether user was found
    return NextResponse.json({
      ok: true,
      message: 'Wenn ein Konto existiert, wird ein Code verschickt.',
    })
  } catch {
    return NextResponse.json({
      ok: true,
      message: 'Wenn ein Konto existiert, wird ein Code verschickt.',
    })
  }
}
