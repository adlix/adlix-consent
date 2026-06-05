'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { strapi } from '@/lib/strapi'
import type { SearchableProject } from '@/components/ProjectSearch/ProjectSearch'

const ProjectSearch = dynamic(() => import('@/components/ProjectSearch/ProjectSearch'), {
  ssr: false,
})

const statusLabels: Record<string, { label: string; color: string }> = {
  draft: { label: 'Entwurf', color: 'bg-gray-100 text-gray-700' },
  active: { label: 'Aktiv', color: 'bg-green-100 text-green-700' },
  completed: { label: 'Abgeschlossen', color: 'bg-blue-100 text-blue-700' },
  beschlossen: { label: 'Beschlossen', color: 'bg-emerald-100 text-emerald-700' },
  archived: { label: 'Archiviert', color: 'bg-gray-100 text-gray-500' },
}

function mapProject(p: any): SearchableProject {
  const roundCount = p.rounds?.length ?? 0
  const latestRound = p.rounds?.[roundCount - 1]
  const participantCount =
    p.circle?.circleMembers?.length ?? p.participants?.length ?? 0

  return {
    id: p.id,
    name: p.name,
    description: p.description ?? '',
    status: p.status ?? 'draft',
    currentRound: latestRound?.roundNumber ?? (roundCount > 0 ? roundCount : 0),
    participantCount,
    updatedAt: p.updatedAt
      ? new Date(p.updatedAt).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : undefined,
  }
}

export default function ProjectsPage() {
  const { data: session } = useSession()
  const jwt = (session as unknown as { jwt?: string })?.jwt

  const [allProjects, setAllProjects] = useState<SearchableProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<SearchableProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jwt) return
    strapi.setJwt(jwt)
    strapi
      .getProjects({
        populate: 'circle,circle.circleMembers,participants,rounds,currentRound',
        sort: 'updatedAt:desc',
        pagination: { pageSize: 50 },
      })
      .then((res) => {
        const items = ((res.data as any[]) || []).map(mapProject)
        setAllProjects(items)
        setFilteredProjects(items)
      })
      .catch(() => setError('Vorhaben konnten nicht geladen werden.'))
      .finally(() => setLoading(false))
  }, [jwt])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80"
              aria-label="adlix consent Startseite"
            >
              <span className="text-2xl" aria-hidden="true">
                🗳️
              </span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
          <nav aria-label="Hauptnavigation">
            <ul className="flex items-center gap-4 list-none">
              <li>
                <Link href="/projects" className="text-primary font-medium" aria-current="page">
                  Vorhaben
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/new"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                >
                  + Neues Vorhaben
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main id="main-content" className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Vorhaben</h1>
              {!loading && allProjects.length > 0 && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {allProjects.length} Vorhaben insgesamt
                </p>
              )}
            </div>
            <Link
              href="/projects/new"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
              aria-label="Neues Vorhaben einreichen"
            >
              + Neues Vorhaben
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null)
                  setLoading(true)
                  strapi
                    .getProjects({
                      populate: 'circle,circle.circleMembers,participants,rounds,currentRound',
                      sort: 'updatedAt:desc',
                      pagination: { pageSize: 50 },
                    })
                    .then((res) => {
                      const items = ((res.data as any[]) || []).map(mapProject)
                      setAllProjects(items)
                      setFilteredProjects(items)
                    })
                    .catch(() => setError('Vorhaben konnten nicht geladen werden.'))
                    .finally(() => setLoading(false))
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Erneut laden
              </button>
            </div>
          )}

          {/* Search & Filter */}
          {!loading && !error && (
            <>
              <div className="mb-6">
                <Suspense fallback={<div className="h-24 bg-gray-100 animate-pulse rounded-xl" />}>
                  <ProjectSearch projects={allProjects} onFilterChange={setFilteredProjects} />
                </Suspense>
              </div>

              {filteredProjects.length === 0 && allProjects.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                  <div className="text-5xl mb-4" aria-hidden="true">
                    📋
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Noch keine Vorhaben</h2>
                  <p className="text-gray-600 mb-6">
                    Starte deinen ersten Consent-Prozess — reiche ein Vorhaben ein.
                  </p>
                  <Link
                    href="/projects/new"
                    className="inline-block px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                  >
                    Erstes Vorhaben einreichen
                  </Link>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                  <div className="text-5xl mb-4" aria-hidden="true">
                    🔍
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Keine Treffer</h2>
                  <p className="text-gray-600 mb-4">
                    Keine Vorhaben entsprechen deinen Suchkriterien.
                  </p>
                </div>
              ) : (
                <ul
                  className="grid gap-4 list-none"
                  aria-label={`${filteredProjects.length} Vorhaben`}
                >
                  {filteredProjects.map((project) => {
                    const status = statusLabels[project.status] || statusLabels.draft
                    return (
                      <li key={project.id}>
                        <Link
                          href={`/projects/${project.id}`}
                          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow block"
                          aria-label={`Vorhaben: ${project.name} — Status: ${status.label}`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0 pr-4">
                              <h2 className="text-lg font-semibold mb-1 truncate">
                                {project.name}
                              </h2>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {project.description}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${status.color}`}
                              aria-hidden="true"
                            >
                              {status.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            {project.currentRound != null && project.currentRound > 0 && (
                              <span>Runde {project.currentRound}</span>
                            )}
                            {project.participantCount != null &&
                              project.participantCount > 0 && (
                                <span>
                                  {project.participantCount}{' '}
                                  {project.participantCount === 1
                                    ? 'Teilnehmer'
                                    : 'Teilnehmer'}
                                </span>
                              )}
                            {project.updatedAt && (
                              <span className="ml-auto text-xs">
                                Aktualisiert: {project.updatedAt}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
