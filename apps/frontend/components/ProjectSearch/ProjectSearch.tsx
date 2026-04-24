'use client'

import { useState, useMemo } from 'react'

export interface SearchableProject {
  id: number | string
  name: string
  description: string
  status: string
  currentRound?: number
  participantCount?: number
  updatedAt?: string
  owner?: string
}

interface ProjectSearchProps {
  projects: SearchableProject[]
  onFilterChange: (filtered: SearchableProject[]) => void
}

type StatusFilter = 'all' | 'draft' | 'active' | 'completed' | 'beschlossen' | 'archived'
type SortOption = 'newest' | 'oldest' | 'activity'

export default function ProjectSearch({ projects, onFilterChange }: ProjectSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortOption, setSortOption] = useState<SortOption>('newest')

  const filtered = useMemo(() => {
    let result = [...projects]

    // Text search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter)
    }

    // Sort
    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
        break
      case 'oldest':
        result.sort((a, b) => (a.updatedAt || '').localeCompare(b.updatedAt || ''))
        break
      case 'activity':
        result.sort((a, b) => (b.currentRound || 0) - (a.currentRound || 0))
        break
    }

    return result
  }, [projects, searchTerm, statusFilter, sortOption])

  // Notify parent on change
  useMemo(() => {
    onFilterChange(filtered)
  }, [filtered]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Vorhaben suchen..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white"
        />
        <svg
          className="absolute left-3 top-3 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Status pills */}
        {(
          [
            { key: 'all', label: 'Alle' },
            { key: 'active', label: 'Aktiv' },
            { key: 'draft', label: 'Entwurf' },
            { key: 'completed', label: 'Abgeschlossen' },
            { key: 'beschlossen', label: 'Beschlossen' },
            { key: 'archived', label: 'Archiviert' },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              statusFilter === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="ml-auto px-3 py-1 rounded-lg text-xs border border-gray-200 bg-white text-gray-600 focus:outline-none"
        >
          <option value="newest">Neueste</option>
          <option value="oldest">Älteste</option>
          <option value="activity">Letzte Aktivität</option>
        </select>
      </div>

      {/* Result count */}
      {searchTerm && (
        <p className="text-xs text-gray-500">
          {filtered.length} Ergebnis{filtered.length !== 1 ? 'se' : ''} für &quot;{searchTerm}&quot;
        </p>
      )}
    </div>
  )
}
