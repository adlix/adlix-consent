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

const ACTION_CONFIG: Record<
  string,
  { label: string; icon: string; color: string; dotColor: string; group: string }
> = {
  create_project: { label: 'Vorhaben erstellt', icon: '📋', color: 'text-blue-700', dotColor: 'bg-blue-500', group: 'Erstellen' },
  start_round: { label: 'Runde gestartet', icon: '🔄', color: 'text-indigo-700', dotColor: 'bg-indigo-500', group: 'Prozess' },
  phase_transition: { label: 'Phase gewechselt', icon: '➡️', color: 'text-violet-700', dotColor: 'bg-violet-500', group: 'Prozess' },
  submit_question: { label: 'Frage gestellt', icon: '❓', color: 'text-cyan-700', dotColor: 'bg-cyan-500', group: 'Kommunikation' },
  submit_answer: { label: 'Frage beantwortet', icon: '💡', color: 'text-blue-700', dotColor: 'bg-blue-400', group: 'Kommunikation' },
  submit_reaction: { label: 'Perspektive geteilt', icon: '💬', color: 'text-purple-700', dotColor: 'bg-purple-500', group: 'Kommunikation' },
  submit_vote: { label: 'Hat abgestimmt', icon: '🗳️', color: 'text-emerald-700', dotColor: 'bg-emerald-500', group: 'Abstimmung' },
  change_vote: { label: 'Stimme geändert', icon: '🔄', color: 'text-amber-700', dotColor: 'bg-amber-500', group: 'Abstimmung' },
  submit_objection: { label: 'Einwand erhoben', icon: '🔴', color: 'text-red-700', dotColor: 'bg-red-500', group: 'Einwände' },
  resolve_objection: { label: 'Einwand aufgelöst', icon: '✅', color: 'text-green-700', dotColor: 'bg-green-500', group: 'Einwände' },
  adjust_proposal: { label: 'Vorschlag angepasst', icon: '✏️', color: 'text-orange-700', dotColor: 'bg-orange-500', group: 'Prozess' },
  complete_round: { label: 'Beschluss gefasst', icon: '✅', color: 'text-green-700', dotColor: 'bg-green-600', group: 'Abschluss' },
  create_outcome: { label: 'Ergebnis dokumentiert', icon: '📋', color: 'text-green-700', dotColor: 'bg-green-500', group: 'Abschluss' },
  invite_participant: { label: 'Teilnehmer eingeladen', icon: '👤', color: 'text-slate-700', dotColor: 'bg-slate-400', group: 'Team' },
  join_circle: { label: 'Dem Kreis beigetreten', icon: '🔵', color: 'text-slate-700', dotColor: 'bg-slate-500', group: 'Team' },
}

interface DayGroup {
  date: string
  entries: AuditEntry[]
}

interface AuditTrailProps {
  projectId: number | string
  fallbackEntries?: { action: string; label: string; timestamp: string }[]
}

export default function AuditTrail({ projectId, fallbackEntries }: AuditTrailProps) {
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [useFallback, setUseFallback] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

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
      return new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    } catch {
      return ''
    }
  }

  const getDayLabel = (iso: string) => {
    try {
      const d = new Date(iso)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      if (d.toDateString() === today.toDateString()) return 'Heute'
      if (d.toDateString() === yesterday.toDateString()) return 'Gestern'
      return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
    } catch {
      return ''
    }
  }

  const groupByDay = (items: AuditEntry[]): DayGroup[] => {
    const groups: Record<string, AuditEntry[]> = {}
    for (const entry of items) {
      const day = new Date(entry.createdAt).toDateString()
      if (!groups[day]) groups[day] = []
      groups[day].push(entry)
    }
    return Object.entries(groups)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([, entries]) => ({
        date: entries[0].createdAt,
        entries,
      }))
  }

  const stats = {
    total: entries.length,
    votes: entries.filter((e) => e.action === 'submit_vote').length,
    objections: entries.filter((e) => e.action === 'submit_objection').length,
    reactions: entries.filter((e) => e.action === 'submit_reaction').length,
    questions: entries.filter((e) => e.action === 'submit_question').length,
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-2/3" />
              <div className="h-2.5 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
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

  const visibleEntries = expanded ? entries : entries.slice(-5)
  const dayGroups = groupByDay(visibleEntries)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            title={expanded ? 'Kompakt anzeigen' : 'Alle anzeigen'}
          >
            <span className="text-base">{expanded ? '🔽' : '▶️'}</span>
          </button>
          <h3 className="text-sm font-medium text-gray-600">Aktivitäten</h3>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {stats.total}
          </span>
        </div>
        {/* Stats pills */}
        <div className="flex items-center gap-1.5 text-xs">
          {stats.questions > 0 && (
            <span className="bg-cyan-50 text-cyan-600 px-2 py-0.5 rounded-full font-medium">
              ❓ {stats.questions}
            </span>
          )}
          {stats.reactions > 0 && (
            <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
              💬 {stats.reactions}
            </span>
          )}
          {stats.votes > 0 && (
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
              🗳️ {stats.votes}
            </span>
          )}
          {stats.objections > 0 && (
            <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
              🔴 {stats.objections}
            </span>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200"
          aria-hidden="true"
        />

        <div className="space-y-5">
          {dayGroups.map(({ date, entries: dayEntries }) => (
            <div key={date}>
              {/* Day label */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 shrink-0" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {getDayLabel(date)}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Entries for this day */}
              <div className="space-y-3">
                {dayEntries.map((entry) => {
                  const info = ACTION_CONFIG[entry.action] || {
                    label: entry.action,
                    icon: '📌',
                    color: 'text-gray-600',
                    dotColor: 'bg-gray-400',
                    group: 'Sonstiges',
                  }
                  return (
                    <div key={entry.id} className="flex items-start gap-3 relative">
                      {/* Dot */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ring-4 ring-white z-10 ${info.dotColor} shadow-sm`}
                        aria-hidden="true"
                      >
                        {info.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className={`text-sm font-medium ${info.color}`}>{info.label}</p>
                            {entry.userName && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                von <span className="font-medium">{entry.userName}</span>
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 shrink-0 pt-1">
                            {formatTime(entry.createdAt)}
                          </span>
                        </div>
                        {showDetails && entry.details && (
                          <p className="text-xs text-gray-500 mt-1 bg-gray-50 rounded-lg px-2 py-1.5">
                            {entry.details}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show more / less */}
      {entries.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            {expanded ? (
              <>
                <span>▲ Weniger anzeigen</span>
                <span className="text-gray-300">·</span>
                <span>{entries.length - 5} weitere</span>
              </>
            ) : (
              <>▶️ Alle {entries.length} Aktivitäten anzeigen</>
            )}
          </button>
        </div>
      )}

      {/* Detail toggle */}
      <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showDetails ? '🔒 Details ausblenden' : '🔍 Details anzeigen'}
        </button>
      </div>
    </div>
  )
}