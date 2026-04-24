'use client'

import { useEffect, useState } from 'react'
import strapi from '../../lib/strapi'

interface AuditEntry {
  id: number
  action: string
  entityType: string
  entityId: string
  details: string | null
  userName: string | null
  createdAt: string
}

const actionLabels: Record<string, { label: string; icon: string }> = {
  create_project: { label: 'Vorhaben erstellt', icon: '📋' },
  start_round: { label: 'Runde gestartet', icon: '🔄' },
  phase_transition: { label: 'Phasenwechsel', icon: '➡️' },
  submit_question: { label: 'Frage gestellt', icon: '❓' },
  submit_answer: { label: 'Frage beantwortet', icon: '💡' },
  submit_reaction: { label: 'Perspektive geteilt', icon: '💬' },
  submit_vote: { label: 'Abgestimmt', icon: '🗳️' },
  change_vote: { label: 'Stimme geändert', icon: '🔄' },
  submit_objection: { label: 'Einwand erhoben', icon: '🔴' },
  adjust_proposal: { label: 'Vorschlag angepasst', icon: '✏️' },
  complete_round: { label: 'Runde abgeschlossen', icon: '✅' },
}

interface AuditTrailProps {
  projectId: number | string
  fallbackEntries?: { action: string; label: string; timestamp: string }[]
}

export default function AuditTrail({ projectId, fallbackEntries }: AuditTrailProps) {
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await strapi.getAuditLogs(projectId)
        const data = (response.data as AuditEntry[]) || []
        if (data.length > 0) {
          setEntries(data)
        } else {
          setUseFallback(true)
        }
      } catch {
        setUseFallback(true)
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [projectId])

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return iso
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-3/4" />
        ))}
      </div>
    )
  }

  if (useFallback && fallbackEntries) {
    return (
      <div className="space-y-1 text-xs text-gray-400">
        {fallbackEntries.map((entry, i) => (
          <div key={i}>
            {entry.label} — {entry.timestamp}
          </div>
        ))}
      </div>
    )
  }

  if (entries.length === 0) {
    return <p className="text-xs text-gray-400">Noch keine Aktivitäten.</p>
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => {
        const info = actionLabels[entry.action] || { label: entry.action, icon: '📌' }
        return (
          <div key={entry.id} className="flex items-start gap-2 text-sm">
            <span className="text-base shrink-0">{info.icon}</span>
            <div className="min-w-0">
              <span className="text-gray-700 font-medium">{info.label}</span>
              {entry.userName && (
                <span className="text-gray-500"> — {entry.userName}</span>
              )}
              {entry.details && (
                <span className="text-gray-500">: {entry.details}</span>
              )}
              <div className="text-xs text-gray-400">{formatTime(entry.createdAt)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
