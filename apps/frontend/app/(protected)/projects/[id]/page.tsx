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

  const jwt = (session as unknown as { jwt?: string })?.jwt

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
  const currentPhase = currentPhaseIndex >= 0 ? flowPhases[currentPhaseIndex] : null

  // Check if current user has already voted
  const userId = session?.user?.id
  const userHasVoted = selectedRound?.votes.some((v) => String(v.user?.id) === userId)

  const handleAbstainSubmit = async (data: {
    reason: string
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
      })
      setQuestion('')
      setShowQuestionForm(false)
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
      })
      setReaction('')
      setShowReactionForm(false)
    } catch (_) {
      setError('Reaktion konnte nicht gesendet werden.')
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
              <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Erstellt von: {project.owner?.username || 'Unbekannt'}</span>
              <span>{participantCount} Teilnehmer</span>
              <span>{rounds.length} Runden</span>
              {project.circle && <span>Kreis: {project.circle.name}</span>}
            </div>
          </div>

          {/* Consent Flow Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Consent-Prozess</h2>
            {/* Only show 'integration' phase node if there actually are objections or we're in/past integration */}
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {flowPhases
                .filter((p) => {
                  if (p.key === 'integration') {
                    const hasObjections = (selectedRound?.objections?.length ?? 0) > 0
                    const inOrPastIntegration =
                      currentPhaseIndex >= phaseOrder.indexOf('integration')
                    return hasObjections || inOrPastIntegration
                  }
                  return true
                })
                .map((phase, index, visiblePhases) => {
                  const originalIndex = flowPhases.indexOf(phase)
                  const isCompleted = originalIndex < currentPhaseIndex
                  const isActive = originalIndex === currentPhaseIndex
                  return (
                    <div key={phase.key} className="flex items-center min-w-0">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1.5 shrink-0 transition-all duration-300 ${
                            isCompleted
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : isActive
                                ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-110'
                                : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {isCompleted ? '✓' : phase.icon}
                        </div>
                        <div
                          className={`text-xs font-medium text-center max-w-[72px] leading-tight ${
                            isActive
                              ? 'text-blue-600'
                              : isCompleted
                                ? 'text-emerald-600'
                                : 'text-gray-400'
                          }`}
                        >
                          {phase.label}
                        </div>
                      </div>
                      {index < visiblePhases.length - 1 && (
                        <div
                          className={`w-5 sm:w-10 h-0.5 mx-1 sm:mx-2 shrink-0 transition-colors duration-300 ${
                            isCompleted ? 'bg-emerald-400' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
            </div>
            {currentPhase && (
              <div
                className="mt-4 p-3 rounded-xl text-sm"
                style={{ background: 'var(--sage-pale)', color: 'var(--forest-mid)' }}
              >
                <span className="font-semibold">
                  {currentPhase.icon} {currentPhase.label}:
                </span>{' '}
                {currentPhase.hint}
              </div>
            )}

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
                  {selectedRound.comments
                    .filter((c) => c.type === 'question' || c.type === 'answer')
                    .map((cmt) => (
                      <div
                        key={cmt.id}
                        className={`p-4 rounded-lg mb-2 ${
                          cmt.type === 'question'
                            ? 'bg-indigo-50 border-l-4 border-indigo-300'
                            : 'bg-blue-50 border-l-4 border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">
                            {cmt.type === 'question' ? '❓' : '💡'} {cmt.user?.username || 'Anonym'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(cmt.createdAt).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{cmt.content}</p>
                      </div>
                    ))}
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
                        </label>
                        <textarea
                          defaultValue={selectedRound.proposal}
                          id="adjusted-proposal"
                          rows={4}
                          className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm"
                          placeholder="Überarbeite den Vorschlag basierend auf den Reaktionen…"
                        />
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
                          const input = document.getElementById(
                            'adjusted-proposal'
                          ) as HTMLTextAreaElement
                          if (!input?.value.trim()) return
                          setAdvancing(true)
                          strapi.setJwt(jwt || null)
                          try {
                            // Save adapted proposal to round via API
                            const apiUrl =
                              process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
                            const putRes = await fetch(
                              `${apiUrl}/api/rounds/${selectedRound!.id}`,
                              {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
                                },
                                body: JSON.stringify({ data: { proposal: input.value.trim() } }),
                              }
                            )
                            if (!putRes.ok) throw new Error('Save failed')
                            // Then advance phase to voting
                            await strapi.transitionRoundPhase(selectedRound!.id)
                            // Reload rounds
                            const { all: updatedRounds, selected: updatedRound } =
                              await reloadRounds(params.id, selectedRound!.id)
                            setRounds(updatedRounds)
                            setSelectedRound(updatedRound)
                          } catch (_) {
                            setError('Vorschlag konnte nicht gespeichert werden.')
                          } finally {
                            setAdvancing(false)
                          }
                        }}
                        disabled={advancing}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 text-sm"
                      >
                        {advancing ? 'Speichere…' : '💾 Vorschlag speichern & zur Abstimmung'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Voting Phase — Consent Vote (via ConsentVotePanel) */}
              {selectedRound.status === 'voting' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Konsent-Abstimmung</h3>

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
                          <button
                            onClick={async () => {
                              if (
                                !confirm(
                                  `Abstimmung mit ${selectedRound!.votes.length}/${participantCount} Stimmen abschließen? Diese Aktion kann nicht rükgängig gemacht werden.`
                                )
                              )
                                return
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
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 text-sm"
                          >
                            {advancing ? 'Schließe ab…' : '⚠️ Vorzeitig abschließen'}
                          </button>
                        </div>
                      </details>
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

              {/* Completed — Result */}
              {selectedRound.status === 'completed' && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">✅</span>
                      <h3 className="text-lg font-semibold text-green-800">Beschluss gefasst</h3>
                    </div>
                    <p className="text-sm text-green-700">
                      Konsent erreicht — kein schwerwiegender Einwand.
                    </p>
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

              {/* Audit Trail */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Audit-Trail</h3>
                <AuditTrail
                  projectId={project.id}
                  fallbackEntries={[
                    {
                      action: 'create',
                      label: 'Vorhaben eingereicht',
                      timestamp: new Date().toLocaleDateString('de-DE'),
                    },
                    ...(selectedRound.status === 'completed'
                      ? [
                          {
                            action: 'complete',
                            label: 'Beschluss gefasst',
                            timestamp: new Date().toLocaleDateString('de-DE'),
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
