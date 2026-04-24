'use client'

import { useState } from 'react'

type AbstainReason = 'A' | 'B' | 'C' | 'D' | 'E'

interface AbstainReasonModalProps {
  onSubmit: (data: {
    reason: AbstainReason
    detail?: string
    isObjection?: boolean
    objectionSeverity?: 'minor' | 'major'
  }) => void
  onCancel: () => void
}

const reasons: { key: AbstainReason; label: string; description: string; icon: string }[] = [
  {
    key: 'A',
    label: 'Nicht betroffen',
    description: 'Ich bin nicht betroffen oder habe keine Expertise.',
    icon: '🤷',
  },
  {
    key: 'B',
    label: 'Mehr Infos nötig',
    description: 'Ich brauche mehr Informationen, um mich entscheiden zu können.',
    icon: '📚',
  },
  {
    key: 'C',
    label: 'Unklar',
    description: 'Mir ist ein Teil des Vorhabens unklar.',
    icon: '🤔',
  },
  {
    key: 'D',
    label: 'Anonyme Bedenken',
    description: 'Ich habe Bedenken, möchte sie aber nicht öffentlich äußern.',
    icon: '🔒',
  },
  {
    key: 'E',
    label: 'Will mich nicht festlegen',
    description: 'Ich möchte mich nicht festlegen.',
    icon: '⏸️',
  },
]

const reflexionQuestions = [
  'Gibt es einen Teil des Vorhabens, der dir Bauchschmerzen bereitet?',
  'Würde das Vorhaben irgendjemanden betreffen, den du kennst — und wie?',
  'Was bräuchtest du, um wirklich Konsent geben zu können?',
]

