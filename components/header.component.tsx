import Link from 'next/link'

export async function Header() {
  return (
    <header className="backdrop-blur-lg">
      <nav className="bg-indigo-950 bg-opacity-70 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="#" className="text-white text-2xl font-bold">
                Next.js + Prisma
              </Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className="text-white hover:bg-indigo-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/api"
                className="text-white hover:bg-indigo-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                API
              </Link>
              <Link
                href="/api-doc"
                className="text-white hover:bg-indigo-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                API Documentation
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
