export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50" aria-label="Dashboard wird geladen..." aria-busy="true">
      {/* Header skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Circles skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Proposals skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                    <div>
                      <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                    </div>
                    <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column skeleton */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-36 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-7 h-7 bg-gray-200 rounded animate-pulse shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1" />
                      <div className="h-3 w-12 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
