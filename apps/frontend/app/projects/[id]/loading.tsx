export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50" aria-label="Projekt wird geladen..." aria-busy="true">
      {/* Header skeleton */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Project header skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="h-7 w-64 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-96 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

        {/* Flow steps skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
                {i < 6 && <div className="flex-1 h-1 bg-gray-100 mx-2 animate-pulse" />}
              </div>
            ))}
          </div>
        </div>

        {/* Proposal skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Voting area skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
