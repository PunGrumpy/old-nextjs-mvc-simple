import prisma from '@/app/lib/prisma'

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-indigo-700">
          Welcome to Next.js + Prisma Blog
        </h1>
      </header>
      <main className="max-w-screen-lg w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <article
            key={post.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-indigo-700">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-400">{post.content}</p>
            </div>
            <div className="p-4 bg-gray-700">
              <p className="text-sm text-indigo-400">By {post.author?.name}</p>
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}
