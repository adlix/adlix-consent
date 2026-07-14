'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { strapi } from '@/lib/strapi'

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
  const [circlesLoading, setCirclesLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const jwt = (session as unknown as { jwt?: string })?.jwt

  const loadCircles = useCallback(async () => {
    if (!jwt) return
    setCirclesLoading(true)
    try {
      strapi.setJwt(jwt)
      const res = await strapi.getCircles()
      setCircles((res.data as Circle[]) || [])
    } catch {
      setError('Kreise konnten nicht geladen werden.')
    } finally {
      setCirclesLoading(false)
    }
  }, [jwt])

  useEffect(() => {
    if (status === 'authenticated' && jwt) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadCircles()
    }
  }, [status, jwt, loadCircles])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jwt || !name.trim()) return
    setLoading(true)
    setError('')
    try {
      strapi.setJwt(jwt)
      await strapi.createCircle({ name: name.trim(), description: description.trim() || undefined })
      setShowCreate(false)
      setName('')
      setDescription('')
      setMessage('Kreis erstellt! 🌀')
      setTimeout(() => setMessage(''), 4000)
      await loadCircles()
    } catch {
      setError('Kreis konnte nicht erstellt werden.')
    } finally {
      setLoading(false)
    }
  }

  const handleInvite = async (circleId: number) => {
    if (!jwt) return
    setError('')
    try {
      strapi.setJwt(jwt)
      const res = await strapi.generateInvite(circleId)
      const token = (res as { inviteToken?: string }).inviteToken || ''
      setInviteToken(token)
    } catch {
      setError('Einladungslink konnte nicht generiert werden.')
    }
  }

  const handleJoin = async () => {
    if (!jwt || !joinToken.trim()) return
    setError('')
    try {
      strapi.setJwt(jwt)
      await strapi.joinCircle(joinToken.trim())
      setJoinToken('')
      setMessage('Willkommen im Kreis! 🎉')
      setTimeout(() => setMessage(''), 4000)
      await loadCircles()
    } catch {
      setError('Beitreten fehlgeschlagen. Prüfe den Token.')
    }
  }

  const handleCopyInviteLink = async () => {
    try {
      const link = `${window.location.origin}/circles/join/${inviteToken}`
      await navigator.clipboard.writeText(link)
      setMessage('Einladungslink kopiert!')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setError('Kopieren fehlgeschlagen — Link: ' + `/circles/join/${inviteToken}`)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl mb-4 animate-pulse">🌀</div>
          <p className="text-gray-500">Lade…</p>
        </div>
      </div>
    )
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
          <Link href="/" className="flex items-center gap-2 hover:opacity-80" aria-label="adlix consent Startseite">
            <span className="text-2xl" aria-hidden="true">🗳️</span>
            <span className="text-xl font-bold">adlix consent</span>
          </Link>
          <nav className="flex items-center gap-4" aria-label="Hauptnavigation">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">
              Dashboard
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-900 text-sm">
              Vorhaben
            </Link>
            <Link href="/circles" className="text-blue-600 font-medium text-sm" aria-current="page">
              Kreise
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Kreise</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Gruppen, die gemeinsam Consent-Entscheidungen treffen
            </p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            + Kreis erstellen
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700" role="alert">
            {error}
            <button onClick={() => setError('')} className="ml-2 text-red-500 hover:text-red-700 font-medium text-xs">× Schließen</button>
          </div>
        )}

        {inviteToken && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Einladungslink generiert</span>
              <button onClick={() => setInviteToken('')} className="text-blue-400 hover:text-blue-600 text-xs">× Schließen</button>
            </div>
            <code className="block bg-blue-100 px-3 py-2 rounded-lg text-xs break-all mb-2">
              {typeof window !== 'undefined' ? window.location.origin : ''}/circles/join/{inviteToken}
            </code>
            <button
              onClick={handleCopyInviteLink}
              className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              🔗 Link kopieren
            </button>
          </div>
        )}

        {/* Join circle */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-1">Einem Kreis beitreten</h2>
          <p className="text-sm text-gray-500 mb-3">
            Du hast einen Einladungs-Token erhalten? Gib ihn hier ein.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={joinToken}
              onChange={(e) => setJoinToken(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              placeholder="Einladungs-Token eingeben…"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              aria-label="Einladungs-Token"
            />
            <button
              onClick={handleJoin}
              disabled={!joinToken.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors text-sm"
            >
              Beitreten
            </button>
          </div>
        </div>

        {/* Create circle */}
        {showCreate && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6 border-2 border-blue-200">
            <h2 className="text-lg font-semibold mb-3">Neuen Kreis erstellen</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="circle-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="circle-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                  placeholder="z.B. Strategie-Kreis, Vereinsvorstand, Produktteam"
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="circle-desc" className="block text-sm font-medium text-gray-700 mb-1">
                  Beschreibung <span className="text-gray-400 text-xs font-normal">(optional)</span>
                </label>
                <textarea
                  id="circle-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  rows={2}
                  placeholder="Wofür arbeitet dieser Kreis? Was ist sein Auftrag?"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Erstelle…' : '🌀 Erstellen'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowCreate(false); setError('') }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Circle list */}
        {circlesLoading ? (
          <div className="text-center py-12">
            <div className="text-3xl mb-3 animate-pulse">🌀</div>
            <p className="text-gray-400 text-sm">Lade Kreise…</p>
          </div>
        ) : circles.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm text-center">
            <div className="text-5xl mb-4">🌀</div>
            <h2 className="text-xl font-semibold mb-2">Noch kein Kreis</h2>
            <p className="text-gray-500 mb-4 max-w-sm mx-auto">
              Erstelle einen Kreis für dein Team oder tritt einem bestehenden Kreis über einen Einladungs-Token bei.
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Ersten Kreis erstellen
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {circles.map((c) => (
              <article key={c.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/circles/${c.id}`} className="group">
                    <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                      🌀 {c.name}
                    </h3>
                  </Link>
                  <span className="text-sm text-gray-500 shrink-0 ml-4 bg-gray-100 px-2 py-0.5 rounded-full">
                    {c.members?.length || 0} Mitglieder
                  </span>
                </div>
                {c.description && (
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{c.description}</p>
                )}
                <div className="flex items-center gap-4 flex-wrap pt-3 border-t border-gray-100">
                  <Link
                    href={`/circles/${c.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Details & Mitglieder →
                  </Link>
                  <button
                    onClick={() => handleInvite(c.id)}
                    className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1"
                  >
                    📎 Einladungslink generieren
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
