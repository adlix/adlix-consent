import { NextRequest, NextResponse } from 'next/server'
import { getJwtFromRequest } from './lib/session'

const PUBLIC_PREFIXES = ['/', '/login', '/register', '/pricing', '/api/auth']

function isPublic(pathname: string): boolean {
  if (pathname === '/') return true
  return PUBLIC_PREFIXES.some(
    (p) => p !== '/' && (pathname === p || pathname.startsWith(p + '/') || pathname.startsWith(p + '?'))
  )
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (isPublic(pathname)) return NextResponse.next()

  const jwt = getJwtFromRequest(req)
  if (!jwt) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|woff2?)).*)'],
}
