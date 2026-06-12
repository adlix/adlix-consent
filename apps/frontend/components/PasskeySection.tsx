'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface Credential {
  id: string
  shortId: string
  transports: string[]
  createdAt: string
}

export default function PasskeySection() {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loadingCreds, setLoadingCreds] = useState(true)
  const [addStatus, setAddStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [addMessage, setAddMessage] = useState('')
  const [deleteStatus, setDeleteStatus] = useState<Record<string, 'idle' | 'loading' | 'error'>>({})
  const mounted = useRef(false)

  const fetchCredentials = useCallback(async () => {
    setLoadingCreds(true)
    try {
      const res = await fetch('/api/auth/passkey/credentials')
      if (res.ok) {
        const data = await res.json()
        setCredentials(data.credentials || [])
      }
    } catch {
      // silently ignore
    } finally {
      setLoadingCreds(false)
    }
  }, [])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      fetchCredentials()
    }
  }, [fetchCredentials])

  const handleAddPasskey = async () => {
    setAddStatus('loading')
    setAddMessage('')
    try {
      const { startRegistration } = await import('@simplewebauthn/browser')

      const optRes = await fetch('/api/auth/passkey/register-options', { method: 'POST' })
      if (!optRes.ok) {
        const data = await optRes.json()
        setAddStatus('error')
        setAddMessage(data.error || 'Optionen konnten nicht geladen werden.')
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
        setAddStatus('success')
        setAddMessage('Passkey erfolgreich hinzugefügt!')
        await fetchCredentials()
        setTimeout(() => setAddStatus('idle'), 3000)
      } else {
        const data = await verifyRes.json()
        setAddStatus('error')
        setAddMessage(data.error || 'Passkey konnte nicht gespeichert werden.')
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'NotAllowedError') {
        setAddStatus('idle')
        setAddMessage('')
      } else {
        setAddStatus('error')
        setAddMessage('Passkey konnte nicht hinzugefügt werden.')
        console.error(err)
      }
    }
  }

  const handleDeletePasskey = async (credId: string) => {
    setDeleteStatus((s) => ({ ...s, [credId]: 'loading' }))
    try {
      const res = await fetch(`/api/auth/passkey/credentials/${credId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setCredentials((prev) => prev.filter((c) => c.id !== credId))
      } else {
        const data = await res.json()
        setDeleteStatus((s) => ({ ...s, [credId]: 'error' }))
        setAddStatus('error')
        setAddMessage(data.error || 'Löschen fehlgeschlagen.')
        setTimeout(() => setAddStatus('idle'), 4000)
      }
    } catch {
      setDeleteStatus((s) => ({ ...s, [credId]: 'error' }))
    } finally {
      setDeleteStatus((s) => ({ ...s, [credId]: 'idle' }))
    }
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return iso
    }
  }

  const transportLabel = (transports: string[]) => {
    if (transports.includes('hybrid')) return ' Smartphone (Passkey-App)'
    if (transports.includes('internal')) return ' Fingerabdruck / Gesichtserkennung'
    if (transports.includes('usb')) return ' USB-Key'
    return ''
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-lg font-semibold">Passkeys</h2>
        {credentials.length > 0 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            {credentials.length} {credentials.length === 1 ? 'Key' : 'Keys'}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-5">
        Melde dich sicher an — ohne Passwort. Über Fingerabdruck, Gesichtserkennung oder einen
        Hardware-Key.
      </p>

      {/* Status messages */}
      {addStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
          <span>✅</span>
          <span>{addMessage}</span>
        </div>
      )}
      {addStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
          <span>⚠️</span>
          <span>{addMessage}</span>
        </div>
      )}

      {/* Registered credentials list */}
      {loadingCreds ? (
        <div className="animate-pulse space-y-2 mb-5">
          {[1, 2].map((i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg" />
          ))}
        </div>
      ) : credentials.length > 0 ? (
        <div className="space-y-2 mb-5">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <span className="text-lg" role="img" aria-hidden="true">
                  🔐
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">Passkey ····{cred.shortId}</p>
                <p className="text-xs text-gray-500">
                  {transportLabel(cred.transports)}
                  {cred.createdAt && ` · Hinzugefügt ${formatDate(cred.createdAt)}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDeletePasskey(cred.id)}
                disabled={deleteStatus[cred.id] === 'loading'}
                className="shrink-0 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 disabled:opacity-40 transition-colors"
                title="Passkey entfernen"
              >
                {deleteStatus[cred.id] === 'loading' ? '…' : 'Entfernen'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-5 p-4 rounded-xl border border-dashed border-gray-300 text-center">
          <p className="text-sm text-gray-500 mb-2">Noch kein Passkey eingerichtet.</p>
          <p className="text-xs text-gray-400">
            Ein Passkey ermöglicht Anmeldung ohne Passwort — sicherer und schneller.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddPasskey}
        disabled={addStatus === 'loading'}
        className="flex items-center gap-2 py-2.5 px-5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors text-sm font-medium"
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
        {addStatus === 'loading' ? 'Warte auf Passkey…' : '+ Passkey hinzufügen'}
      </button>
    </div>
  )
}
