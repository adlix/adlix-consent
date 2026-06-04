import { NextRequest, NextResponse } from 'next/server'
import { generateRegistrationOptions } from '@simplewebauthn/server'
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server'
import { getSession } from '@/lib/session'
import { storeChallenge } from '@/lib/passkey-store'

const RP_NAME = 'adlix consent'
const RP_ID = process.env.NEXT_PUBLIC_RP_ID || 'localhost'
const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function POST(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 })

  // Load existing credentials from Strapi to fill excludeCredentials
  const userRes = await fetch(`${STRAPI_URL}/api/users/me?populate=*`, {
    headers: { Authorization: `Bearer ${session.jwt}` },
  })
  const user = await userRes.json()
  const existingCreds: Array<{ id: string; transports?: string[] }> = JSON.parse(
    user.passkeyCredentials || '[]'
  )

  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: RP_ID,
    userID: new TextEncoder().encode(session.id),
    userName: session.email,
    userDisplayName: session.username || session.email,
    attestationType: 'none',
    excludeCredentials: existingCreds.map((c) => ({
      id: c.id,
      transports: (c.transports as AuthenticatorTransportFuture[]) || [],
    })),
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
  })

  storeChallenge(session.id, options.challenge)
  return NextResponse.json(options)
}
