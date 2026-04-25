'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { OnboardingProvider } from '../../components/Onboarding/OnboardingContext'

const OnboardingFlow = dynamic(
  () => import('../../components/Onboarding/OnboardingFlow').then((m) => ({ default: m.OnboardingFlow })),
  { ssr: false }
)

// Types
interface Circle {
  id: number
  name: string
  memberCount: number
  role: 'admin' | 'member'
  lastActivity: string
}

interface Proposal {
  id: number
  title: string
  circleName: string
  phase: 'description' | 'reaction' | 'voting' | 'integration'
  needsVote: boolean
}

interface Activity {
  id: number
  type: 'invitation' | 'proposal' | 'consent' | 'objection'
  message: string
  timestamp: string
}

// Mock data (später durch API-Calls ersetzen)
const mockCircles: Circle[] = [
  { id: 1, name: 'Agile Tribe Gründer', memberCount: 12, role: 'admin', lastActivity: '2h' },
  { id: 2, name: 'Die Problemlöser', memberCount: 28, role: 'member', lastActivity: '1d' },
  { id: 3, name: 'Herzkohärenz Kreis', memberCount: 8, role: 'admin', lastActivity: '3d' },
]

const mockProposals: Proposal[] = [
  {
    id: 1,
    title: 'Neues Onboarding einführen',
    circleName: 'Agile Tribe Gründer',
    phase: 'voting',
    needsVote: true,
  },
  {
    id: 2,
    title: 'Budget für Q3 2026',
    circleName: 'Die Problemlöser',
    phase: 'description',
    needsVote: false,
  },
  {
    id: 3,
    title: 'Slack-Integration aktivieren',
    circleName: 'Herzkohärenz Kreis',
    phase: 'integration',
    needsVote: false,
  },
]

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'invitation',
    message: 'Du wurdest eingeladen zu „Agile Tribe Gründer"',
    timestamp: '2h',
  },
  {
    id: 2,
    type: 'proposal',
    message: 'Neues Vorhaben „Neues Onboarding" in „Agile Tribe Gründer"',
    timestamp: '3h',
  },
  { id: 3, type: 'consent', message: 'Konsent erreicht in „Herzkohärenz Kreis"', timestamp: '1d' },
]

const phaseLabels: Record<string, string> = {
  description: 'Beschreibung',
  reaction: 'Reaktionsrunde',
  voting: 'Abstimmung',
  integration: 'Integration',
}

