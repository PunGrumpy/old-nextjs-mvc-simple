import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export default async function Page() {
  const feed = await prisma.user.findMany({
    include: {
      posts: false
    }
  })

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {feed.map(user => (
          <li key={user.id}>
            <a href={`/users/${user.id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
