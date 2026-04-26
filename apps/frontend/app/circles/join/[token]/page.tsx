'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export default function JoinCirclePage() {
  const { token } = useParams<{ token: string }>()
  const { data: session, status } = useSession()
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState('')

  const handleJoin = async () => {
    const jwt = (session as unknown as { jwt?: string })?.jwt
    if (!jwt) return

    try {
      const res = await fetch(`${STRAPI_URL}/api/circles/join/${token}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (res.ok) {
        setJoined(true)
      } else {
        const data = await res.json()
        setError(data.error?.message || 'Beitritt fehlgeschlagen')
      }
    } catch {
      setError('Verbindungsfehler')
    }
  }

  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mb-4">Bitte melde dich an, um dem Kreis beizutreten.</p>
          <Link href={`/login?callbackUrl=/circles/join/${token}`} className="text-blue-600 font-medium">
            Anmelden
          </Link>
        </div>
      </div>
    )
  }

  if (joined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-xl font-semibold mb-2">Willkommen im Kreis!</h1>
          <Link href="/circles" className="text-blue-600 font-medium">
            Zu meinen Kreisen →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl p-8 shadow-sm text-center max-w-md">
        <h1 className="text-xl font-semibold mb-4">Einladung zum Kreis</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg text-sm text-red-700">{error}</div>
        )}
        <button
          onClick={handleJoin}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Kreis beitreten
        </button>
      </div>
    </div>
  )
}
