import { handlers } from '@/lib/auth'

// NextAuth handler kept for potential future OAuth providers
// Current auth flow uses custom session (lib/session.ts + /api/auth/login)
export const { GET, POST } = handlers
