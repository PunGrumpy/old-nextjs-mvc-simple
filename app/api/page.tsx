import Link from 'next/link'

export default async function Home() {
  return (
    <div className="bg-[url('/images/wallpaper-swagger.png')] bg-fixed min-h-screen flex flex-col items-center justify-center text-white">
      <header className="text-center flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Welcome to Our API
        </h1>
        <p className="text-indigo-100 text-lg mb-8">
          Explore our API documentation to get started.
        </p>
        <div className="flex items-center space-x-8">
          <Link href="/api-doc" passHref className="group">
            <div className="bg-indigo-950 bg-opacity-70 backdrop-blur-lg hover:bg-indigo-600 hover:bg-opacity-80 text-white py-2 px-6 rounded-md text-lg transition duration-300 ease-in-out transform group-hover:scale-105">
              API Documentation
            </div>
          </Link>
        </div>
      </header>
    </div>
  )
}
