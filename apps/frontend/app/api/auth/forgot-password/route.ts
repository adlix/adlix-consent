import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email } = body

  if (!email) {
    return NextResponse.json({ error: 'E-Mail-Adresse erforderlich.' }, { status: 400 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || 'http://localhost:3000'

  try {
    await fetch(`${STRAPI_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        url: `${appUrl}/reset-password?code={code}`,
      }),
    })

    // Always return ok to prevent email enumeration
    return NextResponse.json({ ok: true })
  } catch {
    // Still return ok
    return NextResponse.json({ ok: true })
  }
}