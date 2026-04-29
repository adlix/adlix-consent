'use client'

import { useState } from 'react'

interface Phase6Props {
  onEscalate: (option: EscalationOption) => void
}

type EscalationOption = 'defer' | 'partial' | 'external' | 'probe'

const OPTIONS: { type: EscalationOption; emoji: string; label: string; description: string }[] = [
  {
    type: 'defer',
    emoji: '⏸️',
    label: 'Zurückstellen',
    description: 'Vorhaben vorläufig pausieren — in einer definierten Zeit erneut aufgreifen.',
  },
  {
    type: 'partial',
    emoji: '✂️',
    label: 'Teilentscheidung',
    description: 'Den nicht-strittigen Teil des Vorhabens jetzt beschließen.',
  },
  {
    type: 'external',
    emoji: '🌐',
    label: 'Externe Moderation',
    description: 'Neutrale Dritte für eine moderierte Lösungsrunde einbeziehen.',
  },
  {
    type: 'probe',
    emoji: '🧪',
    label: 'Probe-Beschluss',
    description: 'Vorhaben zeitlich befristet umsetzen und Erfahrungen sammeln.',
  },
]

export default function Phase6Escalate({ onEscalate }: Phase6Props) {
  const [selected, setSelected] = useState<EscalationOption | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Eskalation</h3>
        <p className="text-sm text-gray-600">
          Der Dialog konnte keinen Konsent herstellen. Wählt gemeinsam die nächste Vorgehensweise.
        </p>
      </div>

      <div className="space-y-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.type}
            onClick={() => setSelected(opt.type)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selected === opt.type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{opt.emoji}</span>
              <div>
                <p className="font-medium">{opt.label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{opt.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => selected && onEscalate(selected)}
        disabled={!selected}
        className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-40"
      >
        Eskalationsweg bestätigen →
      </button>
    </div>
  )
}
