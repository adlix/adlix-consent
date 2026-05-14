'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface AppHeaderProps {
  user?: {
    email?: string
    username?: string
  } | null
}

export default function AppHeader({ user }: AppHeaderProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : user?.email
      ? user.email.slice(0, 2).toUpperCase()
      : '??'

  return (
    <header className="bg-white border-b border-gray-200" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              🗳️
            </span>
            <span className="text-xl font-bold">adlix consent</span>
          </Link>
        </div>

        <nav aria-label="Hauptnavigation" className="hidden sm:flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/circles" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Kreise
          </Link>
          <Link href="/projects" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Vorhaben
          </Link>
        </nav>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Benutzermenu öffnen"
            aria-expanded={open}
            aria-haspopup="menu"
            className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {initials}
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50"
            >
              {user?.email && (
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              )}

              <Link
                href="/settings/password"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span aria-hidden="true">🔑</span>
                Passwort ändern
              </Link>

              <Link
                href="/settings/billing"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span aria-hidden="true">💳</span>
                Abrechnung
              </Link>

              <Link
                href="/settings"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span aria-hidden="true">⚙️</span>
                Einstellungen
              </Link>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <span aria-hidden="true">🚪</span>
                  Abmelden
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
