import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function POST(req: NextRequest) {
  const cookieStore = req.cookies
  const jwt = cookieStore.get('consent_session')?.value

  if (!jwt) {
    return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { customerId } = body as { customerId: string }

    if (!customerId) {
      return NextResponse.json({ error: 'Kein Kunde vorhanden.' }, { status: 400 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${APP_URL}/settings/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Stripe billing portal error:', err)
    return NextResponse.json({ error: 'Billing-Portal nicht verfügbar.' }, { status: 500 })
  }
}