'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { strapi } from '../../../lib/strapi'
import OutcomeForm from '../../../components/Outcome/OutcomeForm'
import AuditTrail from '../../../components/AuditTrail/AuditTrail'

const AbstainReasonModal = dynamic(
  () => import('../../../components/AbstainReason/AbstainReasonModal'),
  { ssr: false }
)

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
  votes: { id: number; choice: ConsentChoice; reason?: string; user?: { id: number; username?: string } }[]
  objections: { id: number; reason: string; severity: string; user?: { id: number; username?: string }; status: string }[]
  comments: { id: number; content: string; type: string; user?: { id: number; username?: string }; createdAt: string }[]
}

// Consent Flow Phases (matching CONCEPT.md)
const flowPhases = [
  { key: 'information', label: 'Informationsrunde', icon: '❓', hint: 'Nur Verständnisfragen — keine Meinungen' },
  { key: 'reaction', label: 'Reaktionsrunde', icon: '💬', hint: 'Nur Perspektiven — kein Gegenargumentieren' },
  { key: 'adjustment', label: 'Anpassung', icon: '🔄', hint: 'Einreicher überarbeitet den Vorschlag' },
  { key: 'voting', label: 'Abstimmung', icon: '🗳️', hint: 'Konsent-Abstimmung' },
  { key: 'integration', label: 'Integration', icon: '🤝', hint: 'Einwände werden integriert' },
  { key: 'completed', label: 'Ergebnis', icon: '✅', hint: 'Beschluss gefasst' },
]

const phaseOrder = flowPhases.map((p) => p.key)

