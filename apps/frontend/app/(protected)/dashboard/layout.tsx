import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dein persönliches Dashboard — Kreise, aktive Vorhaben und letzte Aktivitäten auf einen Blick.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/dashboard' },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
