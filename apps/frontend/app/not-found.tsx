import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded" aria-label="adlix consent Startseite">
              <span className="text-2xl" aria-hidden="true">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="text-8xl font-bold text-gray-200 mb-4" aria-hidden="true">404</div>
          <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Seite nicht gefunden</h1>
          <p className="text-gray-600 mb-8">
            Die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Zur Startseite
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            >
              Alle Projekte
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
