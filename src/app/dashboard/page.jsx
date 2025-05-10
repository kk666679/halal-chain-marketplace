// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-8">Please sign in to access your dashboard.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {/* Placeholder cards */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <a 
          href="/login" 
          className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}