'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

interface Circle {
  id: number
  name: string
  description?: string
  inviteToken?: string
  owner?: { id: number; username?: string }
  members?: { id: number; username?: string }[]
}

export default function CirclesPage() {
  const { data: session, status } = useSession()
  const [circles, setCircles] = useState<Circle[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [inviteToken, setInviteToken] = useState('')
  const [joinToken, setJoinToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [message, setMessage] = useState('')

  const jwt = (session as unknown as { jwt?: string })?.jwt

  const loadCircles = async () => {
    if (!jwt) return
    try {
      const res = await fetch(`${STRAPI_URL}/api/circles?populate=owner,members`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (res.ok) {
        const data = await res.json()
        setCircles(data.data || [])
      }
    } catch (_) {}
    setLoaded(true)
  }

  if (!loaded && status === 'authenticated') loadCircles()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jwt || !name.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${STRAPI_URL}/api/circles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: { name, description: description || undefined } }),
      })
      if (res.ok) {
        setShowCreate(false)
        setName('')
        setDescription('')
        setLoaded(false)
        setMessage('Kreis erstellt!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (_) {}
    setLoading(false)
  }

  const handleInvite = async (circleId: number) => {
    if (!jwt) return
    try {
      const res = await fetch(`${STRAPI_URL}/api/circles/${circleId}/invite`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (res.ok) {
        const data = await res.json()
        setInviteToken(data.inviteToken || '')
      }
    } catch (_) {}
  }

  const handleJoin = async () => {
    if (!jwt || !joinToken.trim()) return
    try {
      const res = await fetch(`${STRAPI_URL}/api/circles/join/${joinToken.trim()}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (res.ok) {
        setJoinToken('')
        setLoaded(false)
        setMessage('Willkommen im Kreis!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (_) {}
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Laden…</div>
  }

  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Bitte melde dich an, um Kreise zu sehen.</p>
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Anmelden
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🗳️</span>
            <span className="text-xl font-bold">adlix consent</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/circles" className="text-blue-600 font-medium">
              Kreise
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Kreise</h1>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            + Kreis erstellen
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {message}
          </div>
        )}

        {inviteToken && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            Einladungslink: <code className="bg-blue-100 px-1 rounded">/circles/join/{inviteToken}</code>
            <button onClick={() => { navigator.clipboard.writeText(inviteToken) }} className="ml-2 text-blue-800 underline text-xs">
              Token kopieren
            </button>
          </div>
        )}

        {/* Join circle */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-3">Einem Kreis beitreten</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={joinToken}
              onChange={(e) => setJoinToken(e.target.value)}
              placeholder="Einladungs-Token eingeben"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleJoin}
              disabled={!joinToken.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            >
              Beitreten
            </button>
          </div>
        </div>

        {/* Create circle */}
        {showCreate && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-3">Neuen Kreis erstellen</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                  placeholder="z.B. Strategie-Kreis"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Wofür arbeitet dieser Kreis?"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Erstellt…' : 'Erstellen'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Circle list */}
        {circles.length === 0 && loaded ? (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <p className="text-gray-500">Noch keine Kreise. Erstelle einen Kreis oder tritt einem bei.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {circles.map((c) => (
              <div key={c.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  <span className="text-sm text-gray-500">
                    {c.members?.length || 0} Mitglieder
                  </span>
                </div>
                {c.description && <p className="text-sm text-gray-600 mb-3">{c.description}</p>}
                <button
                  onClick={() => handleInvite(c.id)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  📎 Einladungslink generieren
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
