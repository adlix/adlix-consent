import { NextRequest, NextResponse } from 'next/server'
import { generateAuthenticationOptions } from '@simplewebauthn/server'
import { storeTempChallenge } from '@/lib/passkey-store'
import crypto from 'crypto'

const RP_ID = process.env.NEXT_PUBLIC_RP_ID || 'localhost'

export async function POST(_req: NextRequest) {
  const sessionId = crypto.randomUUID()
  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    userVerification: 'preferred',
    allowCredentials: [], // Passkey mode: any authenticator
  })

  storeTempChallenge(sessionId, options.challenge)

  return NextResponse.json({ ...options, sessionId })
}
