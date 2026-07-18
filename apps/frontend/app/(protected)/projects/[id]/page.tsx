'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { strapi } from '@/lib/strapi'
import OutcomeForm from '@/components/Outcome/OutcomeForm'
import AuditTrail from '@/components/AuditTrail/AuditTrail'
import ConsentVotePanel from '@/components/ConsentVote/ConsentVotePanel'
import AnonymousConcernsView from '@/components/AnonymousConcerns/AnonymousConcernsView'
import AbstentionAnalysisView from '@/components/AbstentionAnalysis/AbstentionAnalysisView'
import ConsentPhaseTracker from '@/components/ConsentPhaseTracker/ConsentPhaseTracker'

const AbstainReasonModal = dynamic(() => import('@/components/AbstainReason/AbstainReasonModal'), {
  ssr: false,
})

type ConsentChoice = 'consent' | 'minor_objection' | 'major_objection' | 'abstain'

interface ProjectData {
  id: number
  name: string
  description: string
  goal?: string
  tension?: string
  status: string
  outcome?: string
  nextSteps?: string
  evaluationDate?: string
  owner?: { id: number; username?: string; email?: string }
  participants?: { id: number; username?: string; email?: string }[]
  circle?: { id: number; name: string; members?: { id: number }[] }
  currentRound?: { id: number }
}

interface RoundData {
  id: number
  roundNumber: number
  proposal: string
  status: string
  startDate?: string
  endDate?: string
  votes: {
    id: number
    choice: ConsentChoice
    reason?: string
    user?: { id: number; username?: string }
  }[]
  objections: {
    id: number
    reason: string
    severity: string
    user?: { id: number; username?: string }
    status: string
  }[]
  comments: {
    id: number
    content: string
    type: string
    user?: { id: number; username?: string }
    createdAt: string
  }[]
}

// Consent Flow Phases (matching CONCEPT.md)
const flowPhases = [
  {
    key: 'information',
    label: 'Informationsrunde',
    icon: '❓',
    hint: 'Nur Verständnisfragen — keine Meinungen',
  },
  {
    key: 'reaction',
    label: 'Reaktionsrunde',
    icon: '💬',
    hint: 'Nur Perspektiven — kein Gegenargumentieren',
  },
  {
    key: 'adjustment',
    label: 'Anpassung',
    icon: '🔄',
    hint: 'Einreicher überarbeitet den Vorschlag',
  },
  { key: 'voting', label: 'Abstimmung', icon: '🗳️', hint: 'Konsent-Abstimmung' },
  { key: 'integration', label: 'Integration', icon: '🤝', hint: 'Einwände werden integriert' },
  { key: 'completed', label: 'Ergebnis', icon: '✅', hint: 'Beschluss gefasst' },
]

const phaseOrder = flowPhases.map((p) => p.key)

// Shared helper: normalize a raw Strapi round object into typed RoundData
function normalizeRound(r: any): RoundData {
  return {
    id: r.id,
    roundNumber: r.roundNumber,
    proposal: r.proposal,
    status: r.status,
    startDate: r.startDate,
    endDate: r.endDate,
    votes: (r.votes || []).map((v: any) => ({
      id: v.id,
      choice: v.choice,
      reason: v.reason,
      user: v.user,
    })),
    objections: (r.objections || []).map((o: any) => ({
      id: o.id,
      reason: o.reason,
      severity: o.severity,
      user: o.user,
      status: o.status || 'open',
    })),
    comments: (r.comments || []).map((c: any) => ({
      id: c.id,
      content: c.content,
      type: c.type || 'question',
      user: c.user,
      createdAt: c.createdAt,
    })),
  }
}

