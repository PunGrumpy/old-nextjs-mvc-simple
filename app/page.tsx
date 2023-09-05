import prisma from '@/lib/prisma'

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Posts</h1>
      <ul className="mt-8">
        {posts.map(post => (
          <li key={post.id} className="mb-4">
            <a href={`/posts/${post.id}`}>
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-gray-500 mt-2">By {post.author?.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
