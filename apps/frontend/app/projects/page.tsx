import Link from "next/link";

// Mock data for projects (will be replaced with Strapi API calls)
const mockProjects = [
  {
    id: 1,
    name: "Neues Büro-Konzept",
    description: "Diskussion über flexible Arbeitsplatzgestaltung",
    status: "active",
    currentRound: 2,
    participantCount: 12,
    updatedAt: "2026-04-16",
  },
  {
    id: 2,
    name: "Team-Event 2026",
    description: "Planung des nächsten Team-Events",
    status: "active",
    currentRound: 1,
    participantCount: 8,
    updatedAt: "2026-04-15",
  },
  {
    id: 3,
    name: "Projekt-Review Prozess",
    description: "Neuer Ablauf für Projekt-Reviews",
    status: "draft",
    currentRound: 0,
    participantCount: 5,
    updatedAt: "2026-04-10",
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  draft: { label: "Entwurf", color: "bg-gray-100 text-gray-700" },
  active: { label: "Aktiv", color: "bg-green-100 text-green-700" },
  completed: { label: "Abgeschlossen", color: "bg-blue-100 text-blue-700" },
  archived: { label: "Archiviert", color: "bg-gray-100 text-gray-500" },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-2xl">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/projects" className="text-primary font-medium">
              Projekte
            </Link>
            <Link
              href="/projects/new"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
            >
              + Neues Projekt
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Projekte</h1>
            <Link
              href="/projects/new"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
            >
              + Neues Projekt
            </Link>
          </div>

          {mockProjects.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-xl font-semibold mb-2">Keine Projekte vorhanden</h2>
              <p className="text-gray-600 mb-6">
                Starte dein erstes Consent-Projekt und treffe gemeinsam bessere Entscheidungen.
              </p>
              <Link
                href="/projects/new"
                className="inline-block px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
              >
                Erstes Projekt erstellen
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {mockProjects.map((project) => {
                const status = statusLabels[project.status] || statusLabels.draft;
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-semibold mb-1">{project.name}</h2>
                        <p className="text-gray-600 text-sm">{project.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      {project.currentRound > 0 && (
                        <span>Runde {project.currentRound}</span>
                      )}
                      <span>{project.participantCount} Teilnehmer</span>
                      <span>Aktualisiert: {project.updatedAt}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