const choiceLabels: Record<ConsentChoice, { emoji: string; label: string; color: string }> = {
  consent: { emoji: '✅', label: 'Konsent', color: 'bg-green-50 text-green-700 hover:bg-green-100 ring-green-200' },
  minor_objection: { emoji: '💛', label: 'Leichter Einwand', color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 ring-yellow-200' },
  major_objection: { emoji: '🔴', label: 'Schwerwiegender Einwand', color: 'bg-red-50 text-red-700 hover:bg-red-100 ring-red-200' },
  abstain: { emoji: '⏸️', label: 'Enthalten', color: 'bg-gray-50 text-gray-700 hover:bg-gray-200 ring-gray-300' },
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
  const [voteReason, setVoteReason] = useState('')
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [showReactionForm, setShowReactionForm] = useState(false)
  const [showObjectionForm, setShowObjectionForm] = useState(false)
  const [question, setQuestion] = useState('')
  const [reaction, setReaction] = useState('')
  const [objection, setObjection] = useState<{ reason: string; severity: 'minor' | 'major' | 'blocking' }>({ reason: '', severity: 'minor' })
  const [showAbstainModal, setShowAbstainModal] = useState(false)
  const [outcomeSubmitted, setOutcomeSubmitted] = useState(false)
  const [outcomeData, setOutcomeData] = useState<{ outcome: string; nextSteps: string; evaluationDate: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const jwt = (session as unknown as { jwt?: string })?.jwt

  // Load project data from Strapi
  useEffect(() => {
    async function loadProject() {
      if (!params.id) return
      strapi.setJwt(jwt || null)
      try {
        const res = await strapi.getProject(params.id, 'owner,participants,circle,circle.members,currentRound')
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
        const roundsRes = await strapi.getRounds(params.id)
        const roundsData = (roundsRes.data as any[]) || []
        const formatted = roundsData.map((r: any) => ({
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
        }))
        setRounds(formatted)
        if (formatted.length > 0) {
          setSelectedRound(formatted[formatted.length - 1])
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

  const handleVote = async (choice: ConsentChoice) => {
    if (choice === 'abstain') {
      setShowAbstainModal(true)
      setUserVote(choice)
      return
    }

    // For major_objection: reason is required
    if (choice === 'major_objection' && !voteReason.trim()) {
      setUserVote(choice)
      return // Show reason field first
    }

    setSubmitting(true)
    strapi.setJwt(jwt || null)
    try {
      await strapi.castVote(selectedRound!.id, choice, Number(userId))
      setUserVote(choice)
      // Reload rounds to get updated votes
      const roundsRes = await strapi.getRounds(params.id)
      const roundsData = (roundsRes.data as any[]) || []
      setRounds(roundsData.map((r: any) => ({
        id: r.id,
        roundNumber: r.roundNumber,
        proposal: r.proposal,
        status: r.status,
        startDate: r.startDate,
        endDate: r.endDate,
        votes: (r.votes || []).map((v: any) => ({ id: v.id, choice: v.choice, reason: v.reason, user: v.user })),
        objections: (r.objections || []).map((o: any) => ({ id: o.id, reason: o.reason, severity: o.severity, user: o.user, status: o.status || 'open' })),
        comments: (r.comments || []).map((c: any) => ({ id: c.id, content: c.content, type: c.type || 'question', user: c.user, createdAt: c.createdAt })),
      })))
    } catch (err) {
      setError('Abstimmung fehlgeschlagen.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAbstainSubmit = (data: {
    reason: string
    detail?: string
    isObjection?: boolean
    objectionSeverity?: 'minor' | 'major'
  }) => {
    setShowAbstainModal(false)
    if (data.isObjection) {
      setUserVote(data.objectionSeverity === 'major' ? 'major_objection' : 'minor_objection')
    }
  }

  const handleOutcomeSubmit = (data: { outcome: string; nextSteps: string; evaluationDate: string; status: string }) => {
    setOutcomeData(data)
    setOutcomeSubmitted(true)
  }

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.includes('?')) return
    setSubmitting(true)
    strapi.setJwt(jwt || null)
    try {
      await strapi.createComment({ content: question, round: selectedRound!.id, user: Number(userId) })
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
      await strapi.createComment({ content: reaction, round: selectedRound!.id, user: Number(userId) })
      setReaction('')
      setShowReactionForm(false)
    } catch (_) {
      setError('Reaktion konnte nicht gesendet werden.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitObjection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!objection.reason.trim()) return
    setSubmitting(true)
    strapi.setJwt(jwt || null)
    try {
      await strapi.createObjection({
        reason: objection.reason,
        severity: objection.severity,
        round: selectedRound!.id,
        user: Number(userId),
      })
      setObjection({ reason: '', severity: 'minor' })
      setShowObjectionForm(false)
    } catch (_) {
      setError('Einwand konnte nicht eingereicht werden.')
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
          <Link href="/projects" className="text-blue-600 hover:text-blue-700">← Zurück zu Projekten</Link>
        </div>
      </div>
    )
  }

  const participantCount = project.participants?.length || project.circle?.members?.length || 0
  const votesCount = selectedRound?.votes.length || 0
  const nonVotersCount = Math.max(0, participantCount - votesCount)

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
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">← Projekte</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}

          {/* Project Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
                <p className="text-gray-600">{project.description}</p>
                {project.goal && <p className="text-sm text-gray-500 mt-1"><strong>Ziel:</strong> {project.goal}</p>}
                {project.tension && <p className="text-sm text-gray-500 mt-1"><strong>Spannung:</strong> {project.tension}</p>}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'active' ? 'bg-green-100 text-green-700' :
                project.status === 'beschlossen' ? 'bg-blue-100 text-blue-700' :
                project.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {project.status === 'active' ? 'Aktiv' : project.status === 'beschlossen' ? 'Beschlossen' : project.status === 'completed' ? 'Abgeschlossen' : 'Entwurf'}
              </span>
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
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {flowPhases.map((phase, index) => {
                const isCompleted = index < currentPhaseIndex
                const isActive = index === currentPhaseIndex
                return (
                  <div key={phase.key} className="flex items-center min-w-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 shrink-0 transition-colors ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isActive ? 'bg-blue-600 text-white ring-4 ring-blue-200' :
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {phase.icon}
                      </div>
                      <div className={`text-xs font-medium text-center max-w-[80px] ${isActive ? 'text-blue-600' : ''}`}>
                        {phase.label}
                      </div>
                    </div>
                    {index < flowPhases.length - 1 && (
                      <div className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 shrink-0 transition-colors ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                    )}
                  </div>
                )
              })}
            </div>
            {currentPhase && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                💡 <strong>{currentPhase.label}:</strong> {currentPhase.hint}
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
                      selectedRound?.id === round.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedRound.status === 'voting' ? 'bg-blue-600 text-white' :
                  selectedRound.status === 'completed' ? 'bg-green-500 text-white' :
                  selectedRound.status === 'information' ? 'bg-indigo-100 text-indigo-700' :
                  selectedRound.status === 'reaction' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {flowPhases[phaseOrder.indexOf(selectedRound.status)]?.label || selectedRound.status}
                </span>
              </div>

              {/* Proposal */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Vorschlag</h3>
                <p className="text-gray-900">{selectedRound.proposal}</p>
              </div>

              {/* Information Phase — Questions */}
              {selectedRound.status === 'information' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Informationsrunde</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Stelle Verständnisfragen zum Vorschlag. Keine Meinungen oder Diskussion — nur Klärung.
                  </p>
                  {selectedRound.comments
                    .filter((c) => c.type === 'question' || c.type === 'answer')
                    .map((cmt) => (
                      <div key={cmt.id} className={`p-4 rounded-lg mb-2 ${
                        cmt.type === 'question' ? 'bg-indigo-50 border-l-4 border-indigo-300' : 'bg-blue-50 border-l-4 border-blue-300'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">
                            {cmt.type === 'question' ? '❓' : '💡'} {cmt.user?.username || 'Anonym'}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(cmt.createdAt).toLocaleDateString('de-DE')}</span>
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
                    <form onSubmit={handleSubmitQuestion} className="mt-4 p-4 bg-indigo-5 rounded-lg border border-indigo-200">
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-2"
                        rows={2}
                        placeholder="Deine Frage zum Vorschlag... (muss ein ? enthalten)"
                        required
                      />
                      {question && !question.includes('?') && (
                        <p className="text-xs text-red-500 mb-2">Fragen müssen ein Fragezeichen (?) enthalten.</p>
                      )}
                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium" disabled={!question.includes('?') || submitting}>
                          {submitting ? 'Sende…' : 'Frage einreichen'}
                        </button>
                        <button type="button" onClick={() => setShowQuestionForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Abbrechen</button>
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
                      <div key={cmt.id} className="p-4 rounded-lg mb-2 bg-purple-50 border-l-4 border-purple-300">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">💬 {cmt.user?.username || 'Anonym'}</span>
                          <span className="text-xs text-gray-500">{new Date(cmt.createdAt).toLocaleDateString('de-DE')}</span>
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
                    <form onSubmit={handleSubmitReaction} className="mt-4 p-4 bg-purple-5 rounded-lg border border-purple-200">
                      <textarea
                        value={reaction}
                        onChange={(e) => setReaction(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-2"
                        rows={2}
                        placeholder="Deine Perspektive zum Vorschlag..."
                        required
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium" disabled={submitting}>
                          {submitting ? 'Sende…' : 'Einreichen'}
                        </button>
                        <button type="button" onClick={() => setShowReactionForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Abbrechen</button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Voting Phase — Consent Vote (4 options) */}
              {selectedRound.status === 'voting' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Konsent-Abstimmung</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Konsent bedeutet: Niemand hat einen schwerwiegenden, begründeten Einwand.
                  </p>

                  {/* Reminder for non-voters */}
                  {nonVotersCount > 0 && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                      ⏰ {nonVotersCount} {nonVotersCount === 1 ? 'Person hat' : 'Personen haben'} noch nicht abgestimmt.
                    </div>
                  )}

                  {/* Vote Buttons — 4 consent options */}
                  {!userHasVoted && !userVote && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {(Object.entries(choiceLabels) as [ConsentChoice, typeof choiceLabels.consent][]).map(([key, { emoji, label, color }]) => (
                        <button
                          key={key}
                          onClick={() => setUserVote(key)}
                          className={`py-4 px-4 rounded-xl font-medium transition-all ${color}`}
                        >
                          <div className="text-2xl mb-1">{emoji}</div>
                          <div className="text-sm">{label}</div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Reason field after choice */}
                  {userVote && userVote !== 'abstain' && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">
                        Du wählst: {choiceLabels[userVote].emoji} {choiceLabels[userVote].label}
                      </p>
                      <textarea
                        value={voteReason}
                        onChange={(e) => setVoteReason(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-3"
                        rows={2}
                        placeholder={
                          userVote === 'major_objection'
                            ? 'Begründung (Pflicht bei schwerwiegendem Einwand)...'
                            : 'Optionale Begründung...'
                        }
                        required={userVote === 'major_objection'}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleVote(userVote)}
                          disabled={submitting || (userVote === 'major_objection' && !voteReason.trim())}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                          {submitting ? 'Sende…' : 'Abstimmung bestätigen'}
                        </button>
                        <button
                          onClick={() => { setUserVote(null); setVoteReason('') }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                        >
                          Zurück
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Abstain → modal */}
                  {userVote === 'abstain' && showAbstainModal && (
                    <Suspense fallback={null}>
                      <AbstainReasonModal
                        roundId={selectedRound.id}
                        onSubmit={handleAbstainSubmit}
                        onCancel={() => { setShowAbstainModal(false); setUserVote(null) }}
                      />
                    </Suspense>
                  )}

                  {/* Already voted — show current vote + change option */}
                  {userHasVoted && !userVote && (
                    <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                      ✅ Du hast bereits abgestimmt.{' '}
                      <button
                        onClick={() => setUserVote(null)}
                        className="underline hover:text-blue-900"
                      >
                        Stimme ändern
                      </button>
                    </div>
                  )}

                  {/* Vote Results */}
                  {selectedRound.votes.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Bisherige Stimmen ({votesCount}/{participantCount})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['consent', 'minor_objection', 'major_objection', 'abstain'] as ConsentChoice[]).map((key) => {
                          const count = selectedRound.votes.filter((v) => v.choice === key).length
                          return (
                            <div key={key} className="p-3 rounded-lg bg-gray-50 text-center">
                              <div className="text-lg">{choiceLabels[key].emoji}</div>
                              <div className="text-xl font-bold">{count}</div>
                              <div className="text-xs text-gray-500">{choiceLabels[key].label}</div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Individual votes with reasons */}
                      <div className="mt-3 space-y-2">
                        {selectedRound.votes.map((v) => (
                          <div key={v.id} className="flex items-center gap-2 text-sm">
                            <span>{choiceLabels[v.choice]?.emoji}</span>
                            <span className="font-medium">{v.user?.username || 'Anonym'}</span>
                            {v.reason && <span className="text-gray-500">— {v.reason}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Objection Form */}
                  {(userVote === 'minor_objection' || userVote === 'major_objection') && !userHasVoted && (
                    <div className="mt-4">
                      <button
                        onClick={() => setShowObjectionForm(!showObjectionForm)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700"
                      >
                        ✋ Einwand begründen
                      </button>
                    </div>
                  )}

                  {showObjectionForm && (
                    <form onSubmit={handleSubmitObjection} className="mt-4 p-4 bg-yellow-5 rounded-lg border border-yellow-200">
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Begründung</label>
                        <textarea
                          value={objection.reason}
                          onChange={(e) => setObjection({ ...objection, reason: e.target.value })}
                          className="w-full p-3 border rounded-lg"
                          rows={3}
                          placeholder="Warum erhebst du diesen Einwand?"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Schweregrad</label>
                        <select
                          value={objection.severity}
                          onChange={(e) => setObjection({ ...objection, severity: e.target.value as 'minor' | 'major' | 'blocking' })}
                          className="w-full p-3 border rounded-lg"
                        >
                          <option value="minor">Geringfügig</option>
                          <option value="major">Erheblich</option>
                          <option value="blocking">Blockierend</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium" disabled={submitting}>
                          {submitting ? 'Sende…' : 'Einreichen'}
                        </button>
                        <button type="button" onClick={() => setShowObjectionForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Abbrechen</button>
                      </div>
                    </form>
                  )}
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
                    <p className="text-sm text-green-700">Konsent erreicht — kein schwerwiegender Einwand.</p>
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
                        <p className="text-sm text-green-700 mb-1"><strong>Nächste Schritte:</strong> {outcomeData.nextSteps}</p>
                      )}
                      {outcomeData.evaluationDate && (
                        <p className="text-sm text-green-700"><strong>Evaluationsdatum:</strong> {new Date(outcomeData.evaluationDate).toLocaleDateString('de-DE')}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Objections (always visible if present) */}
              {selectedRound.objections.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Einwände</h3>
                  <div className="space-y-3">
                    {selectedRound.objections.map((obj) => (
                      <div key={obj.id} className={`p-4 rounded-lg border ${
                        obj.severity === 'blocking' ? 'bg-red-50 border-red-200' :
                        obj.severity === 'major' ? 'bg-orange-50 border-orange-200' :
                        'bg-yellow-50 border-yellow-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{obj.user?.username || 'Anonym'}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            obj.severity === 'blocking' ? 'bg-red-200 text-red-800' :
                            obj.severity === 'major' ? 'bg-orange-200 text-orange-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>
                            {obj.severity === 'blocking' ? 'Blockierend' : obj.severity === 'major' ? 'Erheblich' : 'Geringfügig'}
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
                    { action: 'create', label: 'Vorhaben eingereicht', timestamp: new Date().toLocaleDateString('de-DE') },
                    ...(selectedRound.status === 'completed'
                      ? [{ action: 'complete', label: 'Beschluss gefasst', timestamp: new Date().toLocaleDateString('de-DE') }]
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
