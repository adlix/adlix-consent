'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { strapi } from '@/lib/strapi'

interface ProjectData {
  id: number
  name: string
  description: string
  goal?: string
  tension?: string
  status: string
  owner?: { id: number }
  circle?: { id: number; name: string }
}

interface FieldErrors {
  name?: string
  description?: string
}

export default function EditProjectPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { data: session, status: authStatus } = useSession()
  const jwt = (session as unknown as { jwt?: string })?.jwt
  const userId = (session?.user as unknown as { id?: string | number })?.id

  const [project, setProject] = useState<ProjectData | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [goal, setGoal] = useState('')
  const [tension, setTension] = useState('')
  const [circles, setCircles] = useState<{ id: number; name: string }[]>([])
  const [selectedCircle, setSelectedCircle] = useState<number | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (authStatus === 'loading') return
    if (!jwt) {
      router.push('/login')
      return
    }
    strapi.setJwt(jwt)

    Promise.all([strapi.getProject(params.id, 'owner,circle'), strapi.getCircles()])
      .then(([projRes, circlesRes]) => {
        const p = (projRes as { data: ProjectData }).data
        setProject(p)
        setName(p.name)
        setDescription(p.description)
        setGoal(p.goal || '')
        setTension(p.tension || '')
        setSelectedCircle(p.circle?.id || null)
        setCircles(
          ((circlesRes as { data: unknown[] }).data || []).map((c: unknown) => {
            const circle = c as { id: number; name: string }
            return { id: circle.id, name: circle.name }
          })
        )
      })
      .catch(() => setError('Projekt konnte nicht geladen werden.'))
      .finally(() => setLoading(false))
  }, [params.id, jwt, authStatus, router])

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {}
    if (touched.name && !name.trim()) errors.name = 'Titel ist ein Pflichtfeld.'
    else if (touched.name && name.trim().length < 3) errors.name = 'Mindestens 3 Zeichen.'
    if (touched.description && !description.trim())
      errors.description = 'Beschreibung ist ein Pflichtfeld.'
    else if (touched.description && description.trim().length < 10)
      errors.description = 'Mindestens 10 Zeichen.'
    return errors
  }

  const fieldErrors = validate()

  const isOwner = project && String(userId) === String(project.owner?.id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, description: true })
    if (
      !name.trim() ||
      name.trim().length < 3 ||
      !description.trim() ||
      description.trim().length < 10
    )
      return

    setSaving(true)
    setError(null)
    strapi.setJwt(jwt || null)
    try {
      await strapi.updateProject(Number(params.id), {
        name: name.trim(),
        description: description.trim(),
        goal: goal.trim() || undefined,
        tension: tension.trim() || undefined,
        circle: selectedCircle || null,
      })
      setSaved(true)
      setTimeout(() => router.push(`/projects/${params.id}`), 1200)
    } catch {
      setError('Änderungen konnten nicht gespeichert werden.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-3xl mb-4 animate-pulse">✏️</div>
          <p className="text-gray-500">Lade Vorhaben…</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Vorhaben nicht gefunden.'}</p>
          <Link href="/projects" className="text-blue-600 hover:text-blue-700">
            ← Zurück
          </Link>
        </div>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-lg font-semibold mb-2">Keine Berechtigung</h2>
          <p className="text-gray-500 mb-4">Nur der Einreicher des Vorhabens kann es bearbeiten.</p>
          <Link href={`/projects/${params.id}`} className="text-blue-600 hover:text-blue-700">
            ← Zum Vorhaben
          </Link>
        </div>
      </div>
    )
  }

  if (project.status === 'beschlossen' || project.status === 'completed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-lg font-semibold mb-2">Vorhaben abgeschlossen</h2>
          <p className="text-gray-500 mb-4">
            Beschlossene Vorhaben können nicht mehr bearbeitet werden.
          </p>
          <Link href={`/projects/${params.id}`} className="text-blue-600 hover:text-blue-700">
            ← Zum Vorhaben
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
            <Link
              href={`/projects/${params.id}`}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              ← Zum Vorhaben
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {saved && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-medium text-emerald-800">Änderungen gespeichert!</p>
                <p className="text-sm text-emerald-600">Du wirst weitergeleitet…</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Vorhaben bearbeiten</h1>
              <p className="text-gray-500 text-sm">
                Passe Titel, Beschreibung, Ziel oder Spannung an. Aktive Abstimmungsrunden laufen
                weiter — informiere deinen Kreis über wesentliche Änderungen.
              </p>
            </div>

            {project.status === 'active' && (
              <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                ⚠️ Das Vorhaben ist aktiv. Wesentliche Änderungen am Vorschlag sollten transparent
                kommuniziert werden — z.\u00a0B. als Anpassungsphase in der laufenden Runde.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Titel */}
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium mb-1.5">
                  Titel{' '}
                  <span aria-hidden="true" className="text-red-500">
                    *
                  </span>
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  maxLength={200}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-shadow ${
                    fieldErrors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="z.\u00a0B. Neues Remote-Work-Modell"
                />
                <p className="text-xs text-gray-400 mt-1">{name.length}/200</p>
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Beschreibung */}
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium mb-1.5">
                  Beschreibung{' '}
                  <span aria-hidden="true" className="text-red-500">
                    *
                  </span>
                </label>
                <textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, description: true }))}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm transition-shadow ${
                    fieldErrors.description ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Was ist das Vorhaben? Worum geht es?"
                />
                {fieldErrors.description && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {fieldErrors.description}
                  </p>
                )}
              </div>

              {/* Ziel */}
              <div>
                <label htmlFor="edit-goal" className="block text-sm font-medium mb-1.5">
                  Ziel <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="edit-goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm transition-shadow"
                  placeholder="Was soll mit dem Vorhaben erreicht werden?"
                />
              </div>

              {/* Spannung */}
              <div>
                <label htmlFor="edit-tension" className="block text-sm font-medium mb-1.5">
                  Spannung / Problem <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="edit-tension"
                  value={tension}
                  onChange={(e) => setTension(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm transition-shadow"
                  placeholder="Welche Reibung oder welches Problem soll gelöst werden?"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Hilft dem Kreis zu verstehen, <em>warum</em> dieses Vorhaben jetzt wichtig ist.
                </p>
              </div>

              {/* Kreis */}
              {circles.length > 0 && (
                <div>
                  <label htmlFor="edit-circle" className="block text-sm font-medium mb-1.5">
                    Kreis <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <select
                    id="edit-circle"
                    value={selectedCircle ?? ''}
                    onChange={(e) =>
                      setSelectedCircle(e.target.value ? Number(e.target.value) : null)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm bg-white"
                  >
                    <option value="">Kein Kreis</option>
                    {circles.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || saved}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
                >
                  {saving ? 'Speichere…' : saved ? '✅ Gespeichert' : '💾 Änderungen speichern'}
                </button>
                <Link
                  href={`/projects/${params.id}`}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm text-center"
                >
                  Abbrechen
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