export default function AbstainReasonModal({ onSubmit, onCancel }: AbstainReasonModalProps) {
  const [selectedReason, setSelectedReason] = useState<AbstainReason | null>(null)
  const [detail, setDetail] = useState('')
  const [reflexionAnswers, setReflexionAnswers] = useState<string[]>(['', '', ''])
  const [showReflexion, setShowReflexion] = useState(false)
  const [finalChoice, setFinalChoice] = useState<'abstain' | 'minor' | 'major' | 'anonymous' | null>(null)

  const handleReasonSelect = (reason: AbstainReason) => {
    setSelectedReason(reason)
    setDetail('')
    setShowReflexion(false)
    setFinalChoice(null)
  }

  const handleSubmit = () => {
    if (!selectedReason) return
    onSubmit({
      reason: selectedReason,
      detail: detail.trim() || undefined,
      isObjection: finalChoice === 'minor' || finalChoice === 'major',
      objectionSeverity: finalChoice === 'major' ? 'major' : finalChoice === 'minor' ? 'minor' : undefined,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-1">Warum enthältst du dich?</h3>
          <p className="text-sm text-gray-500 mb-4">
            In der Soziokratie ist Enthaltung kein bequemer Ausweg. Bitte gib einen Grund an.
          </p>

          {/* Reason selection */}
          {!selectedReason && (
            <div className="space-y-2">
              {reasons.map((r) => (
                <button
                  key={r.key}
                  onClick={() => handleReasonSelect(r.key)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <div className="font-medium">
                        {r.key} — {r.label}
                      </div>
                      <div className="text-sm text-gray-500">{r.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Reason A — simple accept */}
          {selectedReason === 'A' && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                Deine Enthaltung wird akzeptiert. Da du nicht betroffen bist, ist kein weiterer
                Schritt nötig.
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
                >
                  Bestätigen
                </button>
                <button
                  onClick={() => setSelectedReason(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Zurück
                </button>
              </div>
            </div>
          )}

          {/* Reason B/C — info request */}
          {(selectedReason === 'B' || selectedReason === 'C') && (
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-800 mb-3">
                Formuliere konkret, welche {selectedReason === 'B' ? 'Informationen' : 'Klärung'} du
                brauchst:
              </p>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="w-full p-3 border border-indigo-200 rounded-lg mb-3"
                rows={3}
                placeholder={`Ich brauche ${selectedReason === 'B' ? 'Informationen' : 'Klärung'} zu: ...`}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!detail.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                >
                  Anfrage senden
                </button>
                <button
                  onClick={() => setSelectedReason(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Zurück
                </button>
              </div>
            </div>
          )}

          {/* Reason D — anonymous */}
          {selectedReason === 'D' && (
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-800 mb-3">
                Du kannst deine Bedenken anonym eingeben. Kein Rückschluss auf dich als Person.
              </p>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="w-full p-3 border border-amber-200 rounded-lg mb-3"
                rows={3}
                placeholder="Deine anonymen Bedenken..."
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!detail.trim()}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50"
                >
                  Anonym einreichen
                </button>
                <button
                  onClick={() => setSelectedReason(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Zurück
                </button>
              </div>
            </div>
          )}

          {/* Reason E — reflexion */}
          {selectedReason === 'E' && !showReflexion && (
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="mb-4 p-3 bg-purple-100 rounded-lg text-sm text-purple-800">
                💡 <strong>Soziokratischer Hinweis:</strong> In der Soziokratie trägt jede
                beteiligte Person Mitverantwortung für Entscheidungen. Enthaltung ohne Grund
                bedeutet: Du hast keinen Einwand. Hast du vielleicht doch einen — auch einen
                kleinen?
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReflexion(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                >
                  Selbstreflexion starten
                </button>
                <button
                  onClick={() => {
                    setFinalChoice('abstain')
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Trotzdem enthalten bleiben
                </button>
                <button
                  onClick={() => setSelectedReason(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Zurück
                </button>
              </div>
            </div>
          )}

          {/* Reason E — reflexion questions */}
          {selectedReason === 'E' && showReflexion && !finalChoice && (
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-800 mb-3">
                Geführte Selbstreflexion (optional)
              </h4>
              {reflexionQuestions.map((q, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm text-purple-700 mb-1">{q}</p>
                  <textarea
                    value={reflexionAnswers[i]}
                    onChange={(e) => {
                      const newAnswers = [...reflexionAnswers]
                      newAnswers[i] = e.target.value
                      setReflexionAnswers(newAnswers)
                    }}
                    className="w-full p-2 border border-purple-200 rounded-lg text-sm"
                    rows={2}
                    placeholder="Deine Gedanken..."
                  />
                </div>
              ))}
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-purple-800">Was möchtest du tun?</p>
                <button
                  onClick={() => setFinalChoice('abstain')}
                  className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-purple-300 text-sm"
                >
                  ⏸️ Ich möchte trotzdem enthalten bleiben
                </button>
                <button
                  onClick={() => setFinalChoice('minor')}
                  className="w-full text-left px-4 py-3 rounded-lg border border-yellow-200 hover:border-yellow-300 bg-yellow-50 text-sm"
                >
                  💛 Ich habe doch einen leichten Einwand
                </button>
                <button
                  onClick={() => setFinalChoice('major')}
                  className="w-full text-left px-4 py-3 rounded-lg border border-red-200 hover:border-red-300 bg-red-50 text-sm"
                >
                  🔴 Ich habe einen schwerwiegenden Einwand
                </button>
                <button
                  onClick={() => setFinalChoice('anonymous')}
                  className="w-full text-left px-4 py-3 rounded-lg border border-amber-200 hover:border-amber-300 bg-amber-50 text-sm"
                >
                  🔒 Ich möchte anonym Bedenken äußern
                </button>
              </div>
            </div>
          )}

          {/* Final choice made */}
          {selectedReason === 'E' && finalChoice && (
            <div className="p-4 bg-purple-50 rounded-lg">
              {finalChoice === 'abstain' && (
                <p className="text-sm text-gray-700">
                  Deine Enthaltung wird gespeichert. Sie ist kein Blocker.
                </p>
              )}
              {finalChoice === 'minor' && (
                <p className="text-sm text-yellow-700">
                  Du wirst zum leichten Einwand weitergeleitet.
                </p>
              )}
              {finalChoice === 'major' && (
                <p className="text-sm text-red-700">
                  Du wirst zum schwerwiegenden Einwand weitergeleitet.
                </p>
              )}
              {finalChoice === 'anonymous' && (
                <>
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    className="w-full p-3 border border-amber-200 rounded-lg mb-3"
                    rows={3}
                    placeholder="Deine anonymen Bedenken..."
                  />
                </>
              )}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                >
                  Bestätigen
                </button>
                <button
                  onClick={() => setFinalChoice(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Zurück
                </button>
              </div>
            </div>
          )}

          {/* Global cancel */}
          <button
            onClick={onCancel}
            className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  )
}
