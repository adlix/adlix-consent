'use client'

import { useState } from 'react'

interface MinorObjection {
  user: string
  reason: string
}

interface OutcomeFormProps {
  onSubmit: (data: {
    outcome: string
    nextSteps: string
    evaluationDate: string
    status: string
  }) => void
  minorObjections?: MinorObjection[]
}

export default function OutcomeForm({ onSubmit, minorObjections = [] }: OutcomeFormProps) {
  const [outcome, setOutcome] = useState('')
  const [nextSteps, setNextSteps] = useState('')
  const [evaluationDate, setEvaluationDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!outcome.trim()) return
    onSubmit({
      outcome: outcome.trim(),
      nextSteps: nextSteps.trim(),
      evaluationDate,
      status: 'beschlossen',
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">✅</span>
          <h3 className="text-lg font-semibold text-green-800">Beschluss dokumentiert</h3>
        </div>
        <p className="text-sm text-green-700 mb-3">{outcome}</p>
        {nextSteps && (
          <div className="mb-2">
            <span className="text-sm font-medium text-green-800">Nächste Schritte:</span>
            <p className="text-sm text-green-700">{nextSteps}</p>
          </div>
        )}
        {evaluationDate && (
          <div>
            <span className="text-sm font-medium text-green-800">Evaluationsdatum:</span>
            <p className="text-sm text-green-700">
              {new Date(evaluationDate).toLocaleDateString('de-DE')}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-blue-50 rounded-xl border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        📋 Ergebnis dokumentieren
      </h3>

      {minorObjections.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm font-medium text-yellow-800 mb-2">
            💛 Leichte Einwände (dokumentiert, nicht geblockt):
          </p>
          <ul className="text-sm text-yellow-700 space-y-1">
            {minorObjections.map((obj, i) => (
              <li key={i}>
                <strong>{obj.user}:</strong> {obj.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-800 mb-1">
          Ergebnis *
        </label>
        <textarea
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          rows={3}
          placeholder="Was wurde beschlossen?"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-800 mb-1">
          Nächste Schritte
        </label>
        <textarea
          value={nextSteps}
          onChange={(e) => setNextSteps(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          rows={2}
          placeholder="Was passiert als nächstes?"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-blue-800 mb-1">
          Evaluationsdatum
        </label>
        <input
          type="date"
          value={evaluationDate}
          onChange={(e) => setEvaluationDate(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
        <p className="text-xs text-blue-600 mt-1">
          Wann wird diese Entscheidung überprüft?
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!outcome.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Beschluss dokumentieren
        </button>
      </div>
    </form>
  )
}
