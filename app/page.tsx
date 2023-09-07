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
    <div className="bg-gray-900 min-h-screen text-white">
      <header>
        <div className="bg-indigo-900 py-4 text-center">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-5xl font-extrabold text-indigo-100">
              Welcome to Next.js + Prisma Blog
            </h1>
          </div>
        </div>
      </header>
      <main
        className={`max-w-screen-xl mx-auto mt-16 w-full grid grid-cols-1 gap-6 md:grid-cols-${numCols}`}
      >
        {posts.map(post => (
          <article
            key={post.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-indigo-300">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-400">{post.content}</p>
            </div>
            <div className="p-4 bg-gray-700">
              <p className="text-sm text-indigo-300">By {post.author?.name}</p>
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}
