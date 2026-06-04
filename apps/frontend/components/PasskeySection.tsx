'use client'

import { useState } from 'react'

export default function PasskeySection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleAddPasskey = async () => {
    setStatus('loading')
    setMessage('')
    try {
      const { startRegistration } = await import('@simplewebauthn/browser')

      const optRes = await fetch('/api/auth/passkey/register-options', { method: 'POST' })
      if (!optRes.ok) {
        const data = await optRes.json()
        setStatus('error')
        setMessage(data.error || 'Optionen konnten nicht geladen werden.')
        return
      }
      const options = await optRes.json()

      const regResponse = await startRegistration({ optionsJSON: options })

      const verifyRes = await fetch('/api/auth/passkey/register-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regResponse),
      })

      if (verifyRes.ok) {
        setStatus('success')
        setMessage('Passkey erfolgreich hinzugefügt!')
      } else {
        const data = await verifyRes.json()
        setStatus('error')
        setMessage(data.error || 'Passkey konnte nicht gespeichert werden.')
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'NotAllowedError') {
        setStatus('idle')
        setMessage('')
      } else {
        setStatus('error')
        setMessage('Passkey konnte nicht hinzugefügt werden.')
        console.error(err)
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-2">Passkeys</h2>
      <p className="text-sm text-gray-600 mb-4">
        Mit einem Passkey kannst du dich sicher und ohne Passwort anmelden – über Fingerabdruck,
        Gesichtserkennung oder einen Hardware-Key.
      </p>

      {status === 'success' && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {message}
        </div>
      )}

      <button
        type="button"
        onClick={handleAddPasskey}
        disabled={status === 'loading'}
        className="flex items-center gap-2 py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors text-sm"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="8" cy="7" r="4" />
          <path d="M20 21v-1a4 4 0 0 0-4-4h-1" />
          <path d="M16 11h6m-3-3v6" />
        </svg>
        {status === 'loading' ? 'Warte auf Passkey…' : 'Passkey hinzufügen'}
      </button>
    </div>
  )
}
