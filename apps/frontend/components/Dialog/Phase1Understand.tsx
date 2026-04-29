'use client'

import { useState } from 'react'

interface Phase1Props {
  objectionReason: string
  onNext: (summary: string) => void
}

export default function Phase1Understand({ objectionReason, onNext }: Phase1Props) {
  const [summary, setSummary] = useState('')
  const [analysing, setAnalysing] = useState(false)
  const [aiHint, setAiHint] = useState('')

  const handleAnalyse = () => {
    setAnalysing(true)
    // Placeholder KI-Analyse — future: call backend analyse endpoint
    setTimeout(() => {
      const keywords = objectionReason.toLowerCase()
      let hint = 'Der Einwand bezieht sich auf '
      if (keywords.includes('ressourc') || keywords.includes('kosten') || keywords.includes('budget')) {
        hint += 'Ressourcen oder Kosten. Möglicher Ansatz: Prüfe ob eine schrittweise Umsetzung möglich ist.'
      } else if (keywords.includes('zeit') || keywords.includes('termin') || keywords.includes('dauer')) {
        hint += 'Zeitplanung. Möglicher Ansatz: Kläre ob ein angepasster Zeitrahmen den Einwand auflöst.'
      } else if (keywords.includes('qualität') || keywords.includes('risiko') || keywords.includes('sicherheit')) {
        hint += 'Qualität oder Risiko. Möglicher Ansatz: Definiere Mindestandards oder Rückfall-Kriterien.'
      } else {
        hint += 'einem grundsätzlichen Bedenken. Möglicher Ansatz: Formuliere den Einwand als konkrete Bedingung.'
      }
      setAiHint(hint)
      setAnalysing(false)
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Einwand verstehen</h3>
        <p className="text-sm text-gray-600">
          Lies den Einwand sorgfältig. Ziel ist Verständnis — noch keine Bewertung.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm font-medium text-red-800 mb-1">Schwerwiegender Einwand</p>
        <p className="text-gray-800">{objectionReason}</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Zusammenfassung in eigenen Worten
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Der Einwand besagt, dass…"
          rows={4}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        type="button"
        onClick={handleAnalyse}
        disabled={analysing}
        className="w-full py-2 px-4 border border-blue-300 text-blue-700 rounded-lg text-sm hover:bg-blue-50 transition-colors disabled:opacity-50"
      >
        {analysing ? 'Analysiere…' : '✨ KI-Analyse starten (Platzhalter)'}
      </button>

      {aiHint && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-medium mb-1">KI-Hinweis</p>
          <p>{aiHint}</p>
        </div>
      )}

      <button
        onClick={() => onNext(summary)}
        disabled={!summary.trim()}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-40"
      >
        Weiter zur Validierung →
      </button>
    </div>
  )
}
