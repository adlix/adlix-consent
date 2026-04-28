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
  private jwt: string | null = null

  constructor(baseUrl: string = STRAPI_URL, jwt?: string) {
    this.baseUrl = baseUrl
    this.jwt = jwt ?? null
  }

  /** Set the JWT from NextAuth session (mutates this instance) */
  setJwt(jwt: string | null) {
    this.jwt = jwt
  }

  /** Return a new client that authenticates with the given JWT */
  withToken(token: string): StrapiClient {
    return new StrapiClient(this.baseUrl, token)
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseUrl}/api${endpoint}`

    const headers = new Headers(options.headers)
    headers.set('Content-Type', 'application/json')

    // Prefer user JWT (auth), fall back to API token
    const bearer = this.jwt || process.env.STRAPI_API_TOKEN
    if (bearer) {
      headers.set('Authorization', `Bearer ${bearer}`)
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
  async castVote(roundId: number | string, choice: 'consent' | 'minor_objection' | 'major_objection' | 'abstain', userId: number, reason?: string) {
    return this.request<unknown>('/votes', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          choice,
          round: roundId,
          user: userId,
          reason: reason || undefined,
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

  // Circles
  async getCircles() {
    return this.request<unknown[]>('/circles?populate=owner,members&sort=createdAt:desc')
  }

  async getCircle(id: number | string) {
    return this.request<unknown>(`/circles/${id}?populate=owner,members,projects`)
  }

  async createCircle(data: { name: string; description?: string }) {
    return this.request<unknown>('/circles', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
  }

  async generateInvite(circleId: number | string) {
    return this.request<unknown>(`/circles/${circleId}/generate-invite`, {
      method: 'POST',
    })
  }

  async joinCircle(token: string) {
    return this.request<unknown>(`/circles/join/${token}`, {
      method: 'POST',
    })
  }

  async getCircleMembers(circleId: number | string) {
    return this.request<unknown>(`/circles/${circleId}/members`)
  }

  // Auth
  async register(data: { username: string; email: string; password: string }) {
    return this.request<unknown>('/auth/local/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(identifier: string, password: string) {
    return this.request<{ jwt: string; user: { id: number; email: string; username: string } }>(
      '/auth/local',
      {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      }
    )
  }

  // Abstentions (Enthaltung)
  async createAbstention(data: {
    reason: string
    detail?: string
    finalChoice?: string
    reflexionAnswers?: string[]
    anonymousConcern?: string
    round: number
    user: number
  }) {
    return this.request<unknown>('/abstentions', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
  }

  async getAbstentions(roundId: number | string) {
    return this.request<unknown[]>(
      `/abstentions?filters[round][id][$eq]=${roundId}&populate=user`
    )
  }

  async analyseAbstentions(roundId: number | string) {
    return this.request<{
      total: number
      clusters: Array<{
        id: string
        label: string
        reasonCodes: string[]
        description: string
        count: number
        keywords: string[]
      }>
      recommendations: string[]
      analysedAt: string
    }>(`/abstentions/${roundId}/analyse`, {
      method: 'POST',
    })
  }
}

// Singleton instance
export const strapi = new StrapiClient()

export default strapi
