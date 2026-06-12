import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import PasskeySection from '@/components/PasskeySection'

export default async function SettingsPage() {
  const user = await getSession()
  if (!user) redirect('/login')

  return (
    <div className="max-w-2xl space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Einstellungen</h1>
        <p className="text-sm text-gray-500 mt-1">Verwalte dein Konto und deine Sicherheit.</p>
      </div>

      {/* Account section */}
      <section aria-labelledby="account-heading">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg" role="img" aria-hidden="true">
              👤
            </span>
            <h2 id="account-heading" className="text-lg font-semibold">
              Konto
            </h2>
          </div>
          <dl className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-600">E-Mail</dt>
              <dd className="text-sm font-medium text-gray-900">{user.email}</dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-600">Benutzername</dt>
              <dd className="text-sm font-medium text-gray-900">{user.username}</dd>
            </div>
            <div className="flex justify-between items-center py-2">
              <dt className="text-sm text-gray-500">Konto erstellt</dt>
              <dd className="text-sm text-gray-400">—</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Security section */}
      <section aria-labelledby="security-heading">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg" role="img" aria-hidden="true">
            🔒
          </span>
          <h2 id="security-heading" className="text-lg font-semibold">
            Sicherheit
          </h2>
        </div>
        <PasskeySection />
      </section>

      {/* Notifications section (placeholder) */}
      <section aria-labelledby="notifications-heading">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg" role="img" aria-hidden="true">
              🔔
            </span>
            <h2 id="notifications-heading" className="text-lg font-semibold">
              Benachrichtigungen
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Erhalte Erinnerungen, wenn Abstimmungen anstehen oder Entscheidungen überprüft werden
            müssen.
          </p>
          <div className="space-y-3">
            {[
              {
                label: 'Erinnerung an ausstehende Abstimmungen',
                desc: '24h bevor eine Runde endet',
                defaultOn: true,
              },
              {
                label: 'Neue Antworten auf meine Fragen',
                desc: 'Wenn der Einreicher auf meine Frage antwortet',
                defaultOn: true,
              },
              {
                label: 'Einwände gegen meine Vorhaben',
                desc: 'Wenn jemand einen Einwand erhebt',
                defaultOn: true,
              },
              {
                label: 'Evaluations-Erinnerungen',
                desc: 'Wenn ein Vorhaben zur Überprüfung fällig ist',
                defaultOn: false,
              },
              {
                label: 'Einladungen zu neuen Kreisen',
                desc: 'Wenn du zu einem neuen Kreis eingeladen wirst',
                defaultOn: true,
              },
            ].map(({ label, desc, defaultOn }) => (
              <label key={label} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={defaultOn}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                    {label}
                  </p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
              onClick={() =>
                alert('Benachrichtigungs-Einstellungen werden in Kürze verfügbar sein.')
              }
            >
              Einstellungen speichern
            </button>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section aria-labelledby="danger-heading">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg" role="img" aria-hidden="true">
              ⚠️
            </span>
            <h2 id="danger-heading" className="text-lg font-semibold text-red-700">
              Gefahrenzone
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Diese Aktionen sind dauerhaft und können nicht rückgängig gemacht werden.
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-red-50 text-red-700 text-sm font-medium border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            onClick={() => alert('Konto-Löschung bitte über support@adlix.de anfragen.')}
          >
            Konto löschen
          </button>
        </div>
      </section>
    </div>
  )
}
