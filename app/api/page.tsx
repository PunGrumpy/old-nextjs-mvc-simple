import Link from 'next/link'

export default async function Home() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <header className="text-center flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-indigo-400 mb-4">
          Welcome to Our API
        </h1>
        <p className="text-indigo-300 text-lg mb-8">
          Explore our API documentation to get started.
        </p>
        <div className="flex items-center space-x-8">
          <Link href="/api-doc" passHref className="group">
            <button className="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-6 rounded-md text-lg transition duration-300 ease-in-out transform group-hover:scale-105">
              API Documentation
            </button>
          </Link>
        </div>
      </header>
    </div>
  )
}
