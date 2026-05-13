import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export default async function SettingsPage() {
  const user = await getSession()
  if (!user) redirect('/login')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Einstellungen</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Konto</h2>
        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">E-Mail</dt>
            <dd className="text-sm font-medium">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Benutzername</dt>
            <dd className="text-sm font-medium">{user.username}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}