'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const code = searchParams.get('code')

  useEffect(() => {
    if (!code) {
      setError('Ungültiger oder fehlender Link. Bitte fordere einen neuen an.')
    }
  }, [code])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('Die Passwörter stimmen nicht überein.')
      return
    }

    if (!code) {
      setError('Ungültiger Link. Bitte fordere einen neuen an.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Zurücksetzen fehlgeschlagen. Der Link könnte abgelaufen sein.')
        return
      }

      setSuccess(true)
    } catch {
      setError('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="text-xl font-semibold mb-2">Passwort geändert!</h1>
        <p className="text-gray-600 mb-6">Dein Passwort wurde erfolgreich zurückgesetzt.</p>
        <Link
          href="/login"
          className="inline-block py-2 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Jetzt anmelden
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h1 className="text-xl font-semibold mb-6">Neues Passwort festlegen</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Neues Passwort
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            minLength={6}
            autoComplete="new-password"
          />
          <p className="mt-1 text-xs text-gray-500">Mindestens 6 Zeichen</p>
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
            Passwort wiederholen
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !code}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Wird geändert…' : 'Passwort ändern'}
        </button>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🗳️</span>
            <span className="text-2xl font-bold">adlix consent</span>
          </Link>
        </div>
        <Suspense fallback={<div className="text-center py-12 text-gray-400">Lädt…</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
