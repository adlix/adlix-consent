'use client'

import Link from 'next/link'
import { useState } from 'react'

// Mock data
const mockProject = {
  id: 1,
  name: 'Neues Büro-Konzept',
  description: 'Diskussion über flexible Arbeitsplatzgestaltung und Remote-Work-Policy',
  status: 'active',
  owner: { name: 'Matthias Zillig', email: 'matthias@example.com' },
  participantCount: 12,
}

const mockRounds = [
  {
    id: 1,
    roundNumber: 1,
    proposal: 'Wir führen ein hybrides Arbeitsmodell ein: 2 Tage Büro, 3 Tage Remote.',
    status: 'completed',
    startDate: '2026-04-10',
    endDate: '2026-04-14',
    votes: [
      { user: 'Anna', choice: 'consent' },
      { user: 'Tom', choice: 'consent' },
      { user: 'Lisa', choice: 'minor_objection', reason: 'Core-Days sollten frei wählbar sein' },
      { user: 'Max', choice: 'consent' },
      { user: 'Julia', choice: 'abstain' },
    ],
    objections: [],
    comments: [
      {
        id: 1,
        user: 'Anna',
        type: 'question',
        content: 'Wie viele Tage sind verpflichtend im Büro?',
        createdAt: '2026-04-11',
      },
      {
        id: 2,
        user: 'Tom',
        type: 'answer',
        content: 'Der Vorschlag sagt 2 Tage Büro.',
        createdAt: '2026-04-11',
      },
      {
        id: 3,
        user: 'Lisa',
        type: 'reaction',
        content: 'Ich finde das grundsätzlich gut, aber die Core-Days sollten wählbar sein.',
        createdAt: '2026-04-12',
      },
    ],
  },
  {
    id: 2,
    roundNumber: 2,
    proposal: 'Angepasstes Modell: 3 Tage Büro, 2 Tage Remote, mit Core-Days (Di+Do).',
    status: 'voting',
    startDate: '2026-04-15',
    endDate: '2026-04-19',
    votes: [
      { user: 'Anna', choice: 'consent' },
      { user: 'Tom', choice: 'consent' },
      { user: 'Max', choice: 'consent' },
      { user: 'Lisa', choice: 'minor_objection', reason: 'Core-Days sollten frei wählbar sein' },
      { user: 'Julia', choice: 'consent' },
    ],
    objections: [
      {
        id: 1,
        user: 'Lisa',
        severity: 'minor',
        reason: 'Core-Days sollten frei wählbar sein',
        status: 'open',
      },
    ],
    comments: [
      {
        id: 4,
        user: 'Anna',
        type: 'question',
        content: 'Was passiert, wenn man an einem Core-Day verhindert ist?',
        createdAt: '2026-04-15',
      },
      {
        id: 5,
        user: 'Max',
        type: 'reaction',
        content: 'Die Core-Days finde ich gut für Team-Meetings!',
        createdAt: '2026-04-16',
      },
    ],
  },
]

type ConsentChoice = 'consent' | 'minor_objection' | 'major_objection' | 'abstain'

// Consent Flow Phases (matching CONCEPT.md)
const flowPhases = [
  {
    key: 'information',
    label: 'Informationsrunde',
    icon: '❓',
    hint: 'Nur Verständnisfragen — keine Meinungen',
  },
  {
    key: 'reaction',
    label: 'Reaktionsrunde',
    icon: '💬',
    hint: 'Nur Perspektiven — kein Gegenargumentieren',
  },
  {
    key: 'adjustment',
    label: 'Anpassung',
    icon: '🔄',
    hint: 'Einreicher überarbeitet den Vorschlag',
  },
  { key: 'voting', label: 'Abstimmung', icon: '🗳️', hint: 'Konsent-Abstimmung' },
  { key: 'integration', label: 'Integration', icon: '🤝', hint: 'Einwände werden integriert' },
  { key: 'completed', label: 'Ergebnis', icon: '✅', hint: 'Beschluss gefasst' },
]