// Helper: reload all rounds and sync selected round
async function reloadRounds(
  projectId: string,
  currentRoundId: number | undefined
): Promise<{ all: RoundData[]; selected: RoundData | null }> {
  const res = await strapi.getRounds(projectId)
  const rawData = (res.data as any[]) || []
  const all = rawData.map(normalizeRound)
  const selected =
    (currentRoundId ? all.find((r) => r.id === currentRoundId) : undefined) ??
    all[all.length - 1] ??
    null
  return { all, selected }
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const { data: session, status: authStatus } = useSession()

  const [project, setProject] = useState<ProjectData | null>(null)
  const [rounds, setRounds] = useState<RoundData[]>([])
  const [selectedRound, setSelectedRound] = useState<RoundData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [userVote, setUserVote] = useState<ConsentChoice | null>(null)
  const [allowChangeVote, setAllowChangeVote] = useState(false)
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [showReactionForm, setShowReactionForm] = useState(false)
  const [question, setQuestion] = useState('')
  const [reaction, setReaction] = useState('')
  const [showAbstainModal, setShowAbstainModal] = useState(false)
  const [outcomeSubmitted, setOutcomeSubmitted] = useState(false)
  const [outcomeData, setOutcomeData] = useState<{
    outcome: string
    nextSteps: string
    evaluationDate: string
  } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [advancing, setAdvancing] = useState(false)
  const [answeringCommentId, setAnsweringCommentId] = useState<number | null>(null)
  const [answerText, setAnswerText] = useState('')
  const [forceCloseConfirm, setForceCloseConfirm] = useState(false)
  const [showNewRoundForm, setShowNewRoundForm] = useState(false)
  const [newRoundProposal, setNewRoundProposal] = useState('')
  const [adjustmentProposal, setAdjustmentProposal] = useState('')
  const [adjustmentSaving, setAdjustmentSaving] = useState(false)
  const [adjustmentError, setAdjustmentError] = useState('')
  const [adjustmentSuccess, setAdjustmentSuccess] = useState(false)

  const jwt = (session as unknown as { jwt?: string })?.jwt

  // Sync adjustment proposal when round changes or enters adjustment phase
  useEffect(() => {
    if (selectedRound?.status === 'adjustment') {
      setAdjustmentProposal(selectedRound.proposal)
      setAdjustmentError('')
      setAdjustmentSuccess(false)
    }
  }, [selectedRound?.id, selectedRound?.status])

  // Load project data from Strapi
  useEffect(() => {
    async function loadProject() {
      if (!params.id) return
      strapi.setJwt(jwt || null)
      try {
        const res = await strapi.getProject(
          params.id,
          'owner,participants,circle,circle.members,currentRound'
        )
        const data = res.data as any
        setProject({
          id: data.id,
          name: data.name,
          description: data.description,
          goal: data.goal,
          tension: data.tension,
          status: data.status,
          outcome: data.outcome,
          nextSteps: data.nextSteps,
          evaluationDate: data.evaluationDate,
          owner: data.owner,
          participants: data.participants,
          circle: data.circle,
          currentRound: data.currentRound,
        })

        // Load rounds
        const { all: formatted, selected: latestRound } = await reloadRounds(params.id, undefined)
        setRounds(formatted)
        if (latestRound) {
          setSelectedRound(latestRound)
        }
      } catch (err) {
        setError('Projekt konnte nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    if (authStatus !== 'loading') loadProject()
  }, [params.id, jwt, authStatus])

  const currentPhaseIndex = selectedRound ? phaseOrder.indexOf(selectedRound.status) : -1

  // Check if current user has already voted
  const userId = session?.user?.id
  const userHasVoted = selectedRound?.votes.some((v) => String(v.user?.id) === userId)

  const handleAbstainSubmit = async (data: {
    reason: 'A' | 'B' | 'C' | 'D' | 'E'
    detail?: string
    isObjection?: boolean
    objectionSeverity?: 'minor' | 'major'
  }) => {
    setShowAbstainModal(false)
    strapi.setJwt(jwt || null)
    try {
      // Always register the abstain vote so the vote count is accurate
      await strapi.castVote(selectedRound!.id, 'abstain', Number(userId))
      if (data.isObjection) {
        // User revealed an objection during the abstain flow — register that too
        const severity = data.objectionSeverity === 'major' ? 'major' : 'minor'
        await strapi.createObjection({
          reason: data.detail || 'Einwand aus Enthaltungs-Reflexionsprozess',
          severity,
          round: selectedRound!.id,
          user: Number(userId),
        })
        setUserVote(severity === 'major' ? 'major_objection' : 'minor_objection')
      } else {
        setUserVote('abstain')
      }
      // Reload round so vote count and results update
      const { all: refreshed, selected: refreshedRound } = await reloadRounds(
        params.id,
        selectedRound!.id
      )
      setRounds(refreshed)
      setSelectedRound(refreshedRound)
    } catch (_) {
      setError('Enthaltung konnte nicht gespeichert werden.')
    }
  }

  const handleAdvancePhase = async () => {
    if (!selectedRound) return
    setAdvancing(true)
    strapi.setJwt(jwt || null)
    try {
      await strapi.transitionRoundPhase(selectedRound.id)
      // Reload rounds
      const { all: formatted, selected: updatedRound } = await reloadRounds(
        params.id,
        selectedRound.id
      )
      setRounds(formatted)
      setSelectedRound(updatedRound)
    } catch (_) {
      setError('Phase konnte nicht gewechselt werden.')
    } finally {
      setAdvancing(false)
    }
  }

  const handleOutcomeSubmit = async (data: {
    outcome: string
    nextSteps: string
    evaluationDate: string
    status: string
  }) => {
    strapi.setJwt(jwt || null)
    try {
      await strapi.setOutcome(project!.id, {
        outcome: data.outcome,
        nextSteps: data.nextSteps,
        evaluationDate: data.evaluationDate,
        status: 'beschlossen',
        minorObjectionsLog: selectedRound?.objections
          ?.filter((o) => o.severity === 'minor')
          .map((o) => ({ user: o.user?.username || 'Anonym', reason: o.reason })),
      })
      setOutcomeData(data)
      setOutcomeSubmitted(true)
    } catch (_) {
      setError('Ergebnis konnte nicht gespeichert werden.')
    }
  }

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.includes('?')) return
    setSubmitting(true)
    strapi.setJwt(jwt || null)
    try {
      await strapi.createComment({
        content: question,
        round: selectedRound!.id,
        user: Number(userId),
        type: 'question',
      })
      setQuestion('')
      setShowQuestionForm(false)
      // Reload so the new question appears immediately
      const { all: refreshed, selected: refreshedRound } = await reloadRounds(
        params.id,
        selectedRound!.id
      )
      setRounds(refreshed)
      setSelectedRound(refreshedRound)
    } catch (_) {
      setError('Frage konnte nicht gesendet werden.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitReaction = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reaction.trim()) return
    setSubmitting(true)
    strapi.setJwt(jwt || null)
    try {
      await strapi.createComment({
        content: reaction,
        round: selectedRound!.id,
        user: Number(userId),
        type: 'reaction',
      })
      setReaction('')
      setShowReactionForm(false)
      // Reload so the new reaction appears immediately
      const { all: refreshed, selected: refreshedRound } = await reloadRounds(
        params.id,
        selectedRound!.id
      )
      setRounds(refreshed)
      setSelectedRound(refreshedRound)
    } catch (_) {
      setError('Reaktion konnte nicht gesendet werden.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!answerText.trim() || !selectedRound || !userId) return
    setSubmitting(true)
    strapi.setJwt(jwt || null)
    try {
      await strapi.createComment({
        content: answerText.trim(),
        round: selectedRound.id,
        user: Number(userId),
        type: 'answer',
      })
      setAnswerText('')
      setAnsweringCommentId(null)
      const { all: refreshed, selected: refreshedRound } = await reloadRounds(
        params.id,
        selectedRound.id
      )
      setRounds(refreshed)
      setSelectedRound(refreshedRound)
    } catch (_) {
      setError('Antwort konnte nicht gespeichert werden.')
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-3xl mb-4 animate-pulse">🗳️</div>
          <p className="text-gray-500">Lade Projekt…</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Projekt nicht gefunden'}</p>
          <Link href="/projects" className="text-blue-600 hover:text-blue-700">
            ← Zurück zu Projekten
          </Link>
        </div>
      </div>
    )
  }

  const participantCount = project.participants?.length || project.circle?.members?.length || 0

  // ── Consent score helper ────────────────────────────────────────────
  const voteBreakdown = selectedRound
    ? { consent: 0, minor_objection: 0, major_objection: 0, abstain: 0 } as Record<string, number>
    : null
  if (voteBreakdown && selectedRound) {
    selectedRound.votes.forEach((v) => {
      if (v.choice in voteBreakdown) voteBreakdown[v.choice]++
    })
  }
  const consentScore =
    voteBreakdown && participantCount > 0
      ? Math.round((voteBreakdown.consent / participantCount) * 100)
      : null
  const votedCount = selectedRound?.votes.length ?? 0
  const majorObjections = selectedRound?.objections.filter(
    (o) => o.severity === 'major' && o.status === 'open'
  ).length ?? 0

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-2xl">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/projects" className="text-gray-600 hover:text-gray-900 text-sm">
              ← Vorhaben
            </Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 text-sm">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Project Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
                <p className="text-gray-600">{project.description}</p>
                {project.goal && (
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Ziel:</strong> {project.goal}
                  </p>
                )}
                {project.tension && (
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Spannung:</strong> {project.tension}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : project.status === 'beschlossen'
                        ? 'bg-blue-100 text-blue-700'
                        : project.status === 'completed'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {project.status === 'active'
                    ? 'Aktiv'
                    : project.status === 'beschlossen'
                      ? 'Beschlossen'
                      : project.status === 'completed'
                        ? 'Abgeschlossen'
                        : 'Entwurf'}
                </span>
                {consentScore !== null && selectedRound?.status === 'voting' && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      consentScore >= 80
                        ? 'bg-emerald-100 text-emerald-700'
                        : consentScore >= 50
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                    title={`${voteBreakdown!.consent}/${participantCount} Konsent · ${votedCount}/${participantCount} abgestimmt`}
                  >
                    📊 {consentScore}% Konsent
                  </span>
                )}
                {majorObjections > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                    🔴 {majorObjections} Einwand{majorObjections > 1 ? 'wände' : ''}
                  </span>
                )}
                {selectedRound?.status === 'voting' && votedCount < participantCount && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    ⏳ {participantCount - votedCount} ausstehend
                  </span>
                )}
                {String(userId) === String(project.owner?.id) &&
                  project.status !== 'beschlossen' &&
                  project.status !== 'completed' && (
                    <Link
                      href={`/projects/${params.id}/edit`}
                      className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      ✏️ Bearbeiten
                    </Link>
                  )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
              <span>👤 {project.owner?.username || 'Unbekannt'}</span>
              <span>👥 {participantCount} Teilnehmer</span>
              {selectedRound && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedRound.status === 'voting'
                    ? 'bg-blue-100 text-blue-700'
                    : selectedRound.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : selectedRound.status === 'information'
                        ? 'bg-indigo-100 text-indigo-700'
                        : selectedRound.status === 'reaction'
                          ? 'bg-purple-100 text-purple-700'
                          : selectedRound.status === 'integration'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-600'
                }`}>
                  Runde {selectedRound.roundNumber} · {flowPhases[phaseOrder.indexOf(selectedRound.status)]?.label || selectedRound.status}
                </span>
              )}
              {rounds.length > 1 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                  ↻ {rounds.length} Runden gesamt
                </span>
              )}
              {project.circle && <span>🌀 {project.circle.name}</span>}
            </div>
            {/* Invite / Share */}
            {project.circle && (
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">Einladungslink:</span>
                <Link
                  href={`/circles/${project.circle.id}`}
                  className="flex-1 text-xs text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium transition-colors truncate"
                >
                  🌀 {project.circle.name} — Einladungen hier verwalten →
                </Link>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `${window.location.origin}/circles/${project!.circle?.id}`
                      )
                    } catch {
                      // clipboard not available
                    }
                  }}
                  className="shrink-0 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  🔗 Kopieren
                </button>
              </div>
            )}
          </div>

          {/* Consent Flow Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <ConsentPhaseTracker
              currentPhase={selectedRound?.status ?? 'information'}
              phases={flowPhases.map((p) => ({
                key: p.key,
                label: p.label,
                icon: p.icon,
                description: p.hint,
              }))}
              votes={selectedRound?.votes ?? []}
              objections={selectedRound?.objections ?? []}
              participantCount={participantCount}
            />
            {String(userId) === String(project?.owner?.id) &&
              selectedRound &&
              selectedRound.status !== 'completed' &&
              selectedRound.status !== 'voting' && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleAdvancePhase}
                    disabled={advancing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 text-sm"
                  >
                    {advancing
                      ? 'Wechsle Phase…'
                      : `→ ${flowPhases[(currentPhaseIndex ?? 0) + 1]?.label || 'Nächste Phase'} starten`}
                  </button>
                </div>
              )}
          </div>

          {/* Round Selector */}
          {rounds.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">Abstimmungsrunden</h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {rounds.map((round) => (
                  <button
                    key={round.id}
                    onClick={() => setSelectedRound(round)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedRound?.id === round.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Runde {round.roundNumber}
                    {round.status === 'voting' && ' 🗳️'}
                    {round.status === 'completed' && ' ✓'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Round */}
          {selectedRound && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Runde {selectedRound.roundNumber}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedRound.status === 'voting'
                      ? 'bg-blue-600 text-white'
                      : selectedRound.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : selectedRound.status === 'information'
                          ? 'bg-indigo-100 text-indigo-700'
                          : selectedRound.status === 'reaction'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {flowPhases[phaseOrder.indexOf(selectedRound.status)]?.label ||
                    selectedRound.status}
                </span>
              </div>

              {/* Proposal — das Herzstück des Prozesses */}
              <div
                className="rounded-xl p-5 mb-6 border-l-4"
                style={{ background: 'var(--proposal-bg)', borderColor: 'var(--proposal-accent)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">📜</span>
                  <h3
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--proposal-accent)' }}
                  >
                    Vorschlag
                  </h3>
                </div>
                <p className="text-gray-900 leading-relaxed text-base">{selectedRound.proposal}</p>
              </div>

              {/* Information Phase — Questions */}
              {selectedRound.status === 'information' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Informationsrunde</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Stelle Verständnisfragen zum Vorschlag. Keine Meinungen oder Diskussion — nur
                    Klärung.
                  </p>
                  {/* Group: questions with their answers */}
                  {(() => {
                    const questions = selectedRound.comments.filter((c) => c.type === 'question')
                    const answers = selectedRound.comments.filter((c) => c.type === 'answer')
                    const isOwner = String(userId) === String(project?.owner?.id)
                    if (questions.length === 0) {
                      return (
                        <p className="text-sm text-gray-400 italic mb-4">
                          Noch keine Fragen — sei der Erste.
                        </p>
                      )
                    }
                    return questions.map((q, qi) => {
                      // Find answers that come after this question and before the next
                      const nextQ = questions[qi + 1]
                      const relevantAnswers = answers.filter(
                        (a) =>
                          new Date(a.createdAt) > new Date(q.createdAt) &&
                          (!nextQ || new Date(a.createdAt) < new Date(nextQ.createdAt))
                      )
                      return (
                        <div key={q.id} className="mb-4">
                          {/* Question */}
                          <div className="p-4 rounded-xl bg-indigo-50 border-l-4 border-indigo-300">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">
                                ❓ {q.user?.username || 'Anonym'}
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(q.createdAt).toLocaleDateString('de-DE')}
                              </span>
                            </div>
                            <p className="text-gray-800 text-sm">{q.content}</p>
                            {/* Owner: answer button */}
                            {isOwner && answeringCommentId !== q.id && (
                              <button
                                onClick={() => {
                                  setAnsweringCommentId(q.id)
                                  setAnswerText('')
                                }}
                                className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                              >
                                💡 Antworten
                              </button>
                            )}
                            {/* Answer form */}
                            {isOwner && answeringCommentId === q.id && (
                              <form onSubmit={handleSubmitAnswer} className="mt-3 space-y-2">
                                <textarea
                                  value={answerText}
                                  onChange={(e) => setAnswerText(e.target.value)}
                                  rows={2}
                                  className="w-full px-3 py-2 text-sm border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                                  placeholder="Deine Antwort…"
                                  autoFocus
                                  required
                                />
                                <div className="flex gap-2">
                                  <button
                                    type="submit"
                                    disabled={submitting || !answerText.trim()}
                                    className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                                  >
                                    {submitting ? 'Speichere…' : 'Antwort einreichen'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setAnsweringCommentId(null)}
                                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg"
                                  >
                                    Abbrechen
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                          {/* Answers */}
                          {relevantAnswers.map((a) => (
                            <div
                              key={a.id}
                              className="ml-6 mt-1 p-3 rounded-xl bg-blue-50 border-l-4 border-blue-300"
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="font-medium text-xs">
                                  💡 {a.user?.username || 'Einreicher'}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {new Date(a.createdAt).toLocaleDateString('de-DE')}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">{a.content}</p>
                            </div>
                          ))}
                        </div>
                      )
                    })
                  })()}
                  <button
                    onClick={() => setShowQuestionForm(!showQuestionForm)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                  >
                    ❓ Frage stellen
                  </button>
                  {showQuestionForm && (
                    <form
                      onSubmit={handleSubmitQuestion}
                      className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200"
                    >
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-2"
                        rows={2}
                        placeholder="Deine Frage zum Vorschlag... (muss ein ? enthalten)"
                        required
                      />
                      {question && !question.includes('?') && (
                        <p className="text-xs text-red-500 mb-2">
                          Fragen müssen ein Fragezeichen (?) enthalten.
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                          disabled={!question.includes('?') || submitting}
                        >
                          {submitting ? 'Sende…' : 'Frage einreichen'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowQuestionForm(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Reaction Phase — Perspectives */}
              {selectedRound.status === 'reaction' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Reaktionsrunde</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Teile deine Perspektive — reihum, kein Gegenargumentieren. Aktives Zuhören.
                  </p>
                  {selectedRound.comments
                    .filter((c) => c.type === 'reaction' || c.type === 'perspective')
                    .map((cmt) => (
                      <div
                        key={cmt.id}
                        className="p-4 rounded-lg mb-2 bg-purple-50 border-l-4 border-purple-300"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">
                            💬 {cmt.user?.username || 'Anonym'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(cmt.createdAt).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{cmt.content}</p>
                      </div>
                    ))}
                  <button
                    onClick={() => setShowReactionForm(!showReactionForm)}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                  >
                    💬 Perspektive teilen
                  </button>
                  {showReactionForm && (
                    <form
                      onSubmit={handleSubmitReaction}
                      className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200"
                    >
                      <textarea
                        value={reaction}
                        onChange={(e) => setReaction(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-2"
                        rows={2}
                        placeholder="Deine Perspektive zum Vorschlag..."
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium"
                          disabled={submitting}
                        >
                          {submitting ? 'Sende…' : 'Einreichen'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReactionForm(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Adjustment Phase — Proposal Edit */}
              {selectedRound.status === 'adjustment' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Vorschlag anpassen</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {String(userId) === String(project?.owner?.id)
                      ? 'Basierend auf den Reaktionen des Kreises kannst du den Vorschlag überarbeiten. Änderungen werden versioniert.'
                      : 'Der Einreicher überarbeitet den Vorschlag auf Basis der Rückmeldungen.'}
                  </p>

                  {/* Reaktionen aus der vorherigen Phase */}
                  {selectedRound.comments.filter(
                    (c) => c.type === 'reaction' || c.type === 'perspective'
                  ).length > 0 && (
                    <details className="mb-4 bg-purple-50 border border-purple-200 rounded-xl">
                      <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-purple-800 hover:text-purple-900">
                        💬 Reaktionen anzeigen (
                        {
                          selectedRound.comments.filter(
                            (c) => c.type === 'reaction' || c.type === 'perspective'
                          ).length
                        }
                        )
                      </summary>
                      <div className="px-4 pb-3 space-y-2">
                        {selectedRound.comments
                          .filter((c) => c.type === 'reaction' || c.type === 'perspective')
                          .map((cmt) => (
                            <div
                              key={cmt.id}
                              className="p-3 rounded-lg bg-white border border-purple-100"
                            >
                              <span className="text-xs text-gray-500">{cmt.user?.username}:</span>
                              <p className="text-sm text-gray-700">{cmt.content}</p>
                            </div>
                          ))}
                      </div>
                    </details>
                  )}

                  {String(userId) === String(project?.owner?.id) ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Ursprünglicher Vorschlag
                        </label>
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 line-through opacity-60">
                          {selectedRound.proposal}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Angepasster Vorschlag
                          {adjustmentSuccess && (
                            <span className="ml-2 text-xs text-emerald-600 font-normal">
                              ✓ Gespeichert
                            </span>
                          )}
                        </label>
                        <textarea
                          value={adjustmentProposal}
                          onChange={(e) => {
                            setAdjustmentProposal(e.target.value)
                            setAdjustmentError('')
                            setAdjustmentSuccess(false)
                          }}
                          rows={4}
                          className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm"
                          placeholder="Überarbeite den Vorschlag basierend auf den Reaktionen…"
                        />
                        {adjustmentError && (
                          <p className="mt-1.5 text-xs text-red-600">{adjustmentError}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500">
                      ⏳ Warte auf die Anpassung des Vorschlags durch den Einreicher.
                    </div>
                  )}

                  {/* Einreicher-Buttons */}
                  {String(userId) === String(project?.owner?.id) && (
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={async () => {
                          if (!adjustmentProposal.trim()) {
                            setAdjustmentError('Bitte gib einen Vorschlag ein.')
                            return
                          }
                          setAdjustmentSaving(true)
                          setAdjustmentError('')
                          strapi.setJwt(jwt || null)
                          try {
                            await strapi.updateRound(selectedRound!.id, {
                              proposal: adjustmentProposal.trim(),
                            })
                            setAdjustmentSuccess(true)
                            // Then advance phase to voting
                            await strapi.transitionRoundPhase(selectedRound!.id)
                            // Reload rounds
                            const { all: updatedRounds, selected: updatedRound } =
                              await reloadRounds(params.id, selectedRound!.id)
                            setRounds(updatedRounds)
                            setSelectedRound(updatedRound)
                          } catch (_) {
                            setAdjustmentError('Vorschlag konnte nicht gespeichert werden.')
                          } finally {
                            setAdjustmentSaving(false)
                          }
                        }}
                        disabled={adjustmentSaving || !adjustmentProposal.trim()}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 text-sm"
                      >
                        {adjustmentSaving
                          ? 'Speichere…'
                          : '💾 Vorschlag speichern & zur Abstimmung'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Voting Phase — Consent Vote (via ConsentVotePanel) */}
              {selectedRound.status === 'voting' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Konsent-Abstimmung</h3>

                  {/* Participation Progress Bar — prominent */}
                  {(() => {
                    const voted = selectedRound.votes.length
                    const total = participantCount
                    const pct = total > 0 ? Math.round((voted / total) * 100) : 0
                    const allVoted = voted === total && total > 0
                    const consented = selectedRound.votes.filter(
                      (v) => v.choice === 'consent'
                    ).length
                    const hasMajorObjection = selectedRound.votes.some(
                      (v) => v.choice === 'major_objection'
                    )
                    return (
                      <div
                        className={`mb-5 p-5 rounded-2xl border-2 ${
                          allVoted
                            ? 'bg-emerald-50 border-emerald-200'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl" aria-hidden="true">
                              {allVoted ? '✅' : '🗳️'}
                            </span>
                            <div>
                              <p
                                className={`text-sm font-bold ${
                                  allVoted ? 'text-emerald-800' : 'text-blue-800'
                                }`}
                              >
                                Abstimmungsbeteiligung
                              </p>
                              <p
                                className={`text-xs ${
                                  allVoted ? 'text-emerald-600' : 'text-blue-600'
                                }`}
                              >
                                {allVoted
                                  ? 'Alle haben abgestimmt!'
                                  : `${total - voted} von ${total} noch ausstehend`}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-2xl font-black ${
                                allVoted ? 'text-emerald-700' : 'text-blue-700'
                              }`}
                            >
                              {voted}/{total}
                            </div>
                            <div
                              className={`text-xs font-medium ${
                                allVoted ? 'text-emerald-600' : 'text-blue-600'
                              }`}
                            >
                              abgestimmt
                            </div>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-gray-200">
                          <div
                            className={`h-full transition-all duration-500 rounded-full ${
                              allVoted
                                ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                                : 'bg-gradient-to-r from-blue-400 to-primary'
                            }`}
                            style={{ width: `${pct}%` }}
                            role="progressbar"
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${voted} von ${total} abgestimmt`}
                          />
                        </div>

                        {/* Vote summary when voting is open */}
                        {selectedRound.votes.length > 0 && (
                          <div className="mt-3 flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1 text-emerald-700">
                              <span>✅</span>
                              <span className="font-medium">{consented}</span> Konsent
                            </span>
                            {selectedRound.votes.filter((v) => v.choice !== 'consent').length >
                              0 && (
                              <span
                                className={`flex items-center gap-1 ${
                                  hasMajorObjection ? 'text-red-700' : 'text-amber-700'
                                }`}
                              >
                                <span>{hasMajorObjection ? '🔴' : '💛'}</span>
                                <span className="font-medium">
                                  {selectedRound.votes.filter((v) => v.choice !== 'consent').length}
                                </span>{' '}
                                {hasMajorObjection ? 'Einwand' : 'Anmerkung'}
                              </span>
                            )}
                            {selectedRound.votes.some((v) => v.choice === 'abstain') && (
                              <span className="flex items-center gap-1 text-slate-600">
                                <span>⏸️</span>
                                <span className="font-medium">
                                  {selectedRound.votes.filter((v) => v.choice === 'abstain').length}
                                </span>{' '}
                                Enthaltungen
                              </span>
                            )}
                          </div>
                        )}

                        {!allVoted && (
                          <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                            <p className="text-xs text-blue-600">
                              ⏳ {total - voted} Stimme{total - voted !== 1 ? 'n' : ''} noch
                              ausstehend.
                            </p>
                            {String(userId) === String(project?.owner?.id) && (
                              <button
                                onClick={async () => {
                                  try {
                                    strapi.setJwt(jwt || null)
                                    await strapi.sendReminders(48)
                                    setError('')
                                  } catch (_) {
                                    setError('Erinnerung konnte nicht gesendet werden.')
                                  }
                                }}
                                className="text-xs text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full font-medium transition-colors"
                              >
                                🔔 Erinnerung senden
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })()}

                  <ConsentVotePanel
                    votes={selectedRound.votes}
                    userHasVoted={!!userHasVoted && !allowChangeVote}
                    currentUserId={Number(userId)}
                    participantCount={participantCount}
                    submitting={submitting}
                    onVote={async (choice, reason) => {
                      setSubmitting(true)
                      strapi.setJwt(jwt || null)
                      try {
                        await strapi.castVote(selectedRound!.id, choice, Number(userId))
                        if (
                          reason &&
                          (choice === 'minor_objection' || choice === 'major_objection')
                        ) {
                          await strapi.createObjection({
                            reason,
                            severity: choice === 'major_objection' ? 'major' : 'minor',
                            round: selectedRound!.id,
                            user: Number(userId),
                          })
                        }
                        setUserVote(choice)
                        setAllowChangeVote(false)
                        const { all: refreshedRounds, selected: refreshedRound } =
                          await reloadRounds(params.id, selectedRound!.id)
                        setRounds(refreshedRounds)
                        setSelectedRound(refreshedRound)
                      } catch (_) {
                        setError('Abstimmung fehlgeschlagen.')
                      } finally {
                        setSubmitting(false)
                      }
                    }}
                    onAbstain={() => {
                      setUserVote('abstain')
                      setShowAbstainModal(true)
                    }}
                    onChangeVote={() => setAllowChangeVote(true)}
                  />

                  {/* Abstain modal */}
                  {userVote === 'abstain' && showAbstainModal && (
                    <Suspense fallback={null}>
                      <AbstainReasonModal
                        roundId={selectedRound.id}
                        onSubmit={handleAbstainSubmit}
                        onCancel={() => {
                          setShowAbstainModal(false)
                          setUserVote(null)
                        }}
                      />
                    </Suspense>
                  )}

                  {/* Owner: Abstimmung vorzeitig schließen (falls Teilnehmer nicht erreicht) */}
                  {String(userId) === String(project?.owner?.id) &&
                    participantCount > 0 &&
                    selectedRound.votes.length > 0 &&
                    selectedRound.votes.length < participantCount &&
                    !selectedRound.objections.some(
                      (o) => o.severity === 'major' || o.severity === 'blocking'
                    ) && (
                      <details className="mt-4 rounded-xl border border-gray-200">
                        <summary className="px-4 py-3 cursor-pointer text-sm text-gray-500 hover:text-gray-700 list-none flex items-center gap-2">
                          <span>…</span>
                          <span>
                            {selectedRound.votes.length} von {participantCount} haben abgestimmt —
                            Abstimmung trotzdem schließen?
                          </span>
                        </summary>
                        <div className="px-4 pb-4 text-sm">
                          <p className="text-amber-700 bg-amber-50 rounded-lg p-3 mb-3">
                            ⚠️ Nicht alle Teilnehmer haben abgestimmt. Das Ergebnis basiert auf{' '}
                            {selectedRound.votes.length} von {participantCount} Stimmen.
                            Dokumentiere ggf. den Grund (Abwesenheit, Ausscheiden etc.).
                          </p>
                          {!forceCloseConfirm ? (
                            <button
                              onClick={() => setForceCloseConfirm(true)}
                              disabled={advancing}
                              className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 text-sm"
                            >
                              ⚠️ Vorzeitig abschließen
                            </button>
                          ) : (
                            <div className="flex items-center gap-3 p-3 bg-amber-100 border border-amber-300 rounded-xl">
                              <p className="text-sm text-amber-800 flex-1">
                                Wirklich abschließen mit {selectedRound!.votes.length}/
                                {participantCount} Stimmen? Diese Aktion ist endgültig.
                              </p>
                              <div className="flex gap-2 shrink-0">
                                <button
                                  onClick={async () => {
                                    setForceCloseConfirm(false)
                                    setAdvancing(true)
                                    strapi.setJwt(jwt || null)
                                    try {
                                      await strapi.transitionRoundPhase(
                                        selectedRound!.id,
                                        'completed'
                                      )
                                      const { all: completedRounds, selected: completedRound } =
                                        await reloadRounds(params.id, selectedRound!.id)
                                      setRounds(completedRounds)
                                      setSelectedRound(completedRound)
                                    } catch (_) {
                                      setError('Phase konnte nicht abgeschlossen werden.')
                                    } finally {
                                      setAdvancing(false)
                                    }
                                  }}
                                  disabled={advancing}
                                  className="px-3 py-1.5 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 text-sm"
                                >
                                  {advancing ? 'Schließe ab…' : 'Ja, abschließen'}
                                </button>
                                <button
                                  onClick={() => setForceCloseConfirm(false)}
                                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                                >
                                  Abbrechen
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </details>
                    )}

                  {/* Owner ohne Teilnehmerliste: Manuell abschließen */}
                  {participantCount === 0 &&
                    String(userId) === String(project?.owner?.id) &&
                    selectedRound.votes.length > 0 && (
                      <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-800 mb-3">
                          <strong>{selectedRound.votes.length} Stimme(n)</strong> eingegangen. Da
                          keine Teilnehmerliste gepflegt wird, kannst du die Runde manuell
                          abschließen.
                        </p>
                        {selectedRound.objections.some(
                          (o) => o.severity === 'major' || o.severity === 'blocking'
                        ) ? (
                          <Link
                            href={`/projects/${params.id}/dialog`}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm inline-block"
                          >
                            🔴 Dialog starten
                          </Link>
                        ) : (
                          <button
                            onClick={async () => {
                              setAdvancing(true)
                              strapi.setJwt(jwt || null)
                              try {
                                await strapi.transitionRoundPhase(selectedRound!.id, 'completed')
                                const { all: r, selected: s } = await reloadRounds(
                                  params.id,
                                  selectedRound!.id
                                )
                                setRounds(r)
                                setSelectedRound(s)
                              } catch (_) {
                                setError('Phase konnte nicht abgeschlossen werden.')
                              } finally {
                                setAdvancing(false)
                              }
                            }}
                            disabled={advancing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 text-sm"
                          >
                            {advancing ? 'Schließe ab…' : '✅ Runde abschließen'}
                          </button>
                        )}
                      </div>
                    )}

                  {/* Auto-Transition: Alle Stimmen drin - keine Major Objection */}
                  {participantCount > 0 && selectedRound.votes.length >= participantCount && (
                    <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">✅</span>
                        <div>
                          <p className="font-semibold text-emerald-800 text-sm">
                            Alle {participantCount} Teilnehmer haben abgestimmt.
                          </p>
                          {selectedRound.objections.some(
                            (o) => o.severity === 'major' || o.severity === 'blocking'
                          ) ? (
                            <p className="text-xs text-amber-700 mt-0.5">
                              ⚠️ Es liegen schwerwiegende Einwände vor — bitte den Dialog zur
                              Lösungsfindung starten.
                            </p>
                          ) : (
                            <p className="text-xs text-emerald-700 mt-0.5">
                              Keine schwerwiegenden Einwände — Konsent ist möglich.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        {selectedRound.objections.some(
                          (o) => o.severity === 'major' || o.severity === 'blocking'
                        ) ? (
                          <Link
                            href={`/projects/${params.id}/dialog`}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                          >
                            🔴 Dialog starten
                          </Link>
                        ) : (
                          <button
                            onClick={async () => {
                              setAdvancing(true)
                              strapi.setJwt(jwt || null)
                              try {
                                await strapi.transitionRoundPhase(selectedRound!.id, 'completed')
                                const { all: completedRounds, selected: completedRound } =
                                  await reloadRounds(params.id, selectedRound!.id)
                                setRounds(completedRounds)
                                setSelectedRound(completedRound)
                              } catch (_) {
                                setError('Phase konnte nicht abgeschlossen werden.')
                              } finally {
                                setAdvancing(false)
                              }
                            }}
                            disabled={advancing}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 text-sm"
                          >
                            {advancing ? 'Schließe ab…' : '✅ Runde abschließen'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Enthaltungs-Analyse (nur für Owner, bei >2 Enthaltungen) */}
                  <div className="mt-6 space-y-4">
                    <AnonymousConcernsView
                      roundId={selectedRound.id}
                      isOwner={String(userId) === String(project?.owner?.id)}
                    />
                    <AbstentionAnalysisView
                      roundId={selectedRound.id}
                      abstentionCount={
                        selectedRound.votes.filter((v) => v.choice === 'abstain').length
                      }
                      isOwner={String(userId) === String(project?.owner?.id)}
                    />
                  </div>
                </div>
              )}

              {/* Abstention Analysis — prominent in integration phase */}
              {selectedRound.status === 'integration' && (
                <div className="mb-4">
                  <AbstentionAnalysisView
                    roundId={selectedRound.id}
                    abstentionCount={
                      selectedRound.votes.filter((v) => v.choice === 'abstain').length
                    }
                    isOwner={String(userId) === String(project?.owner?.id)}
                  />
                </div>
              )}

              {/* Integration Phase — After dialog, start new round */}
              {selectedRound.status === 'integration' && (
                <div className="mb-6 p-5 rounded-xl bg-orange-50 border border-orange-200">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <h3 className="font-semibold text-orange-900">Integration läuft</h3>
                      <p className="text-sm text-orange-700">
                        Schwerwiegende Einwände müssen integriert werden, bevor eine neue Abstimmung
                        stattfinden kann.
                      </p>
                    </div>
                  </div>

                  {/* Link zum Dialog, falls noch offen */}
                  <Link
                    href={`/projects/${params.id}/dialog`}
                    className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm mb-4"
                  >
                    🔴 Dialog zur Lösungsfindung öffnen
                  </Link>

                  {/* Owner: Neue Abstimmungsrunde starten */}
                  {String(userId) === String(project?.owner?.id) && (
                    <div className="mt-4 pt-4 border-t border-orange-200">
                      <p className="text-sm text-orange-800 mb-3">
                        <strong>Dialog abgeschlossen?</strong> Trage den überarbeiteten Vorschlag
                        ein und starte eine neue Abstimmungsrunde.
                      </p>
                      {!showNewRoundForm ? (
                        <button
                          onClick={() => {
                            setNewRoundProposal(selectedRound.proposal)
                            setShowNewRoundForm(true)
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-sm"
                        >
                          🔄 Überarbeiteten Vorschlag einreichen
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <label className="block">
                            <span className="text-xs font-semibold text-orange-800 uppercase tracking-wide">
                              📝 Überarbeiteter Vorschlag (Runde {rounds.length + 1})
                            </span>
                            <textarea
                              value={newRoundProposal}
                              onChange={(e) => setNewRoundProposal(e.target.value)}
                              rows={5}
                              className="mt-2 w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm"
                              placeholder="Trage hier den überarbeiteten Vorschlag ein, der den Einwand integriert…"
                            />
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                if (!newRoundProposal.trim()) return
                                setAdvancing(true)
                                strapi.setJwt(jwt || null)
                                try {
                                  await strapi.createRound({
                                    roundNumber: rounds.length + 1,
                                    proposal: newRoundProposal.trim(),
                                    status: 'voting',
                                    project: project!.id,
                                  })
                                  setShowNewRoundForm(false)
                                  setNewRoundProposal('')
                                  const { all: refreshed, selected: refreshedRound } =
                                    await reloadRounds(params.id, undefined)
                                  setRounds(refreshed)
                                  setSelectedRound(refreshedRound)
                                } catch (_) {
                                  setError('Neue Runde konnte nicht gestartet werden.')
                                } finally {
                                  setAdvancing(false)
                                }
                              }}
                              disabled={advancing || !newRoundProposal.trim()}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 text-sm"
                            >
                              {advancing ? 'Starte Runde…' : '✅ Abstimmungsrunde starten'}
                            </button>
                            <button
                              onClick={() => setShowNewRoundForm(false)}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                            >
                              Abbrechen
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Completed — Result */}
              {selectedRound.status === 'completed' && (
                <div className="space-y-4">
                  {/* Consensus Summary Card */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-3xl">✅</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-emerald-800">Beschluss gefasst</h3>
                        <p className="text-sm text-emerald-700 mt-0.5">
                          Konsent erreicht in Runde {selectedRound.roundNumber} — kein schwerwiegender Einwand.
                        </p>
                      </div>
                      {consentScore !== null && (
                        <div className="text-center shrink-0">
                          <div className={`text-2xl font-black ${
                            consentScore >= 80 ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {consentScore}%
                          </div>
                          <div className="text-xs text-emerald-500">Konsent</div>
                        </div>
                      )}
                    </div>

                    {/* Vote Summary */}
                    {voteBreakdown && (
                      <div className="bg-white/70 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-emerald-800 mb-2">Abstimmungsergebnis</p>
                        <div className="flex flex-wrap gap-2">
                          {voteBreakdown.consent > 0 && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                              ✅ {voteBreakdown.consent} Konsent
                            </span>
                          )}
                          {voteBreakdown.minor_objection > 0 && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                              💛 {voteBreakdown.minor_objection} Anmerkung
                            </span>
                          )}
                          {voteBreakdown.abstain > 0 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                              ⏸️ {voteBreakdown.abstain} Enthaltung
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Evaluation Date Reminder */}
                    {project.evaluationDate && (
                      <div className="flex items-center gap-2 text-sm text-emerald-700">
                        <span>📅</span>
                        <span>
                          Überprüfung am{' '}
                          <strong>
                            {new Date(project.evaluationDate).toLocaleDateString('de-DE', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </strong>
                        </span>
                        {new Date(project.evaluationDate) < new Date() && (
                          <span className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full text-xs font-bold">
                            Überfällig
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {!outcomeSubmitted && (
                    <OutcomeForm
                      onSubmit={handleOutcomeSubmit}
                      minorObjections={selectedRound.objections
                        .filter((o) => o.severity === 'minor')
                        .map((o) => ({ user: o.user?.username || 'Anonym', reason: o.reason }))}
                    />
                  )}

                  {outcomeData && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="text-sm font-semibold text-green-800 mb-2">📋 Ergebnis</h4>
                      <p className="text-sm text-green-700 mb-2">{outcomeData.outcome}</p>
                      {outcomeData.nextSteps && (
                        <p className="text-sm text-green-700 mb-1">
                          <strong>Nächste Schritte:</strong> {outcomeData.nextSteps}
                        </p>
                      )}
                      {outcomeData.evaluationDate && (
                        <p className="text-sm text-green-700">
                          <strong>Evaluationsdatum:</strong>{' '}
                          {new Date(outcomeData.evaluationDate).toLocaleDateString('de-DE')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Owner: Neuen Consent-Loop starten (Revisit / Evaluation) */}
                  {String(userId) === String(project?.owner?.id) && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">
                        🔁 Neuer Consent-Loop
                      </p>
                      {!showNewRoundForm ? (
                        <button
                          onClick={() => {
                            setNewRoundProposal(selectedRound.proposal)
                            setShowNewRoundForm(true)
                          }}
                          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                        >
                          Vorhaben evaluieren oder überarbeiten →
                        </button>
                      ) : (
                        <div className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <p className="text-xs text-gray-500">
                            Überarbeite den Vorschlag (z.B. nach Evaluation) und starte eine neue
                            Abstimmungsrunde.
                          </p>
                          <label className="block">
                            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                              📝 Überarbeiteter Vorschlag (Runde {rounds.length + 1})
                            </span>
                            <textarea
                              value={newRoundProposal}
                              onChange={(e) => setNewRoundProposal(e.target.value)}
                              rows={4}
                              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm"
                              placeholder="Überarbeiteter Vorschlag nach Evaluation…"
                            />
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                if (!newRoundProposal.trim()) return
                                setAdvancing(true)
                                strapi.setJwt(jwt || null)
                                try {
                                  await strapi.createRound({
                                    roundNumber: rounds.length + 1,
                                    proposal: newRoundProposal.trim(),
                                    status: 'voting',
                                    project: project!.id,
                                  })
                                  setShowNewRoundForm(false)
                                  setNewRoundProposal('')
                                  const { all: refreshed, selected: refreshedRound } =
                                    await reloadRounds(params.id, undefined)
                                  setRounds(refreshed)
                                  setSelectedRound(refreshedRound)
                                } catch (_) {
                                  setError('Neue Runde konnte nicht gestartet werden.')
                                } finally {
                                  setAdvancing(false)
                                }
                              }}
                              disabled={advancing || !newRoundProposal.trim()}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 text-sm"
                            >
                              {advancing ? 'Starte Runde…' : '🔄 Neue Runde starten'}
                            </button>
                            <button
                              onClick={() => {
                                setShowNewRoundForm(false)
                                setNewRoundProposal('')
                              }}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                            >
                              Abbrechen
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Objections (always visible if present) */}
              {selectedRound.objections.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Einwände</h3>
                    {/* Dialog-Link bei schwerwiegenden Einwänden */}
                    {selectedRound.objections.some(
                      (o) => o.severity === 'major' || o.severity === 'blocking'
                    ) &&
                      selectedRound.status !== 'completed' && (
                        <Link
                          href={`/projects/${params.id}/dialog`}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                        >
                          🔴 Dialog zur Lösungsfindung starten
                        </Link>
                      )}
                  </div>
                  <div className="space-y-3">
                    {selectedRound.objections.map((obj) => (
                      <div
                        key={obj.id}
                        className={`p-4 rounded-lg border ${
                          obj.severity === 'blocking'
                            ? 'bg-red-50 border-red-200'
                            : obj.severity === 'major'
                              ? 'bg-orange-50 border-orange-200'
                              : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{obj.user?.username || 'Anonym'}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              obj.severity === 'blocking'
                                ? 'bg-red-200 text-red-800'
                                : obj.severity === 'major'
                                  ? 'bg-orange-200 text-orange-800'
                                  : 'bg-yellow-200 text-yellow-800'
                            }`}
                          >
                            {obj.severity === 'blocking'
                              ? 'Blockierend'
                              : obj.severity === 'major'
                                ? 'Erheblich'
                                : 'Geringfügig'}
                          </span>
                        </div>
                        <p className="text-gray-700">{obj.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audit Trail — Activity Timeline */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-base">📜</span>
                  <h3 className="text-base font-semibold text-gray-700">Aktivitäten-Timeline</h3>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {selectedRound.comments.length +
                      selectedRound.votes.length +
                      selectedRound.objections.length}{' '}
                    Einträge
                  </span>
                </div>
                <div className="bg-gray-50/80 rounded-xl p-4">
                  <AuditTrail
                    projectId={project.id}
                    fallbackEntries={[
                      {
                        action: 'create_project',
                        label: 'Vorhaben eingereicht',
                        timestamp: new Date().toLocaleDateString('de-DE'),
                      },
                      ...(selectedRound.comments.some((c) => c.type === 'question') ||
                      selectedRound.comments.some((c) => c.type === 'reaction')
                        ? [
                            {
                              action: 'submit_reaction',
                              label: 'Reaktionen geteilt',
                              timestamp: new Date().toLocaleDateString('de-DE'),
                            },
                          ]
                        : []),
                      ...(selectedRound.votes.length > 0
                        ? [
                            {
                              action: 'submit_vote',
                              label: 'Abstimmung gestartet',
                              timestamp: new Date().toLocaleDateString('de-DE'),
                            },
                          ]
                        : []),
                      ...(selectedRound.status === 'completed'
                        ? [
                            {
                              action: 'complete_round',
                              label: 'Beschluss gefasst',
                              timestamp: new Date().toLocaleDateString('de-DE'),
                            },
                          ]
                        : []),
                    ]}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
