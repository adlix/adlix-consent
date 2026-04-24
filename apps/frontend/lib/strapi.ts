/**
 * Strapi API Client
 * Basis-Client für die Kommunikation mit dem Strapi Backend
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

class StrapiClient {
  private baseUrl: string

  constructor(baseUrl: string = STRAPI_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseUrl}/api${endpoint}`

    const headers = new Headers(options.headers)
    headers.set('Content-Type', 'application/json')

    const token = process.env.STRAPI_API_TOKEN
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`Strapi API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Projects
  async getProjects(params?: {
    populate?: string
    filters?: Record<string, string | number | boolean>
    sort?: string | string[]
    pagination?: { page?: number; pageSize?: number }
  }) {
    const queryParams = new URLSearchParams()

    if (params?.populate) {
      queryParams.set('populate', params.populate)
    }
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        queryParams.set(`filters[${key}][$eq]`, String(value))
      })
    }
    if (params?.sort) {
      const sortArray = Array.isArray(params.sort) ? params.sort : [params.sort]
      sortArray.forEach((s) => queryParams.append('sort', s))
    }
    if (params?.pagination) {
      if (params.pagination.page) {
        queryParams.set('pagination[page]', String(params.pagination.page))
      }
      if (params.pagination.pageSize) {
        queryParams.set('pagination[pageSize]', String(params.pagination.pageSize))
      }
    }

    return this.request<unknown[]>(`/projects?${queryParams.toString()}`)
  }

  async getProject(id: number | string, populate: string = '*') {
    return this.request<unknown>(`/projects/${id}?populate=${populate}`)
  }

  async createProject(data: { name: string; description: string; status?: string }) {
    return this.request<unknown>('/projects', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
  }

  // Rounds
  async getRounds(projectId: number | string) {
    return this.request<unknown[]>(`/rounds?filters[project][id][$eq]=${projectId}&populate=*`)
  }

  async createRound(data: {
    roundNumber: number
    proposal: string
    status?: string
    project: number
  }) {
    return this.request<unknown>('/rounds', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
  }

  // Votes
  async castVote(roundId: number | string, choice: 'yes' | 'no' | 'abstain', userId: number) {
    return this.request<unknown>('/votes', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          choice,
          round: roundId,
          user: userId,
        },
      }),
    })
  }

  async getVotes(roundId: number | string) {
    return this.request<unknown[]>(`/votes?filters[round][id][$eq]=${roundId}&populate=user`)
  }

  // Objections
  async createObjection(data: {
    reason: string
    severity: 'minor' | 'major' | 'blocking'
    round: number
    user: number
  }) {
    return this.request<unknown>('/objections', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
  }

  async getObjections(roundId: number | string) {
    return this.request<unknown[]>(`/objections?filters[round][id][$eq]=${roundId}&populate=user`)
  }

  // Outcome
  async setOutcome(projectId: number | string, data: {
    outcome: string
    nextSteps?: string
    evaluationDate?: string
    minorObjectionsLog?: unknown[]
    status?: string
  }) {
    return this.request<unknown>(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    })
  }

  // Audit Logs
  async getAuditLogs(projectId: number | string) {
    return this.request<unknown[]>(
      `/audit-logs?filters[project][id][$eq]=${projectId}&sort=createdAt:desc&pagination[pageSize]=100`
    )
  }

  // Comments
  async createComment(data: { content: string; round: number; user: number }) {
    return this.request<unknown>('/comments', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
  }

  async getComments(roundId: number | string) {
    return this.request<unknown[]>(
      `/comments?filters[round][id][$eq]=${roundId}&populate=user&sort=createdAt:asc`
    )
  }
}

// Singleton instance
export const strapi = new StrapiClient()

export default strapi
