'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

interface Member {
  id: number
  username?: string
  email?: string
}

interface CircleProject {
  id: number
  name: string
  status: string
  description?: string
  updatedAt?: string
}

interface CircleData {
  id: number
  name: string
  description?: string
  inviteToken?: string
  owner?: { id: number; username?: string; email?: string }
  circleMembers?: Member[]
  members?: Member[]
  projects?: CircleProject[]
}

const statusLabels: Record<string, { label: string; color: string }> = {
  draft: { label: 'Entwurf', color: 'bg-gray-100 text-gray-600' },
  active: { label: 'Aktiv', color: 'bg-green-100 text-green-700' },
  completed: { label: 'Abgeschlossen', color: 'bg-blue-100 text-blue-700' },
  beschlossen: { label: 'Beschlossen', color: 'bg-emerald-100 text-emerald-700' },
  archived: { label: 'Archiviert', color: 'bg-gray-100 text-gray-500' },
}

export default function CircleDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { data: session, status: authStatus } = useSession()
  const jwt = (session as unknown as { jwt?: string })?.jwt
  const userId = (session?.user as unknown as { id?: string | number })?.id

  const [circle, setCircle] = useState<CircleData | null>(null)
  const [projects, setProjects] = useState<CircleProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inviteToken, setInviteToken] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [generatingInvite, setGeneratingInvite] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [circleRes, projectsRes] = await Promise.all([
        fetch(`${STRAPI_URL}/api/circles/${params.id}?populate=owner,circleMembers,members`, {
          headers: { Authorization: `Bearer ${jwt}` },
        }),
        fetch(
          `${STRAPI_URL}/api/projects?filters[circle][id][$eq]=${params.id}&populate=circle&sort=updatedAt:desc&pagination[pageSize]=20`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        ),
      ])

      if (!circleRes.ok) throw new Error('Kreis nicht gefunden')
      const circleData = await circleRes.json()
      setCircle(circleData.data)

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(
          ((projectsData.data as CircleProject[]) || []).map((p) => ({
            id: p.id,
            name: p.name,
            status: p.status,
            description: p.description,
            updatedAt: p.updatedAt,
          }))
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authStatus !== 'loading' && !jwt) {
      router.push('/login')
    }
  }, [jwt, authStatus, router])

  useEffect(() => {
    if (authStatus === 'authenticated' && jwt) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadData()
    }
  }, [params.id, jwt, authStatus]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleGenerateInvite = async () => {
    if (!jwt) return
    setGeneratingInvite(true)
    try {
      const res = await fetch(`${STRAPI_URL}/api/circles/${params.id}/invite`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (res.ok) {
        const data = await res.json()
        const token = data.token || data.inviteToken
        setInviteToken(token)
        if (token) {
          const inviteUrl = `${window.location.origin}/circles/join?token=${token}`
          await navigator.clipboard.writeText(inviteUrl)
          showToast('Einladungslink kopiert!')
        }
      } else {
        showToast('Einladungslink konnte nicht generiert werden.')
      }
    } catch {
      showToast('Fehler beim Generieren.')
    } finally {
      setGeneratingInvite(false)
    }
  }

  const handleCopyInvite = async () => {
    if (!inviteToken) return
    const inviteUrl = `${window.location.origin}/circles/join?token=${inviteToken}`
    await navigator.clipboard.writeText(inviteUrl)
    showToast('Link kopiert!')
  }

  const isOwner = circle && String(userId) === String(circle.owner?.id)
  const members = circle?.circleMembers || circle?.members || []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-3xl mb-4 animate-pulse">🌀</div>
          <p className="text-gray-500">Lade Kreis…</p>
        </div>
      </div>
    )
  }

  if (error || !circle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Kreis nicht gefunden.'}</p>
          <Link href="/circles" className="text-blue-600 hover:text-blue-700">
            ← Zurück zu Kreisen
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-2xl">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/circles" className="text-gray-600 hover:text-gray-900 text-sm">
              ← Kreise
            </Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 text-sm">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Toast */}
          {toast && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2">
              <span>✅</span> {toast}
            </div>
          )}

          {/* Circle Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🌀</span>
                  <h1 className="text-2xl font-bold">{circle.name}</h1>
                  {isOwner && (
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                {circle.description && (
                  <p className="text-gray-600 text-sm ml-11">{circle.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 ml-11">
              <span>
                <strong>{members.length}</strong> {members.length === 1 ? 'Mitglied' : 'Mitglieder'}
              </span>
              <span>
                <strong>{projects.length}</strong> {projects.length === 1 ? 'Vorhaben' : 'Vorhaben'}
              </span>
              {circle.owner && (
                <span>
                  Admin: <strong>{circle.owner.username || circle.owner.email}</strong>
                </span>
              )}
            </div>

            {/* Invite Actions */}
            {isOwner && (
              <div className="mt-5 ml-11 flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleGenerateInvite}
                  disabled={generatingInvite}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {generatingInvite ? 'Generiere…' : '🔗 Einladungslink generieren & kopieren'}
                </button>
                {inviteToken && (
                  <button
                    onClick={handleCopyInvite}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    📋 Link erneut kopieren
                  </button>
                )}
              </div>
            )}

            {inviteToken && (
              <div className="mt-3 ml-11 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-700 font-mono break-all">
                {window?.location?.origin}/circles/join?token={inviteToken}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Members */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Mitglieder</h2>
                {members.length === 0 ? (
                  <p className="text-gray-500 text-sm">Noch keine Mitglieder.</p>
                ) : (
                  <ul className="space-y-3 list-none">
                    {members.map((member) => (
                      <li key={member.id} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                          {(member.username || member.email || '?')[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">
                            {member.username || member.email || `Member #${member.id}`}
                          </p>
                          {member.email && member.username && (
                            <p className="text-xs text-gray-400 truncate">{member.email}</p>
                          )}
                        </div>
                        {String(member.id) === String(circle.owner?.id) && (
                          <span className="ml-auto text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full shrink-0">
                            Admin
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {!isOwner && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">Nur Admins können Mitglieder verwalten.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Vorhaben dieses Kreises</h2>
                  <Link
                    href="/projects/new"
                    className="px-3 py-1.5 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    + Vorhaben
                  </Link>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📋</div>
                    <p className="text-gray-500 text-sm mb-4">
                      Noch keine Vorhaben in diesem Kreis.
                    </p>
                    <Link
                      href="/projects/new"
                      className="inline-block px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      Erstes Vorhaben einreichen
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-3 list-none">
                    {projects.map((project) => {
                      const status = statusLabels[project.status] || statusLabels.draft
                      return (
                        <li key={project.id}>
                          <Link
                            href={`/projects/${project.id}`}
                            className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all"
                          >
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm truncate mb-1">{project.name}</h3>
                              {project.description && (
                                <p className="text-xs text-gray-500 line-clamp-2">
                                  {project.description}
                                </p>
                              )}
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${status.color}`}
                            >
                              {status.label}
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
