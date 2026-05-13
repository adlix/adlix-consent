import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Einstellungen — adlix consent',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-56 shrink-0">
          <nav className="space-y-1">
            <a
              href="/settings"
              className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700"
            >
              👤 Konto
            </a>
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
        <div className="flex-1">{children}</div>
      </div>
    </main>
  )
}
