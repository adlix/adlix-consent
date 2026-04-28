'use client'

import { useState } from 'react'
import strapi from '../../lib/strapi'

interface Cluster {
  id: string
  label: string
  reasonCodes: string[]
  description: string
  count: number
  keywords: string[]
}

interface AnalysisResult {
  total: number
  clusters: Cluster[]
  recommendations: string[]
  analysedAt: string
}

interface AbstentionAnalysisViewProps {
  roundId: number | string
  abstentionCount: number
  isOwner: boolean
}

const CLUSTER_COLORS: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  not_affected:      { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-400' },
  needs_info:        { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
  anonymous_concerns:{ bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
  no_commitment:     { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-500' },
}

function ClusterBar({ count, total }: { count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
      <div
        className="h-1.5 rounded-full bg-current opacity-40 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function AbstentionAnalysisView({
  roundId,
  abstentionCount,
  isOwner,
}: AbstentionAnalysisViewProps) {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOwner) return null

  const MIN_COUNT = 3
  const canAnalyse = abstentionCount >= MIN_COUNT

  async function runAnalysis() {
    setLoading(true)
    setError(null)
    try {
      const response = await strapi.analyseAbstentions(roundId)
      setResult(response.data as unknown as AnalysisResult)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Analyse fehlgeschlagen'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (!canAnalyse) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
        <span className="font-medium text-gray-600">Enthaltungs-Analyse</span>
        <span className="ml-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-500">
          Pro
        </span>
        <p className="mt-1">
          Mindestens {MIN_COUNT} Enthaltungen erforderlich ({abstentionCount} vorhanden).
        </p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-800">Enthaltungs-Analyse</span>
            <span className="ml-2 rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-600">
              Pro
            </span>
            <p className="mt-0.5 text-sm text-gray-500">
              {abstentionCount} Enthaltungen — Muster erkennen & Empfehlungen erhalten
            </p>
          </div>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Analysiere…
              </>
            ) : (
              'Analyse anfordern'
            )}
          </button>
        </div>
        {error && (
          <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">Enthaltungs-Analyse</h3>
            <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-600">
              Pro
            </span>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            {result.total} Enthaltungen · analysiert{' '}
            {new Date(result.analysedAt).toLocaleString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <button
          onClick={runAnalysis}
          disabled={loading}
          className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
        >
          Neu analysieren
        </button>
      </div>

      {/* Clusters */}
      <div className="grid gap-3 sm:grid-cols-2">
        {result.clusters.map((cluster) => {
          const colors = CLUSTER_COLORS[cluster.id] ?? CLUSTER_COLORS.not_affected
          return (
            <div
              key={cluster.id}
              className={`rounded-lg border p-3.5 ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                  <span className={`text-sm font-medium ${colors.text}`}>{cluster.label}</span>
                  <span className="text-xs text-gray-400">
                    ({cluster.reasonCodes.join(', ')})
                  </span>
                </div>
                <span className={`text-lg font-bold ${colors.text}`}>{cluster.count}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{cluster.description}</p>
              <ClusterBar count={cluster.count} total={result.total} />
              {cluster.keywords.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {cluster.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-white/60 px-2 py-0.5 text-xs text-gray-600 border border-gray-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Recommendations */}
      <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-indigo-800">Empfehlungen</h4>
        <ul className="space-y-2">
          {result.recommendations.map((rec, i) => (
            <li key={i} className="flex gap-2 text-sm text-indigo-700">
              <span className="mt-0.5 shrink-0 text-indigo-400">→</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
