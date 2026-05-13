import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Einstellungen — adlix consent',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗳️</span>
            <span className="text-xl font-bold">adlix consent</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</a>
            <span className="text-gray-400">|</span>
            <span className="text-blue-600 font-medium text-sm">Einstellungen</span>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-56 shrink-0">
            <nav className="space-y-1">
              <a
                href="/settings/password"
                className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700"
              >
                🔑 Passwort ändern
              </a>
              <a
                href="/settings/billing"
                className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700"
              >
                💳 Abrechnung
              </a>
            </nav>
          </aside>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}