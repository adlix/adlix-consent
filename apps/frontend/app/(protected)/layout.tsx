import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AppHeader from '@/components/AppHeader'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} />
      {children}
    </div>
  )
}