const phaseOrder = flowPhases.map((p) => p.key)

const choiceLabels: Record<ConsentChoice, { emoji: string; label: string; color: string }> = {
  consent: {
    emoji: '✅',
    label: 'Konsent',
    color: 'bg-green-50 text-green-700 hover:bg-green-100 ring-green-200',
  },
  minor_objection: {
    emoji: '💛',
    label: 'Leichter Einwand',
    color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 ring-yellow-200',
  },
  major_objection: {
    emoji: '🔴',
    label: 'Schwerwiegender Einwand',
    color: 'bg-red-50 text-red-700 hover:bg-red-100 ring-red-200',
  },
  abstain: {
    emoji: '⏸️',
    label: 'Enthalten',
    color: 'bg-gray-50 text-gray-700 hover:bg-gray-200 ring-gray-300',
  },
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [selectedRound, setSelectedRound] = useState(mockRounds[mockRounds.length - 1])
  const [userVote, setUserVote] = useState<ConsentChoice | null>(null)
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [showReactionForm, setShowReactionForm] = useState(false)
  const [showObjectionForm, setShowObjectionForm] = useState(false)
  const [question, setQuestion] = useState('')
  const [reaction, setReaction] = useState('')
  const [objection, setObjection] = useState({ reason: '', severity: 'minor' as const })

  const currentPhaseIndex = phaseOrder.indexOf(selectedRound.status)
  const currentPhase = flowPhases[currentPhaseIndex]

  const handleVote = (choice: ConsentChoice) => {
    setUserVote(choice)
  }

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.includes('?')) return
    setQuestion('')
    setShowQuestionForm(false)
  }

  const handleSubmitReaction = (e: React.FormEvent) => {
    e.preventDefault()
    setReaction('')
    setShowReactionForm(false)
  }

  const handleSubmitObjection = (e: React.FormEvent) => {
    e.preventDefault()
    setObjection({ reason: '', severity: 'minor' })
    setShowObjectionForm(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-2xl">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              ← Projekte
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Project Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{mockProject.name}</h1>
                <p className="text-gray-600">{mockProject.description}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Aktiv
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Erstellt von: {mockProject.owner.name}</span>
              <span>{mockProject.participantCount} Teilnehmer</span>
              <span>{mockRounds.length} Runden</span>
            </div>
          </div>

          {/* Consent Flow Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Consent-Prozess</h2>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {flowPhases.map((phase, index) => {
                const isCompleted = index < currentPhaseIndex
                const isActive = index === currentPhaseIndex

                return (
                  <div key={phase.key} className="flex items-center min-w-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 shrink-0 transition-colors ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                              ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                              : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {phase.icon}
                      </div>
                      <div
                        className={`text-xs font-medium text-center max-w-[80px] ${isActive ? 'text-blue-600' : ''}`}
                      >
                        {phase.label}
                      </div>
                    </div>
                    {index < flowPhases.length - 1 && (
                      <div
                        className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 shrink-0 transition-colors ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            {currentPhase && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                💡 <strong>{currentPhase.label}:</strong> {currentPhase.hint}
              </div>
            )}
          </div>

          {/* Round Selector */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Abstimmungsrunden</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {mockRounds.map((round) => (
                <button
                  key={round.id}
                  onClick={() => setSelectedRound(round)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedRound.id === round.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Runde {round.roundNumber}
                  {round.status === 'voting' && ' 🗳️'}
                  {round.status === 'completed' && ' ✓'}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Round */}
          {selectedRound && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Runde {selectedRound.roundNumber}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedRound.status === 'voting'
                      ? 'bg-blue-600 text-white'
                      : selectedRound.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : selectedRound.status === 'information'
                          ? 'bg-indigo-100 text-indigo-700'
                          : selectedRound.status === 'reaction'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {flowPhases[phaseOrder.indexOf(selectedRound.status)]?.label ||
                    selectedRound.status}
                </span>
              </div>

              {/* Proposal */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Vorschlag</h3>
                <p className="text-gray-900">{selectedRound.proposal}</p>
              </div>

              {/* Information Phase — Questions */}
              {selectedRound.status === 'information' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Informationsrunde</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Stelle Verständnisfragen zum Vorschlag. Keine Meinungen oder Diskussion — nur
                    Klärung.
                  </p>
                  {selectedRound.comments
                    .filter((c) => c.type === 'question' || c.type === 'answer')
                    .map((cmt) => (
                      <div
                        key={cmt.id}
                        className={`p-4 rounded-lg mb-2 ${
                          cmt.type === 'question'
                            ? 'bg-indigo-50 border-l-4 border-indigo-300'
                            : 'bg-blue-50 border-l-4 border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">
                            {cmt.type === 'question' ? '❓' : '💡'} {cmt.user}
                          </span>
                          <span className="text-xs text-gray-500">{cmt.createdAt}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{cmt.content}</p>
                      </div>
                    ))}
                  <button
                    onClick={() => setShowQuestionForm(!showQuestionForm)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                  >
                    ❓ Frage stellen
                  </button>
                  {showQuestionForm && (
                    <form
                      onSubmit={handleSubmitQuestion}
                      className="mt-4 p-4 bg-indigo-5 rounded-lg border border-indigo-200"
                    >
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-2"
                        rows={2}
                        placeholder="Deine Frage zum Vorschlag... (muss ein ? enthalten)"
                        required
                      />
                      {question && !question.includes('?') && (
                        <p className="text-xs text-red-500 mb-2">
                          Fragen müssen ein Fragezeichen (?) enthalten.
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                          disabled={!question.includes('?')}
                        >
                          Frage einreichen
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowQuestionForm(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Reaction Phase — Perspectives */}
              {selectedRound.status === 'reaction' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Reaktionsrunde</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Teile deine Perspektive — reihum, kein Gegenargumentieren. Aktives Zuhören.
                  </p>
                  {selectedRound.comments
                    .filter((c) => c.type === 'reaction' || c.type === 'perspective')
                    .map((cmt) => (
                      <div
                        key={cmt.id}
                        className="p-4 rounded-lg mb-2 bg-purple-50 border-l-4 border-purple-300"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">💬 {cmt.user}</span>
                          <span className="text-xs text-gray-500">{cmt.createdAt}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{cmt.content}</p>
                      </div>
                    ))}
                  <button
                    onClick={() => setShowReactionForm(!showReactionForm)}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                  >
                    💬 Perspektive teilen
                  </button>
                  {showReactionForm && (
                    <form
                      onSubmit={handleSubmitReaction}
                      className="mt-4 p-4 bg-purple-5 rounded-lg border border-purple-200"
                    >
                      <textarea
                        value={reaction}
                        onChange={(e) => setReaction(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-2"
                        rows={2}
                        placeholder="Deine Perspektive zum Vorschlag..."
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium"
                        >
                          Einreichen
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReactionForm(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Voting Phase — Consent Vote (4 options) */}
              {selectedRound.status === 'voting' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Konsent-Abstimmung</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Konsent bedeutet: Niemand hat einen schwerwiegenden, begründeten Einwand.
                  </p>

                  {/* Vote Buttons — 4 consent options */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {(
                      Object.entries(choiceLabels) as [ConsentChoice, typeof choiceLabels.consent][]
                    ).map(([key, { emoji, label, color }]) => (
                      <button
                        key={key}
                        onClick={() => handleVote(key)}
                        className={`py-4 px-4 rounded-xl font-medium transition-all ${
                          userVote === key ? `${color} ring-4` : color
                        }`}
                      >
                        <div className="text-2xl mb-1">{emoji}</div>
                        <div className="text-sm">{label}</div>
                      </button>
                    ))}
                  </div>

                  {userVote && (
                    <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                      Du hast mit{' '}
                      <strong>
                        {choiceLabels[userVote].emoji} {choiceLabels[userVote].label}
                      </strong>{' '}
                      abgestimmt. Du kannst deine Stimme ändern, wenn der Vorschlag angepasst wird.
                    </div>
                  )}

                  {/* Vote Results */}
                  {selectedRound.votes.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Bisherige Stimmen ({selectedRound.votes.length}/
                        {mockProject.participantCount})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(
                          [
                            'consent',
                            'minor_objection',
                            'major_objection',
                            'abstain',
                          ] as ConsentChoice[]
                        ).map((key) => {
                          const count = selectedRound.votes.filter((v) => v.choice === key).length
                          return (
                            <div key={key} className="p-3 rounded-lg bg-gray-50 text-center">
                              <div className="text-lg">{choiceLabels[key].emoji}</div>
                              <div className="text-xl font-bold">{count}</div>
                              <div className="text-xs text-gray-500">{choiceLabels[key].label}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Objection Form */}
                  {(userVote === 'minor_objection' || userVote === 'major_objection') && (
                    <div className="mt-4">
                      <button
                        onClick={() => setShowObjectionForm(!showObjectionForm)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700"
                      >
                        ✋ Einwand begründen
                      </button>
                    </div>
                  )}

                  {showObjectionForm && (
                    <form
                      onSubmit={handleSubmitObjection}
                      className="mt-4 p-4 bg-yellow-5 rounded-lg border border-yellow-200"
                    >
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Begründung</label>
                        <textarea
                          value={objection.reason}
                          onChange={(e) => setObjection({ ...objection, reason: e.target.value })}
                          className="w-full p-3 border rounded-lg"
                          rows={3}
                          placeholder="Warum erhebst du diesen Einwand?"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Schweregrad</label>
                        <select
                          value={objection.severity}
                          onChange={(e) =>
                            setObjection({
                              ...objection,
                              severity: e.target.value as 'minor' | 'major' | 'blocking',
                            })
                          }
                          className="w-full p-3 border rounded-lg"
                        >
                          <option value="minor">Geringfügig</option>
                          <option value="major">Erheblich</option>
                          <option value="blocking">Blockierend</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium"
                        >
                          Einreichungen
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowObjectionForm(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Completed — Result */}
              {selectedRound.status === 'completed' && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">✅</span>
                    <h3 className="text-lg font-semibold text-green-800">Beschluss gefasst</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    Konsent erreicht — kein schwerwiegender Einwand. Evaluationsdatum sollte gesetzt
                    werden.
                  </p>
                </div>
              )}

              {/* Objections (always visible if present) */}
              {selectedRound.objections.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Einwände</h3>
                  <div className="space-y-3">
                    {selectedRound.objections.map((obj) => (
                      <div
                        key={obj.id}
                        className={`p-4 rounded-lg border ${
                          obj.severity === 'blocking'
                            ? 'bg-red-50 border-red-200'
                            : obj.severity === 'major'
                              ? 'bg-orange-50 border-orange-200'
                              : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{obj.user}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              obj.severity === 'blocking'
                                ? 'bg-red-200 text-red-800'
                                : obj.severity === 'major'
                                  ? 'bg-orange-200 text-orange-800'
                                  : 'bg-yellow-200 text-yellow-800'
                            }`}
                          >
                            {obj.severity === 'blocking'
                              ? 'Blockierend'
                              : obj.severity === 'major'
                                ? 'Erheblich'
                                : 'Geringfügig'}
                          </span>
                        </div>
                        <p className="text-gray-700">{obj.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audit Trail */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Audit-Trail</h3>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>Vorhaben eingereicht — 10.04.2026 09:00</div>
                  <div>Informationsrunde gestartet — 10.04.2026 09:00</div>
                  <div>Frage von Anna — 11.04.2026 14:30</div>
                  <div>Antwort von Tom — 11.04.2026 15:00</div>
                  <div>Reaktionsrunde gestartet — 12.04.2026 09:00</div>
                  <div>Perspektive von Lisa — 12.04.2026 10:15</div>
                  <div>Abstimmungsrunde gestartet — 15.04.2026 09:00</div>
                  {selectedRound.status === 'completed' && (
                    <div>Beschluss gefasst — 14.04.2026 18:00</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
