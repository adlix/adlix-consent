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
      if (
        keywords.includes('ressourc') ||
        keywords.includes('kosten') ||
        keywords.includes('budget')
      ) {
        hint +=
          'Ressourcen oder Kosten. Möglicher Ansatz: Prüfe ob eine schrittweise Umsetzung möglich ist.'
      } else if (
        keywords.includes('zeit') ||
        keywords.includes('termin') ||
        keywords.includes('dauer')
      ) {
        hint +=
          'Zeitplanung. Möglicher Ansatz: Kläre ob ein angepasster Zeitrahmen den Einwand auflöst.'
      } else if (
        keywords.includes('qualität') ||
        keywords.includes('risiko') ||
        keywords.includes('sicherheit')
      ) {
        hint +=
          'Qualität oder Risiko. Möglicher Ansatz: Definiere Mindestandards oder Rückfall-Kriterien.'
      } else {
        hint +=
          'einem grundsätzlichen Bedenken. Möglicher Ansatz: Formuliere den Einwand als konkrete Bedingung.'
      }
      setAiHint(hint)
      setAnalysing(false)
    }, 800)
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold mb-1">Einwand verstehen</h3>
        <p className="text-sm text-gray-500">
          Lies den Einwand sorgfältig. Ziel ist Verständnis — noch keine Bewertung oder Diskussion.
        </p>
      </div>

      {/* Einwand-Box — prominent */}
      <div className="rounded-xl p-4 border-l-4 border-red-400 bg-red-50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🔴</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-red-700">
            Schwerwiegender Einwand
          </span>
        </div>
        <p className="text-gray-800 leading-relaxed">{objectionReason}</p>
      </div>

      {/* 4 Validitätskriterien als Checkliste */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Valide Einwands-Kriterien (Soziokratie)
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-start gap-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span>
              <strong>Explizit</strong> — Konkreter Fall formulierbar?
            </span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span>
              <strong>Sachl.</strong> — Keine persönliche Präferenz?
            </span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span>
              <strong>Belegt</strong> — Erfahrung, nicht nur Ahnung?
            </span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span>
              <strong>Kritisch</strong> — Nicht nur eine bessere Idee?
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Zusammenfassung in eigenen Worten
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Der Einwand besagt, dass…"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm transition-shadow"
        />
        <p className="text-xs text-gray-400 mt-1">
          Das hilft dem Kreis sicherzustellen, dass alle den Einwand gleich verstehen.
        </p>
      </div>

      <button
        type="button"
        onClick={handleAnalyse}
        disabled={analysing}
        className="w-full py-2.5 px-4 border border-blue-300 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {analysing ? (
          <>
            <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />{' '}
            Analysiere…
          </>
        ) : (
          <>
            <span>✨</span> KI-Analyse starten
          </>
        )}
      </button>

      {aiHint && (
        <div
          className="rounded-xl p-4 border"
          style={{ background: 'var(--sage-pale)', borderColor: 'var(--proposal-border)' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: 'var(--sage)' }}
          >
            KI-Hinweis
          </p>
          <p className="text-sm text-gray-700">{aiHint}</p>
        </div>
      )}

      <button
        onClick={() => onNext(summary)}
        disabled={!summary.trim()}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Weiter zur Validierung →
      </button>
    </div>
  )
}
