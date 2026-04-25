'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Unbehandelter Fehler:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🗳️</span>
            <span className="text-xl font-bold">adlix consent</span>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-4" aria-hidden="true">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Etwas ist schiefgelaufen</h1>
          <p className="text-gray-600 mb-2">
            Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
          </p>
          {error.message && (
            <p className="text-sm text-gray-500 mb-6 font-mono bg-gray-100 rounded-lg p-3 text-left break-all">
              {error.message}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Erneut versuchen
            </button>
            <a
              href="/"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            >
              Zur Startseite
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
