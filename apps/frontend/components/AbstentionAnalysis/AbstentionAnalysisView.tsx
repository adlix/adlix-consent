'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { strapi } from '../../lib/strapi'

interface ReasonCounts {
  A: number
  B: number
  C: number
  D: number
  E: number
}

interface ThematicGroup {
  [theme: string]: string[]
}

interface AnalysisData {
  roundId: number
  totalAbstentions: number
  reasonCounts: ReasonCounts
  thematicGroups: ThematicGroup
  recommendations: string[]
}

interface AbstentionAnalysisViewProps {
  roundId: number
  abstentionCount: number
  isOwner: boolean
}

export default function AbstentionAnalysisView({
  roundId,
  abstentionCount,
  isOwner,
}: AbstentionAnalysisViewProps) {
  const { data: session } = useSession()
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(false)

  const jwt = (session as unknown as { jwt?: string })?.jwt

  const fetchAnalysis = async () => {
    setLoading(true)
    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
      const res = await fetch(`${STRAPI_URL}/api/abstentions/${roundId}/analyse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
      })
      if (!res.ok) throw new Error('Failed to analyse')
      const result = await res.json()
      setData(result.data)
    } catch (err) {
      console.error('Failed to run analysis:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOwner || abstentionCount < 3) return null

  const reasonLabels: Record<string, string> = {
    A: 'Nicht betroffen',
    B: 'Mehr Infos nötig',
    C: 'Unklar',
    D: 'Anonyme Bedenken',
    E: 'Will mich nicht festlegen',
  }

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-indigo-800 flex items-center gap-2">
          📊 Enthaltungs-Analyse
          <span className="text-xs bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">Pro</span>
        </h4>
        {!data && (
          <button
            onClick={fetchAnalysis}
            disabled={loading}
            className="text-sm px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Analysiere…' : 'Analyse anfordern'}
          </button>
        )}
      </div>

      {abstentionCount >= 3 && !data && (
        <p className="text-sm text-indigo-600">
          {abstentionCount} Enthaltungen erkannt — Musteranalyse verfügbar.
        </p>
      )}

      {data && (
        <div className="space-y-4">
          {/* Reason distribution */}
          <div>
            <h5 className="text-sm font-medium text-indigo-900 mb-2">Verteilung nach Grund</h5>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(data.reasonCounts).map(([key, count]) => (
                <div key={key} className="bg-white rounded-lg p-2 text-center border border-indigo-100">
                  <div className="text-lg font-bold text-indigo-700">{count}</div>
                  <div className="text-xs text-indigo-500">{reasonLabels[key]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Thematic groups */}
          {Object.keys(data.thematicGroups).length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-indigo-900 mb-2">Thematische Cluster</h5>
              <div className="space-y-2">
                {Object.entries(data.thematicGroups).map(([theme, items]) => (
                  <div key={theme} className="bg-white rounded-lg p-2 border border-indigo-100">
                    <span className="text-sm font-medium text-indigo-800">{theme}</span>
                    <span className="text-xs text-indigo-500 ml-2">({items.length})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h5 className="text-sm font-medium text-indigo-900 mb-2">Empfehlungen</h5>
            <ul className="space-y-1">
              {data.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-indigo-700 flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setData(null)}
            className="text-xs text-indigo-600 hover:text-indigo-800"
          >
            Ausblenden
          </button>
        </div>
      )}
    </div>
  )
}
