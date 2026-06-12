import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

// GET /api/auth/passkey/credentials — list all registered passkeys (safe, no secrets)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 })

  const adminToken = process.env.STRAPI_API_TOKEN
  try {
    const userRes = await fetch(`${STRAPI_URL}/api/users/${session.id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    if (!userRes.ok) throw new Error('User fetch failed')
    const user = await userRes.json()
    const creds: {
      id: string
      transports?: string[]
      createdAt: string
    }[] = JSON.parse(user.passkeyCredentials || '[]')

    // Return safe metadata only (no private keys, no publicKey)
    const safeCreds = creds.map((c) => ({
      id: c.id,
      shortId: c.id.slice(-8),
      transports: c.transports || [],
      createdAt: c.createdAt,
    }))

    return NextResponse.json({ credentials: safeCreds })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
