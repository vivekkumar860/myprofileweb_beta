'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-pink-100">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
            <p className="text-gray-600 mb-6">
              An unexpected error occurred. Please try again.
            </p>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => reset()}
              aria-label="Try again"
            >
              Try again
            </button>
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-40">
                  {error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
