import prisma from '@/lib/prisma'
import { Header } from '@/components/header.component'

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
      <Header />
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
