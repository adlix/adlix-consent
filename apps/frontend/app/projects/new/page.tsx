'use client'

import Link from 'next/link'
import { useState } from 'react'
import strapi from '../../../lib/strapi'

interface FieldErrors {
  title?: string
  description?: string
}

export default function NewProjectPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [goal, setGoal] = useState('')
  const [tension, setTension] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [networkError, setNetworkError] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [createdId, setCreatedId] = useState<string | number | null>(null)

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {}
    if (touched.title && !title.trim()) {
      errors.title = 'Titel ist ein Pflichtfeld.'
    } else if (touched.title && title.trim().length < 3) {
      errors.title = 'Titel muss mindestens 3 Zeichen lang sein.'
    }
    if (touched.description && !description.trim()) {
      errors.description = 'Beschreibung ist ein Pflichtfeld.'
    } else if (touched.description && description.trim().length < 10) {
      errors.description = 'Beschreibung muss mindestens 10 Zeichen lang sein.'
    }
    return errors
  }

  const fieldErrors = validate()

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ title: true, description: true })

    if (!title.trim() || title.trim().length < 3 || !description.trim() || description.trim().length < 10) return

    setSubmitting(true)
    setNetworkError(null)

    try {
      const result = await strapi.createProject({
        name: title.trim(),
        description: description.trim(),
        status: 'draft',
      })
      const id = (result.data as { id?: number | string })?.id
      if (id) {
        setCreatedId(id)
      } else {
        setCreatedId('mock-1')
      }
    } catch {
      setNetworkError(
        'Das Vorhaben konnte nicht eingereicht werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetry = () => {
    setNetworkError(null)
    handleSubmit(new Event('submit') as unknown as React.FormEvent)
  }

  if (createdId) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded" aria-label="adlix consent Startseite">
              <span className="text-2xl" aria-hidden="true">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
        </header>
        <main id="main-content" className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-5xl mb-4" aria-hidden="true">🎉</div>
            <h1 className="text-2xl font-bold mb-2">Vorhaben eingereicht!</h1>
            <p className="text-gray-600 mb-6">
              Dein Vorhaben wurde erstellt. Der Consent-Loop kann jetzt starten.
            </p>
            <Link
              href={`/projects/${createdId}`}
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Zum Vorhaben →
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const isSubmittable =
    title.trim().length >= 3 && description.trim().length >= 10 && !submitting

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded" aria-label="adlix consent Startseite">
              <span className="text-2xl" aria-hidden="true">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
          <Link href="/projects" className="text-gray-600 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
            ← Projekte
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold mb-2">Neues Vorhaben einreichen</h1>
          <p className="text-gray-600 mb-8">
            Beschreibe dein Vorhaben und starte den Consent-Prozess.
          </p>

          {networkError && (
            <div
              role="alert"
              className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 text-red-700 text-sm"
            >
              <p className="font-medium mb-2">Fehler beim Einreichen</p>
              <p>{networkError}</p>
              <button
                onClick={handleRetry}
                disabled={submitting}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                {submitting ? 'Wird versucht...' : 'Erneut versuchen'}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Neues Vorhaben einreichen">
            {/* Titel */}
            <div>
              <label htmlFor="field-title" className="block text-sm font-medium mb-1">
                Titel <span aria-hidden="true" className="text-red-500">*</span>
                <span className="sr-only">(Pflichtfeld)</span>
              </label>
              <input
                id="field-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleBlur('title')}
                aria-required="true"
                aria-invalid={!!fieldErrors.title}
                aria-describedby={fieldErrors.title ? 'error-title' : 'hint-title'}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  fieldErrors.title ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
                placeholder="z.B. Neues Remote-Work-Modell"
                maxLength={200}
              />
              <p id="hint-title" className="text-xs text-gray-500 mt-1">
                {title.length}/200 Zeichen · Mindestens 3 Zeichen
              </p>
              {fieldErrors.title && (
                <p id="error-title" role="alert" className="mt-1 text-sm text-red-600">
                  {fieldErrors.title}
                </p>
              )}
            </div>

            {/* Beschreibung */}
            <div>
              <label htmlFor="field-description" className="block text-sm font-medium mb-1">
                Beschreibung <span aria-hidden="true" className="text-red-500">*</span>
                <span className="sr-only">(Pflichtfeld)</span>
              </label>
              <textarea
                id="field-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur('description')}
                aria-required="true"
                aria-invalid={!!fieldErrors.description}
                aria-describedby={fieldErrors.description ? 'error-description' : undefined}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  fieldErrors.description ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
                rows={4}
                placeholder="Was ist das Vorhaben? Worum geht es?"
              />
              {fieldErrors.description && (
                <p id="error-description" role="alert" className="mt-1 text-sm text-red-600">
                  {fieldErrors.description}
                </p>
              )}
            </div>

            {/* Ziel */}
            <div>
              <label htmlFor="field-goal" className="block text-sm font-medium mb-1">
                Ziel
              </label>
              <textarea
                id="field-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                rows={2}
                placeholder="Was soll erreicht werden?"
              />
            </div>

            {/* Spannung */}
            <div>
              <label htmlFor="field-tension" className="block text-sm font-medium mb-1">
                Spannung / Problem
              </label>
              <textarea
                id="field-tension"
                value={tension}
                onChange={(e) => setTension(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                rows={2}
                placeholder="Welches Problem oder welche Spannung soll gelöst werden?"
                aria-describedby="hint-tension"
              />
              <p id="hint-tension" className="text-xs text-gray-500 mt-1">
                Optional — hilft dem Kreis, den Kontext zu verstehen.
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={!isSubmittable}
                aria-disabled={!isSubmittable}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {submitting ? 'Wird eingereicht...' : 'Vorhaben einreichen'}
              </button>
              <Link
                href="/projects"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
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
