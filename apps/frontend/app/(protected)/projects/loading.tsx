export default function ProjectsLoading() {
  return (
    <div className="min-h-screen flex flex-col" aria-label="Projekte werden geladen..." aria-busy="true">
      {/* Header skeleton */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-4 items-center">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-9 w-32 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-9 w-36 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Search bar skeleton */}
          <div className="mb-6 h-12 bg-white rounded-lg border border-gray-200 animate-pulse" />

          {/* Project cards skeleton */}
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-72 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
                </div>
                <div className="flex gap-6">
                  <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
