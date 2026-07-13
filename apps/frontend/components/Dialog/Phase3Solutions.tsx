'use client'

import { useState } from 'react'

interface Beitrag {
  id: number
  type: 'idea' | 'question' | 'support' | 'passe'
  content?: string
  user?: { id: number; username?: string }
}

interface Phase3Props {
  phaseId: number
  currentUserId: number
  existingBeitraege: Beitrag[]
  totalMembers: number
  onAddBeitrag: (type: 'idea' | 'question' | 'support' | 'passe', content?: string) => Promise<void>
  onNext: () => void
}

const BEITRAG_OPTIONS = [
  {
    type: 'idea' as const,
    emoji: '💡',
    label: 'Idee',
    hint: 'Lösungsvorschlag einbringen',
    needsText: true,
  },
  {
    type: 'question' as const,
    emoji: '❓',
    label: 'Frage',
    hint: 'Klärungsbedarf benennen',
    needsText: true,
  },
  {
    type: 'support' as const,
    emoji: '➕',
    label: 'Unterstützung',
    hint: 'Bestehende Idee unterstützen',
    needsText: false,
  },
  {
    type: 'passe' as const,
    emoji: '⏭️',
    label: 'Passe',
    hint: 'Keinen Beitrag in dieser Runde',
    needsText: false,
  },
]

export default function Phase3Solutions({
  phaseId: _phaseId,
  currentUserId,
  existingBeitraege,
  totalMembers,
  onAddBeitrag,
  onNext,
}: Phase3Props) {
  const [selectedType, setSelectedType] = useState<
    'idea' | 'question' | 'support' | 'passe' | null
  >(null)
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmedAdvance, setConfirmedAdvance] = useState(false)

  const myBeitrag = existingBeitraege.find((b) => b.user?.id === currentUserId)
  const uniqueContributors = new Set(existingBeitraege.map((b) => b.user?.id)).size
  const missingContributions = totalMembers - uniqueContributors
  const allContributed = missingContributions <= 0

  const handleSubmit = async () => {
    if (!selectedType) return
    setSaving(true)
    const needsText = BEITRAG_OPTIONS.find((o) => o.type === selectedType)?.needsText
    await onAddBeitrag(selectedType, needsText ? content : undefined)
    setSaving(false)
    setSelectedType(null)
    setContent('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Lösungsraum öffnen</h3>
        <p className="text-sm text-gray-600">
          Reihum — jede Person macht genau einen Beitrag. Ziel: Ideen sammeln, nicht bewerten.
        </p>
      </div>

      {existingBeitraege.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Bisherige Beiträge ({existingBeitraege.length})
          </p>
          {existingBeitraege.map((b) => {
            const opt = BEITRAG_OPTIONS.find((o) => o.type === b.type)
            const bgMap: Record<string, string> = {
              idea: 'bg-amber-50 border-amber-200',
              question: 'bg-blue-50 border-blue-200',
              support: 'bg-emerald-50 border-emerald-200',
              passe: 'bg-gray-50 border-gray-200',
            }
            return (
              <div
                key={b.id}
                className={`flex items-start gap-3 rounded-xl p-3 border ${bgMap[b.type] || 'bg-gray-50 border-gray-200'}`}
              >
                <span className="text-xl">{opt?.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">
                    <span className="font-medium">{b.user?.username || 'Unbekannt'}</span> ·{' '}
                    {opt?.label}
                  </p>
                  {b.content && (
                    <p className="text-sm text-gray-800 leading-relaxed">{b.content}</p>
                  )}
                  {!b.content && <p className="text-xs text-gray-400 italic">{opt?.hint}</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!myBeitrag ? (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-700">Dein Beitrag</p>
          <div className="grid grid-cols-2 gap-3">
            {BEITRAG_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                onClick={() => setSelectedType(opt.type)}
                className={`p-4 rounded-xl border-2 text-left transition-all group ${
                  selectedType === opt.type
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <p className="text-2xl mb-1.5 group-hover:scale-110 transition-transform origin-left">
                  {opt.emoji}
                </p>
                <p className="font-semibold text-sm">{opt.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{opt.hint}</p>
              </button>
            ))}
          </div>

          {/* Regel-Hinweis */}
          <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3 leading-relaxed">
            💫 Keine Kritik an anderen Ideen in dieser Phase. Nur Beiträge sammeln. Einreicher ist
            Zuhörer, nicht Verteidiger.
          </div>

          {selectedType && BEITRAG_OPTIONS.find((o) => o.type === selectedType)?.needsText && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                selectedType === 'idea'
                  ? 'Was schlägst du vor? Wie könnte der Vorschlag angepasst werden?'
                  : 'Was ist noch unklar?'
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm transition-shadow"
              autoFocus
            />
          )}

          {selectedType && (
            <button
              onClick={handleSubmit}
              disabled={
                saving ||
                (!!BEITRAG_OPTIONS.find((o) => o.type === selectedType)?.needsText &&
                  !content.trim())
              }
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? 'Wird gespeichert…' : 'Beitrag einreichen'}
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
          <span className="text-xl">✅</span>
          <span>Dein Beitrag wurde eingereicht. Warte auf die anderen Kreismitglieder.</span>
        </div>
      )}

      {/* Advance warning */}
      {!allContributed && !confirmedAdvance && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 shrink-0 mt-0.5">⚠️</span>
            <div>
              <p className="text-amber-800 font-medium">
                {missingContributions}{' '}
                {missingContributions === 1 ? 'Person hat' : 'Personen haben'} noch keinen Beitrag
                geleistet.
              </p>
              <p className="text-amber-600 text-xs mt-0.5">
                Ideen werden in der Synthese berücksichtigt — auch die, die noch nicht eingereicht
                wurden. Trotzdem weiter?
              </p>
              <button
                onClick={() => setConfirmedAdvance(true)}
                className="mt-2 px-3 py-1.5 bg-amber-200 text-amber-800 text-xs font-semibold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Trotzdem weiter zur Synthese →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show "all contributed" success state when everyone has participated */}
      {allContributed && myBeitrag && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">✅</span>
            <span className="text-emerald-800 font-medium">
              Alle {totalMembers} Kreismitglieder haben Beiträge geleistet. Weiter zur Synthese.
            </span>
          </div>
        </div>
      )}

      {/* Confirm advance button (only after confirmation or when all contributed) */}
      {(confirmedAdvance || allContributed) && (
        <button
          onClick={onNext}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Weiter zur Synthese →
        </button>
      )}
    </div>
  )
}
