'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { strapi } from '../../../../lib/strapi'

const DialogWizard = dynamic(
  () => import('../../../../components/Dialog/DialogWizard'),
  { ssr: false }
)

interface Objection {
  id: number
  reason: string
  severity: string
  status: string
  user?: { id: number; username?: string }
}

interface Member {
  id: number
  username?: string
  email?: string
}

interface ProjectData {
  id: number
  name: string
  circle?: { id: number; name: string; members?: Member[] }
  owner?: { id: number; username?: string }
}

interface RoundData {
  id: number
  proposal: string
  objections: Objection[]
}

export default function DialogPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { data: session, status: authStatus } = useSession()
  const jwt = (session as unknown as { jwt?: string })?.jwt
  const currentUser = session?.user as unknown as { id?: number; name?: string }

  const [project, setProject] = useState<ProjectData | null>(null)
  const [round, setRound] = useState<RoundData | null>(null)
  const [majorObjection, setMajorObjection] = useState<Objection | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [completed, setCompleted] = useState(false)
  const [escalated, setEscalated] = useState(false)

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login')
      return
    }
    if (authStatus === 'authenticated' && jwt) {
      loadData()
    }
  }, [authStatus, jwt, params.id])

  const loadData = async () => {
    setLoading(true)
    setError('')
    strapi.setJwt(jwt || null)

    try {
      const projectRes = await strapi.getProject(params.id, '*')
      const proj = (projectRes as { data: ProjectData }).data
      setProject(proj)

      const roundsRes = await strapi.getRounds(params.id)
      const rounds = (roundsRes as { data: RoundData[] }).data
      const activeRound = rounds.find((r) => (r as unknown as { status: string }).status === 'integration') || rounds[rounds.length - 1]

      if (activeRound) {
        setRound(activeRound)
        const objection = activeRound.objections?.find((o) => o.severity === 'major' && o.status === 'open') || null
        setMajorObjection(objection)
      }

      if (proj.circle?.id) {
        const membersRes = await strapi.getCircleMembers(proj.circle.id)
        const membersData = (membersRes as { data: Member[] }).data
        setMembers(Array.isArray(membersData) ? membersData : [])
      }
    } catch {
      setError('Projekt konnte nicht geladen werden.')
    } finally {
      setLoading(false)
    }
  }

  if (authStatus === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <span className="animate-spin mr-2">⏳</span> Wird geladen…
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <button onClick={loadData} className="text-blue-600 underline text-sm">Erneut versuchen</button>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">Dialog abgeschlossen</h1>
          <p className="text-gray-600 mb-6">
            Der Einwand wurde erfolgreich integriert. Der Vorschlag kann zur Abstimmung weitergegeben werden.
          </p>
          <Link
            href={`/projects/${params.id}`}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Zurück zum Projekt
          </Link>
        </div>
      </div>
    )
  }

  if (escalated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🚨</div>
          <h1 className="text-2xl font-bold mb-2">Dialog eskaliert</h1>
          <p className="text-gray-600 mb-6">
            Kein Konsent im Dialog. Die gewählte Eskalationsoption wurde festgehalten.
          </p>
          <Link
            href={`/projects/${params.id}`}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            Zurück zum Projekt
          </Link>
        </div>
      </div>
    )
  }

  if (!majorObjection) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🤝</div>
          <h1 className="text-xl font-bold mb-2">Kein aktiver schwerwiegender Einwand</h1>
          <p className="text-gray-600 mb-6 text-sm">
            Der Dialog-Prozess wird gestartet wenn ein schwerwiegender Einwand offen ist.
          </p>
          <Link
            href={`/projects/${params.id}`}
            className="text-blue-600 underline text-sm"
          >
            ← Zurück zum Projekt
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link href={`/projects/${params.id}`} className="text-gray-400 hover:text-gray-600 text-sm">
              ← {project?.name}
            </Link>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Dialog zur Lösungsfindung</h1>
          <p className="text-sm text-gray-500">Einwand von {majorObjection.user?.username || 'Unbekannt'}</p>
        </div>
      </div>

      {/* Wizard */}
      <div className="px-4 py-8">
        <DialogWizard
          objectionId={majorObjection.id}
          objectionReason={majorObjection.reason}
          objectorName={majorObjection.user?.username || 'Unbekannt'}
          projectId={project?.id || 0}
          originalProposal={round?.proposal || ''}
          members={members}
          currentUserId={currentUser?.id || 0}
          jwt={jwt || ''}
          onComplete={() => setCompleted(true)}
          onEscalate={() => setEscalated(true)}
        />
      </div>
    </div>
  )
}
