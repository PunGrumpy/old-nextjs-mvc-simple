import Link from 'next/link'
import prisma from '@/lib/prisma'

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })

  let numCols = 1
  if (posts.length > 1) {
    numCols = posts.length >= 3 ? 3 : 2
  }

  return (
    <div className="bg-[url('/images/wallpaper-swagger.png')] bg-fixed min-h-screen text-white">
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
      <main className="max-w-screen-xl mx-auto mt-16 w-full grid grid-cols-1 gap-6 md:grid-cols-${numCols} backdrop-blur-lg">
        {posts.map(post => (
          <article
            key={post.id}
            className="bg-indigo-950 bg-opacity-75 rounded-xl backdrop-blur-lg shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-indigo-300">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-400">{post.content}</p>
            </div>
            <div className="p-4 bg-black bg-opacity-20 rounded-b-xl">
              {(post.author && (
                <p className="text-sm text-indigo-300">By {post.author.name}</p>
              )) || <p className="text-sm text-indigo-300">By Anonymous</p>}
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}
