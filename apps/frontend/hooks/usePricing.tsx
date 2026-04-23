'use client'

import { useState, useEffect, useCallback } from 'react'

interface License {
  plan: 'free' | 'pro'
  circlesUsed: number
  maxCircles: number
}

// Mock - später durch API ersetzen
const mockLicense: License = {
  plan: 'free',
  circlesUsed: 1,
  maxCircles: 1,
}

export function usePricing() {
  const [license] = useState<License>(mockLicense)
  const loading = false

  const canCreateCircle = useCallback((): { allowed: boolean; reason?: string } => {
    if (license.plan === 'pro') {
      return { allowed: true }
    }

    if (license.circlesUsed >= license.maxCircles) {
      return {
        allowed: false,
        reason: 'Free erlaubt nur 1 Kreis. Upgrade für unbegrenzte Kreise.',
      }
    }

    return { allowed: true }
  }, [license])

  const showUpgradePrompt = useCallback(() => {
    window.location.href = '/pricing'
  }, [])

  const checkAndCreate = useCallback(async () => {
    const { allowed, reason } = canCreateCircle()

    if (!allowed) {
      return { success: false, upgradeRequired: true, reason }
    }

    // TODO: API-Call für Kreis-Erstellung
    return { success: true, upgradeRequired: false }
  }, [canCreateCircle])

  return {
    license,
    loading,
    canCreateCircle,
    checkAndCreate,
    showUpgradePrompt,
    isPro: license.plan === 'pro',
  }
}

export function LicenseGuard({ children }: { children: React.ReactNode }) {
  const { canCreateCircle, showUpgradePrompt, loading } = usePricing()

  useEffect(() => {
    if (loading) return

    const { allowed } = canCreateCircle()
    if (!allowed) {
      showUpgradePrompt()
    }
  }, [loading, canCreateCircle, showUpgradePrompt])

  if (loading) {
    return <div>Lädt...</div>
  }

  return <>{children}</>
}
