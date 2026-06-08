import { NextRequest, NextResponse } from 'next/server'
import { verifyRegistrationResponse } from '@simplewebauthn/server'
import { getSession } from '@/lib/session'
import { getAndClearChallenge } from '@/lib/passkey-store'

const RP_ID = process.env.NEXT_PUBLIC_RP_ID || 'localhost'
const ORIGIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 })

  const body = await req.json()
  const expectedChallenge = getAndClearChallenge(session.id)
  if (!expectedChallenge)
    return NextResponse.json({ error: 'Challenge abgelaufen.' }, { status: 400 })

  let verification
  try {
    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }

  if (!verification.verified || !verification.registrationInfo) {
    return NextResponse.json({ error: 'Verifikation fehlgeschlagen.' }, { status: 400 })
  }

  const { credential } = verification.registrationInfo

  // Add new credential to Strapi user
  const adminToken = process.env.STRAPI_API_TOKEN
  const userRes = await fetch(`${STRAPI_URL}/api/users/${session.id}`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  })
  const user = await userRes.json()
  const existing: unknown[] = JSON.parse(user.passkeyCredentials || '[]')

  const newCred = {
    id: credential.id,
    publicKey: Buffer.from(credential.publicKey).toString('base64'),
    counter: credential.counter,
    transports: body.response?.transports || [],
    createdAt: new Date().toISOString(),
  }

  await fetch(`${STRAPI_URL}/api/users/${session.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ passkeyCredentials: JSON.stringify([...existing, newCred]) }),
  })

  return NextResponse.json({ ok: true })
}
