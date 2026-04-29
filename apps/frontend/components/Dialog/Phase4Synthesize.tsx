'use client'

import { useState } from 'react'

interface Beitrag {
  id: number
  type: string
  content?: string
  user?: { id: number; username?: string }
}

interface Phase4Props {
  originalProposal: string
  beitraege: Beitrag[]
  onNext: (adaptedProposal: string) => void
}

function diffWords(original: string, adapted: string): React.ReactNode[] {
  const origWords = original.split(/\s+/)
  const adaptWords = adapted.split(/\s+/)
  const result: React.ReactNode[] = []

  const maxLen = Math.max(origWords.length, adaptWords.length)
  for (let i = 0; i < maxLen; i++) {
    const o = origWords[i]
    const a = adaptWords[i]
    if (o === a) {
      result.push(<span key={i}>{a} </span>)
    } else if (!o && a) {
      result.push(<mark key={i} className="bg-green-200 px-0.5 rounded">{a} </mark>)
    } else if (o && !a) {
      result.push(<del key={i} className="text-red-400">{o} </del>)
    } else {
      result.push(<del key={i} className="text-red-400">{o} </del>)
      if (a) result.push(<mark key={`${i}n`} className="bg-green-200 px-0.5 rounded">{a} </mark>)
    }
  }
  return result
}

export default function Phase4Synthesize({ originalProposal, beitraege, onNext }: Phase4Props) {
  const [adapted, setAdapted] = useState(originalProposal)
  const [showDiff, setShowDiff] = useState(false)

  const ideas = beitraege.filter((b) => b.type === 'idea' && b.content)
  const questions = beitraege.filter((b) => b.type === 'question' && b.content)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Synthese</h3>
        <p className="text-sm text-gray-600">
          Als Einreicher: Überarbeite deinen Vorschlag auf Basis der Ideen und Fragen.
        </p>
      </div>

      {ideas.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">💡 Ideen aus der Runde</p>
          <ul className="space-y-2">
            {ideas.map((b) => (
              <li key={b.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                <span className="text-gray-500 text-xs">{b.user?.username}: </span>
                {b.content}
              </li>
            ))}
          </ul>
        </div>
      )}

      {questions.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">❓ Offene Fragen</p>
          <ul className="space-y-2">
            {questions.map((b) => (
              <li key={b.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                <span className="text-gray-500 text-xs">{b.user?.username}: </span>
                {b.content}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Angepasster Vorschlag</label>
        <textarea
          value={adapted}
          onChange={(e) => setAdapted(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowDiff(!showDiff)}
        className="text-sm text-blue-600 underline"
      >
        {showDiff ? 'Diff ausblenden' : 'Änderungen anzeigen (Diff)'}
      </button>

      {showDiff && (
        <div className="bg-gray-50 border rounded-lg p-4 text-sm leading-relaxed">
          <p className="text-xs text-gray-500 mb-2">
            <del className="text-red-400">entfernt</del> / <mark className="bg-green-200 px-0.5 rounded">hinzugefügt</mark>
          </p>
          <p>{diffWords(originalProposal, adapted)}</p>
        </div>
      )}

      <button
        onClick={() => onNext(adapted)}
        disabled={!adapted.trim()}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-40"
      >
        Vorschlag präsentieren →
      </button>
    </div>
  )
}
