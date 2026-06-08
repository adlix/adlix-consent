import { NextRequest, NextResponse } from 'next/server'
import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server'
import { setSession } from '@/lib/session'
import { getAndClearTempChallenge } from '@/lib/passkey-store'

const RP_ID = process.env.NEXT_PUBLIC_RP_ID || 'localhost'
const ORIGIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const ADMIN_TOKEN = process.env.STRAPI_API_TOKEN

interface StoredCredential {
  id: string
  publicKey: string
  counter: number
  transports?: string[]
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { sessionId, ...authResponse } = body

  const expectedChallenge = getAndClearTempChallenge(sessionId)
  if (!expectedChallenge) {
    return NextResponse.json({ error: 'Challenge abgelaufen.' }, { status: 400 })
  }

  // Search all users with passkeys (via Strapi Admin)
  const usersRes = await fetch(
    `${STRAPI_URL}/api/users?filters[passkeyCredentials][$notNull]=true&pagination[limit]=100`,
    { headers: { Authorization: `Bearer ${ADMIN_TOKEN}` } }
  )
  const users = await usersRes.json()

  let matchedUser: (typeof users)[number] | null = null
  let matchedCred: StoredCredential | null = null

  for (const user of users || []) {
    const creds: StoredCredential[] = JSON.parse(user.passkeyCredentials || '[]')
    const cred = creds.find((c) => c.id === authResponse.id)
    if (cred) {
      matchedUser = user
      matchedCred = cred
      break
    }
  }

  if (!matchedUser || !matchedCred) {
    return NextResponse.json({ error: 'Kein Passkey gefunden.' }, { status: 401 })
  }

  let verification
  try {
    verification = await verifyAuthenticationResponse({
      response: authResponse,
      expectedChallenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
      credential: {
        id: matchedCred.id,
        publicKey: Buffer.from(matchedCred.publicKey, 'base64'),
        counter: matchedCred.counter,
        transports: (matchedCred.transports || []) as AuthenticatorTransportFuture[],
      },
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }

  if (!verification.verified) {
    return NextResponse.json({ error: 'Verifikation fehlgeschlagen.' }, { status: 401 })
  }

  // Update counter
  const updatedCreds = JSON.parse(matchedUser.passkeyCredentials).map((c: StoredCredential) =>
    c.id === matchedCred!.id ? { ...c, counter: verification.authenticationInfo.newCounter } : c
  )
  await fetch(`${STRAPI_URL}/api/users/${matchedUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ADMIN_TOKEN}`,
    },
    body: JSON.stringify({ passkeyCredentials: JSON.stringify(updatedCreds) }),
  })

  // Get JWT via one-time-login
  const tokenRes = await fetch(`${STRAPI_URL}/api/auth/one-time-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: matchedUser.id }),
  })
  if (!tokenRes.ok) {
    return NextResponse.json({ error: 'Login fehlgeschlagen.' }, { status: 401 })
  }
  const { jwt } = await tokenRes.json()
  await setSession(jwt)

  return NextResponse.json({ ok: true })
}
