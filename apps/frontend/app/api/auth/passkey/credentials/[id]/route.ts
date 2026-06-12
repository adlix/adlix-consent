import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

// DELETE /api/auth/passkey/credentials/[id] — remove a specific passkey
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 })

  const { id } = await params
  const adminToken = process.env.STRAPI_API_TOKEN

  try {
    const userRes = await fetch(`${STRAPI_URL}/api/users/${session.id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    if (!userRes.ok) throw new Error('User fetch failed')
    const user = await userRes.json()
    const creds: {
      id: string
      publicKey?: string
      counter?: number
      transports?: string[]
      createdAt: string
    }[] = JSON.parse(user.passkeyCredentials || '[]')

    const filtered = creds.filter((c) => c.id !== id)
    if (filtered.length === creds.length) {
      return NextResponse.json({ error: 'Passkey nicht gefunden.' }, { status: 404 })
    }

    // Don't allow deleting the last credential (lock-out prevention)
    if (filtered.length === 0) {
      return NextResponse.json(
        { error: 'Du kannst nicht deinen letzten Passkey löschen. Füge zuerst einen neuen hinzu.' },
        { status: 400 }
      )
    }

    const updateRes = await fetch(`${STRAPI_URL}/api/users/${session.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ passkeyCredentials: JSON.stringify(filtered) }),
    })

    if (!updateRes.ok) throw new Error('Update failed')

    return NextResponse.json({ ok: true, remaining: filtered.length })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
