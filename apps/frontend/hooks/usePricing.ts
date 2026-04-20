'use client';

import { useState, useEffect } from 'react';

interface License {
  plan: 'free' | 'pro';
  circlesUsed: number;
  maxCircles: number;
}

// Mock - später durch API ersetzen
const mockLicense: License = {
  plan: 'free',
  circlesUsed: 1,
  maxCircles: 1,
};

export function usePricing() {
  const [license, setLicense] = useState<License>(mockLicense);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API-Call für echte Lizenz-Daten
    // fetch('/api/user/license').then(...)
    setLoading(false);
  }, []);

  const canCreateCircle = (): { allowed: boolean; reason?: string } => {
    if (license.plan === 'pro') {
      return { allowed: true };
    }
    
    if (license.circlesUsed >= license.maxCircles) {
      return {
        allowed: false,
        reason: 'Free erlaubt nur 1 Kreis. Upgrade für unbegrenzte Kreise.',
      };
    }
    
    return { allowed: true };
  };

  const checkAndCreate = async () => {
    const { allowed, reason } = canCreateCircle();
    
    if (!allowed) {
      return { success: false, upgradeRequired: true, reason };
    }
    
    // TODO: API-Call für Kreis-Erstellung
    return { success: true, upgradeRequired: false };
  };

  const showUpgradePrompt = () => {
    // Öffnet Pricing-Modal oder leitet zur Pricing-Seite weiter
    window.location.href = '/pricing';
  };

  return {
    license,
    loading,
    canCreateCircle,
    checkAndCreate,
    showUpgradePrompt,
    isPro: license.plan === 'pro',
  };
}

export function LicenseGuard({ children }: { children: React.ReactNode }) {
  const { canCreateCircle, showUpgradePrompt, loading } = usePricing();

  useEffect(() => {
    if (loading) return;
    
    const { allowed } = canCreateCircle();
    if (!allowed) {
      showUpgradePrompt();
    }
  }, [loading]);

  if (loading) {
    return <div>Lädt...</div>;
  }

  return <>{children}</>;
}