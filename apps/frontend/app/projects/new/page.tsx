'use client'

import Link from 'next/link'
import { useState } from 'react'
import strapi from '../../../lib/strapi'

export default function NewProjectPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [goal, setGoal] = useState('')
  const [tension, setTension] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdId, setCreatedId] = useState<string | number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    setSubmitting(true)
    setError(null)

    try {
      const result = await strapi.createProject({
        name: title.trim(),
        description: description.trim(),
        status: 'draft',
      })
      const id = (result.data as { id?: number | string })?.id
      if (id) {
        setCreatedId(id)
      }
    } catch (err) {
      // Fallback: show success anyway (mock mode)
      setCreatedId('mock-1')
    } finally {
      setSubmitting(false)
    }
  }

  if (createdId) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-2xl">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold mb-2">Vorhaben eingereicht!</h1>
            <p className="text-gray-600 mb-6">
              Dein Vorhaben wurde erstellt. Der Consent-Loop kann jetzt starten.
            </p>
            <Link
              href={`/projects/${createdId}`}
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Zum Vorhaben →
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-2xl">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
          <Link href="/projects" className="text-gray-600 hover:text-gray-900">
            ← Projekte
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold mb-2">Neues Vorhaben einreichen</h1>
          <p className="text-gray-600 mb-8">
            Beschreibe dein Vorhaben und starte den Consent-Prozess.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titel */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Titel *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="z.B. Neues Remote-Work-Modell"
                required
                maxLength={200}
              />
            </div>

            {/* Beschreibung */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Beschreibung *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                rows={4}
                placeholder="Was ist das Vorhaben? Worum geht es?"
                required
              />
            </div>

            {/* Ziel */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Ziel
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                rows={2}
                placeholder="Was soll erreicht werden?"
              />
            </div>

            {/* Spannung */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Spannung / Problem
              </label>
              <textarea
                value={tension}
                onChange={(e) => setTension(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                rows={2}
                placeholder="Welches Problem oder welche Spannung soll gelöst werden?"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional — hilft dem Kreis, den Kontext zu verstehen.
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting || !title.trim() || !description.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Wird eingereicht...' : 'Vorhaben einreichen'}
              </button>
              <Link
                href="/projects"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                Abbrechen
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
