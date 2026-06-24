'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { strapi } from '@/lib/strapi'

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
  analysedAt?: string
}

interface AbstentionAnalysisViewProps {
  roundId: number
  abstentionCount: number
  isOwner: boolean
}

const REASON_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  A: { label: 'Nicht betroffen', icon: '🤷', color: 'text-gray-600', bg: 'bg-gray-100' },
  B: { label: 'Mehr Infos nötig', icon: '📚', color: 'text-blue-700', bg: 'bg-blue-100' },
  C: { label: 'Unklar', icon: '🤔', color: 'text-amber-700', bg: 'bg-amber-100' },
  D: { label: 'Anonyme Bedenken', icon: '🔒', color: 'text-amber-800', bg: 'bg-amber-100' },
  E: { label: 'Unentschlossen', icon: '⏸️', color: 'text-purple-700', bg: 'bg-purple-100' },
}

export default function AbstentionAnalysisView({
  roundId,
  abstentionCount,
  isOwner,
}: AbstentionAnalysisViewProps) {
  const { data: session } = useSession()
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const jwt = (session as unknown as { jwt?: string })?.jwt

  const fetchAnalysis = async () => {
    setLoading(true)
    try {
      strapi.setJwt(jwt || null)
      const result = await strapi.analyseAbstentions(roundId)

      const apiData = result as unknown as {
        data?: {
          roundId: number
          totalAbstentions: number
          reasonCounts: ReasonCounts
          thematicGroups: ThematicGroup
          recommendations?: string[]
        }
      }
      const payload = apiData.data

      if (!payload) {
        throw new Error('Keine Analyse-Daten erhalten.')
      }

      setData({
        roundId: payload.roundId,
        totalAbstentions: payload.totalAbstentions,
        reasonCounts: payload.reasonCounts,
        thematicGroups: payload.thematicGroups,
        recommendations: payload.recommendations ?? [],
        analysedAt: new Date().toLocaleString('de-DE'),
      })
    } catch (err) {
      console.error('Failed to run analysis:', err)
    } finally {
      setLoading(false)
    }
  }

  // Not owners never see the analysis component
  if (!isOwner) return null

  // ── Threshold notice: show when 1-2 abstentions exist ───────────────────────
  if (abstentionCount > 0 && abstentionCount < 3) {
    return (
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <span className="text-base">📊</span>
          <p className="text-sm text-indigo-700">
            Enthaltungs-Analyse ab <strong>3 Enthaltungen</strong> verfügbar ({abstentionCount}/3
            erreicht).
          </p>
        </div>
      </div>
    )
  }

  // Fewer than 3 abstentions and none to show: hide entirely
  if (abstentionCount < 3) return null


  const totalReasons = Object.values(
    data?.reasonCounts ?? ({ A: 0, B: 0, C: 0, D: 0, E: 0 } as ReasonCounts)
  ).reduce((a, b) => a + b, 0)

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-indigo-800 flex items-center gap-2">
          📊 Enthaltungs-Analyse
          <span className="text-xs bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
            Musteranalyse
          </span>
          {abstentionCount >= 3 && (
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
              {abstentionCount} Enthaltungen
            </span>
          )}
        </h4>
        <div className="flex gap-2">
          {!data ? (
            <button
              onClick={() => {
                fetchAnalysis()
                setExpanded(true)
              }}
              disabled={loading}
              className="text-sm px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <span className="animate-spin">↻</span> Analysiere…
                </>
              ) : (
                <>
                  <span>🔍</span> Analyse anfordern
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {expanded ? 'Einklappen' : 'Ausklappen'}
            </button>
          )}
        </div>
      </div>

      {!data && abstentionCount >= 3 && (
        <p className="text-sm text-indigo-600 mb-2" role="status" aria-live="polite">
          {abstentionCount} Enthaltungen erkannt — Musteranalyse verfügbar.
        </p>
      )}

      {data && expanded && (
        <div className="space-y-5">
          {/* Header stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 border border-indigo-100 text-center">
              <div className="text-2xl font-black text-indigo-700">{data.totalAbstentions}</div>
              <div className="text-xs text-indigo-500 mt-0.5">Enthaltungen</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-indigo-100 text-center">
              <div className="text-2xl font-black text-indigo-700">
                {Object.keys(data.thematicGroups).length}
              </div>
              <div className="text-xs text-indigo-500 mt-0.5">Themen-Cluster</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-indigo-100 text-center">
              <div className="text-2xl font-black text-indigo-700">
                {data.recommendations.length}
              </div>
              <div className="text-xs text-indigo-500 mt-0.5">Empfehlungen</div>
            </div>
          </div>

          {/* Reason distribution */}
          {totalReasons > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-indigo-900 mb-3">
                Verteilung nach Enthaltungsgrund
              </h5>
              <div className="space-y-2">
                {Object.entries(data.reasonCounts).map(([key, count]) => {
                  const config = REASON_CONFIG[key]
                  const pct = totalReasons > 0 ? Math.round((count / totalReasons) * 100) : 0
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-8 text-center shrink-0">
                        <span className="text-lg">{config?.icon ?? '?'}</span>
                      </div>
                      <div className="w-28 shrink-0">
                        <span className="text-sm font-medium text-indigo-800">
                          {key} — {config?.label ?? key}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div
                          className={`h-6 rounded-full ${config?.bg ?? 'bg-gray-100'} relative overflow-hidden`}
                        >
                          {pct > 0 && (
                            <div
                              className="h-full bg-indigo-200 rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          )}
                          {pct > 15 && (
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-700">
                              {pct}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-10 text-right shrink-0">
                        <span className="text-sm font-bold text-indigo-700">{count}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-indigo-400 mt-2">
                Grund D und E sind Signale — kein Blocker, aber beachtenswert.
              </p>
            </div>
          )}

          {/* Thematic clusters */}
          {Object.keys(data.thematicGroups).length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-indigo-900 mb-3" id={`clusters-${roundId}`}>
                🔍 Thematische Cluster
              </h5>
              <div className="space-y-2" role="list" aria-labelledby={`clusters-${roundId}`}>
                {Object.entries(data.thematicGroups).map(([theme, descriptions], idx) => (
                  <div
                    key={idx}
                    role="listitem"
                    className="bg-white rounded-lg p-3 border border-indigo-100"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-400 text-lg mt-0.5">🔎</span>
                      <div>
                        <span className="text-sm font-semibold text-indigo-800">{theme}</span>
                        {descriptions.map((desc, i) => (
                          <p key={i} className="text-xs text-indigo-600 mt-0.5">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {data.recommendations.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-indigo-900 mb-3">
                💡 Handlungsempfehlungen
              </h5>
              <div className="space-y-2">
                {data.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-3 border border-indigo-100 flex items-start gap-2"
                  >
                    <span className="text-indigo-400 text-lg shrink-0 mt-0.5">→</span>
                    <p className="text-sm text-indigo-700 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          {data.analysedAt && (
            <div className="flex items-center justify-between border-t border-indigo-200 pt-3">
              <p className="text-xs text-indigo-400">Analyse: {data.analysedAt}</p>
              <button
                onClick={() => {
                  setData(null)
                  setExpanded(false)
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Neu analysieren
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