export default function DashboardPage() {
  const [circles] = useState<Circle[]>(mockCircles)
  const [proposals] = useState<Proposal[]>(mockProposals)
  const [activities] = useState<Activity[]>(mockActivities)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'invitation': return '📩'
      case 'proposal': return '📝'
      case 'consent': return '✅'
      case 'objection': return '✋'
      default: return '📌'
    }
  }

  const getActivityIconLabel = (type: string) => {
    switch (type) {
      case 'invitation': return 'Einladung'
      case 'proposal': return 'Vorhaben'
      case 'consent': return 'Konsent'
      case 'objection': return 'Einspruch'
      default: return 'Aktivität'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🗳️</span>
            <span className="text-xl font-bold">adlix consent</span>
          </div>
          <nav aria-label="Hauptnavigation">
            <ul className="flex items-center gap-4 list-none">
              <li>
                <Link href="/dashboard" className="text-primary font-medium" aria-current="page">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/circles" className="text-gray-600 hover:text-gray-900">
                  Kreise
                </Link>
              </li>
              <li>
                <Link href="/proposals" className="text-gray-600 hover:text-gray-900">
                  Vorhaben
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  aria-label="Benutzerprofil öffnen"
                  className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm hover:opacity-90"
                >
                  M
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Willkommen zurück!</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Linke Spalte: Kreise + Vorhaben */}
          <div className="lg:col-span-2 space-y-8">
            {/* Meine Kreise */}
            <section aria-labelledby="circles-heading" className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 id="circles-heading" className="text-lg font-semibold">Meine Kreise</h2>
                <Link href="/circles/new" className="text-sm text-primary hover:underline">
                  + Kreis erstellen
                </Link>
              </div>

              {circles.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
                  {circles.map((circle) => (
                    <li key={circle.id}>
                      <div
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium">{circle.name}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              circle.role === 'admin'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                            aria-label={`Rolle: ${circle.role === 'admin' ? 'Admin' : 'Mitglied'}`}
                          >
                            {circle.role === 'admin' ? 'Admin' : 'Member'}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                          <span><span aria-hidden="true">👥 </span>{circle.memberCount} Mitglieder</span>
                          <span><span aria-hidden="true">🕐 </span>vor {circle.lastActivity}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Du bist noch in keinem Kreis</p>
                  <Link href="/circles/join" className="text-primary hover:underline">
                    Kreis beitreten oder erstellen
                  </Link>
                </div>
              )}
            </section>

            {/* Aktive Vorhaben */}
            <section aria-labelledby="proposals-heading" className="bg-white rounded-xl shadow-sm p-6">
              <h2 id="proposals-heading" className="text-lg font-semibold mb-4">Aktive Vorhaben</h2>

              {proposals.length > 0 ? (
                <ul className="space-y-3 list-none">
                  {proposals.map((proposal) => (
                    <li
                      key={proposal.id}
                      className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
                    >
                      <div>
                        <h3 className="font-medium">{proposal.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>{proposal.circleName}</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                            {phaseLabels[proposal.phase]}
                          </span>
                        </div>
                      </div>
                      {proposal.needsVote && (
                        <Link
                          href={`/proposals/${proposal.id}/vote`}
                          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                          aria-label={`Abstimmen: ${proposal.title}`}
                        >
                          Abstimmen
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">Keine aktiven Vorhaben</p>
              )}
            </section>
          </div>

          {/* Rechte Spalte: Aktivitäten + Schnellaktionen */}
          <div className="space-y-8">
            {/* Letzte Aktivitäten */}
            <section aria-labelledby="activities-heading" className="bg-white rounded-xl shadow-sm p-6">
              <h2 id="activities-heading" className="text-lg font-semibold mb-4">Letzte Aktivitäten</h2>

              {activities.length > 0 ? (
                <ul className="space-y-4 list-none">
                  {activities.map((activity) => (
                    <li key={activity.id} className="flex gap-3">
                      <span className="text-xl" aria-label={getActivityIconLabel(activity.type)}>
                        {getActivityIcon(activity.type)}
                      </span>
                      <div>
                        <p className="text-sm">{activity.message}</p>
                        <time className="text-xs text-gray-400">vor {activity.timestamp}</time>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">Keine aktuellen Aktivitäten</p>
              )}
            </section>

            {/* Schnellaktionen */}
            <section aria-labelledby="quick-actions-heading" className="bg-white rounded-xl shadow-sm p-6">
              <h2 id="quick-actions-heading" className="text-lg font-semibold mb-4">Schnellaktionen</h2>

              <nav aria-label="Schnellaktionen">
                <ul className="space-y-3 list-none">
                  <li>
                    <Link
                      href="/circles/new"
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                    >
                      <span className="text-xl" aria-hidden="true">🆕</span>
                      <span className="font-medium">Kreis erstellen</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/proposals/new"
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                    >
                      <span className="text-xl" aria-hidden="true">📝</span>
                      <span className="font-medium">Vorhaben einreichen</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.origin + '/join')
                        alert('Einladungslink kopiert!')
                      }}
                      aria-label="Einladungslink in Zwischenablage kopieren"
                      className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                    >
                      <span className="text-xl" aria-hidden="true">🔗</span>
                      <span className="font-medium">Einladung teilen</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setShowOnboarding(true)}
                      aria-label="Onboarding starten"
                      className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                    >
                      <span className="text-xl" aria-hidden="true">🚀</span>
                      <span className="font-medium">Onboarding starten</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
        </div>
      </main>

      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <button
            type="button"
            onClick={() => setShowOnboarding(false)}
            aria-label="Onboarding schließen"
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 text-xl"
          >
            ✕
          </button>
          <OnboardingProvider>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-pulse text-gray-400">Lädt...</div>
                </div>
              }
            >
              <OnboardingFlow />
            </Suspense>
          </OnboardingProvider>
        </div>
      )}
    </div>
  )
}
