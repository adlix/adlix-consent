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
  onAddBeitrag: (type: 'idea' | 'question' | 'support' | 'passe', content?: string) => Promise<void>
  onNext: () => void
}

const BEITRAG_OPTIONS = [
  { type: 'idea' as const, emoji: '💡', label: 'Idee', hint: 'Lösungsvorschlag einbringen', needsText: true },
  { type: 'question' as const, emoji: '❓', label: 'Frage', hint: 'Klärungsbedarf benennen', needsText: true },
  { type: 'support' as const, emoji: '➕', label: 'Unterstützung', hint: 'Bestehende Idee unterstützen', needsText: false },
  { type: 'passe' as const, emoji: '⏭️', label: 'Passe', hint: 'Keinen Beitrag in dieser Runde', needsText: false },
]

export default function Phase3Solutions({
  phaseId,
  currentUserId,
  existingBeitraege,
  onAddBeitrag,
  onNext,
}: Phase3Props) {
  const [selectedType, setSelectedType] = useState<'idea' | 'question' | 'support' | 'passe' | null>(null)
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  const myBeitrag = existingBeitraege.find((b) => b.user?.id === currentUserId)

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
          <p className="text-sm font-medium text-gray-700">Bisherige Beiträge ({existingBeitraege.length})</p>
          {existingBeitraege.map((b) => {
            const opt = BEITRAG_OPTIONS.find((o) => o.type === b.type)
            return (
              <div key={b.id} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                <span className="text-lg">{opt?.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">
                    {b.user?.username || 'Unbekannt'} · {opt?.label}
                  </p>
                  {b.content && <p className="text-sm text-gray-800">{b.content}</p>}
                  {!b.content && <p className="text-sm text-gray-400 italic">{opt?.hint}</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!myBeitrag ? (
        <div className="space-y-4">
          <p className="text-sm font-medium">Dein Beitrag</p>
          <div className="grid grid-cols-2 gap-3">
            {BEITRAG_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                onClick={() => setSelectedType(opt.type)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  selectedType === opt.type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <p className="text-xl mb-1">{opt.emoji}</p>
                <p className="font-medium text-sm">{opt.label}</p>
                <p className="text-xs text-gray-500">{opt.hint}</p>
              </button>
            ))}
          </div>

          {selectedType && BEITRAG_OPTIONS.find((o) => o.type === selectedType)?.needsText && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={selectedType === 'idea' ? 'Was schlägst du vor?' : 'Was ist unklar?'}
              rows={3}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            />
          )}

          {selectedType && (
            <button
              onClick={handleSubmit}
              disabled={
                saving ||
                (!!BEITRAG_OPTIONS.find((o) => o.type === selectedType)?.needsText && !content.trim())
              }
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-40"
            >
              {saving ? 'Wird gespeichert…' : 'Beitrag einreichen'}
            </button>
          )}
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
          Dein Beitrag wurde eingereicht.
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Weiter zur Synthese →
      </button>
    </div>
  )
}
