import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
  } catch (err: unknown) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const adminToken = process.env.STRAPI_API_TOKEN

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const strapiUserId = session.metadata?.strapiUserId
        const customerId = session.customer as string

        if (strapiUserId && adminToken) {
          await fetch(`${STRAPI_URL}/api/users/${strapiUserId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
              plan: 'pro',
              stripeCustomerId: customerId,
            }),
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        if (adminToken) {
          // Find user by stripeCustomerId
          const usersRes = await fetch(
            `${STRAPI_URL}/api/users?filters[stripeCustomerId][$eq]=${customerId}`,
            { headers: { Authorization: `Bearer ${adminToken}` } }
          )
          const users = await usersRes.json()
          if (users && users.length > 0) {
            const userId = users[0].id
            const plan = subscription.status === 'active' ? 'pro' : 'free'
            await fetch(`${STRAPI_URL}/api/users/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminToken}`,
              },
              body: JSON.stringify({ plan }),
            })
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        if (adminToken) {
          const usersRes = await fetch(
            `${STRAPI_URL}/api/users?filters[stripeCustomerId][$eq]=${customerId}`,
            { headers: { Authorization: `Bearer ${adminToken}` } }
          )
          const users = await usersRes.json()
          if (users && users.length > 0) {
            await fetch(`${STRAPI_URL}/api/users/${users[0].id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminToken}`,
              },
              body: JSON.stringify({ plan: 'free' }),
            })
          }
        }
        break
      }

      case 'invoice.paid': {
        // Invoice paid — we already update plan on subscription events
        break
      }

      case 'invoice.payment_failed': {
        // Payment failed — could notify user
        console.warn('Payment failed for customer:', (event.data.object as Stripe.Invoice).customer)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    // Still return 200 so Stripe doesn't retry
  }

  return NextResponse.json({ received: true })
}
