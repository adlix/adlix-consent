'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpMode, setOtpMode] = useState(false)
  const [otpEmail, setOtpEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)

  const handleSocialLogin = (provider: string) => {
    window.location.href = `/api/auth/social/${provider}`
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Anmeldung fehlgeschlagen.')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setOtpLoading(true)

    try {
      await fetch('/api/auth/one-time-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail }),
      })
      setOtpSent(true)
    } catch {
      setError('Code konnte nicht gesendet werden.')
    } finally {
      setOtpLoading(false)
    }
  }

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setOtpLoading(true)

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail, code: otpCode }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Ungültiger Code.')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Verbindungsfehler.')
    } finally {
      setOtpLoading(false)
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
          {otpMode ? (
            <>
              <h1 className="text-xl font-semibold mb-6">Mit Einmalcode anmelden</h1>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              {!otpSent ? (
                <form onSubmit={handleOtpRequest} className="space-y-4">
                  <div>
                    <label htmlFor="otpEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail
                    </label>
                    <input
                      id="otpEmail"
                      type="email"
                      value={otpEmail}
                      onChange={(e) => setOtpEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {otpLoading ? 'Wird gesendet…' : 'Code anfordern'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpVerify} className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Wir haben einen 6-stelligen Code an <strong>{otpEmail}</strong> geschickt.
                  </p>
                  <div>
                    <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Anmeldecode
                    </label>
                    <input
                      id="otpCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-[0.5em]"
                      required
                      autoComplete="one-time-code"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {otpLoading ? 'Wird geprüft…' : 'Anmelden'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtpCode('') }}
                    className="w-full text-sm text-gray-600 hover:text-gray-800"
                  >
                    Neuen Code anfordern
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => { setOtpMode(false); setError('') }}
                className="mt-4 w-full text-sm text-gray-600 hover:text-gray-800"
              >
                Zurück zur Passwort-Anmeldung
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold mb-6">Anmelden</h1>

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwort
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Passwort vergessen?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Wird angemeldet…' : 'Anmelden'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => { setOtpMode(true); setError('') }}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Mit Einmalcode anmelden
                </button>
              </div>

              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300" />
                <span className="px-4 text-sm text-gray-500">oder</span>
                <div className="flex-1 border-t border-gray-300" />
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Mit GitHub anmelden
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Mit Facebook anmelden
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-gray-600">
                Noch kein Konto?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  Registrieren
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}