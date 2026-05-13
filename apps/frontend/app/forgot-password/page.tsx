'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      // Always show success to prevent email enumeration
      setSent(true)
    } catch {
      setError('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🗳️</span>
            <span className="text-2xl font-bold">adlix consent</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {sent ? (
            <>
              <h1 className="text-xl font-semibold mb-4">E-Mail verschickt</h1>
              <p className="text-gray-600 mb-6">
                Falls ein Konto mit <strong>{email}</strong> existiert, haben wir eine E-Mail mit einem
                Link zum Zurücksetzen des Passworts geschickt.
              </p>
              <Link
                href="/login"
                className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Zurück zur Anmeldung
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold mb-2">Passwort vergessen?</h1>
              <p className="text-gray-600 text-sm mb-6">
                Gib deine E-Mail-Adresse ein und wir schicken dir einen Link zum Zurücksetzen.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Wird gesendet…' : 'Link anfordern'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Zurück zur Anmeldung
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}