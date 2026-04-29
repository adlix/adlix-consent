'use client'

interface Phase5Props {
  originalProposal: string
  adaptedProposal: string
  objectorName: string
  onResolved: () => void
  onNotResolved: () => void
}

export default function Phase5Present({
  originalProposal,
  adaptedProposal,
  objectorName,
  onResolved,
  onNotResolved,
}: Phase5Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Angepassten Vorschlag präsentieren</h3>
        <p className="text-sm text-gray-600">
          {objectorName} bestätigt, ob der Einwand durch die Anpassung adressiert wird.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Original</p>
          <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 line-through opacity-60">
            {originalProposal}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Angepasst</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-gray-800">
            {adaptedProposal}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 mb-3">
          {objectorName}: Wurde dein Einwand durch die Anpassung adressiert?
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onResolved}
            className="py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
          >
            ✅ Ja, adressiert
          </button>
          <button
            onClick={onNotResolved}
            className="py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors text-sm"
          >
            ❌ Nein, weiterhin
          </button>
        </div>
      </div>
    </div>
  )
}
