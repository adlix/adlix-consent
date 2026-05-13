import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function POST(req: NextRequest) {
  const cookieStore = req.cookies
  const jwt = cookieStore.get('consent_session')?.value

  if (!jwt) {
    return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 })
  }

  if (!PRO_PRICE_ID) {
    return NextResponse.json({ error: 'Stripe nicht konfiguriert.' }, { status: 500 })
  }

  try {
    // Get user from Strapi
    const userRes = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (!userRes.ok) {
      return NextResponse.json({ error: 'Benutzer nicht gefunden.' }, { status: 401 })
    }

    const user = await userRes.json()

    // Get or create Stripe customer
    let customerId = user.stripeCustomerId as string | undefined

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username || user.email,
        metadata: {
          strapiUserId: String(user.id),
        },
      })
      customerId = customer.id

      // Save customer ID to Strapi user
      const adminToken = process.env.STRAPI_API_TOKEN
      if (adminToken) {
        await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ stripeCustomerId: customerId }),
        })
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card', 'paypal', 'sepa_debit'],
      line_items: [
        {
          price: PRO_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${APP_URL}/settings/billing?success=true`,
      cancel_url: `${APP_URL}/settings/billing?canceled=true`,
      metadata: {
        strapiUserId: String(user.id),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Checkout konnte nicht gestartet werden.' }, { status: 500 })
  }
}