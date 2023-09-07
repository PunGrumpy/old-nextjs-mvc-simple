import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/utils'
import { NextRequest } from 'next/server'

// GET /api/post
export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: true
    }
  })

  if (!posts) {
    return sendJSON({ error: 'No posts found' }, 404)
  }

  return sendJSON(posts, 200)
}

// POST /api/post
export async function POST(req: NextRequest) {
  const reqBody: Post = await req.json()
  const { title, content, authorId } = reqBody

  if (!title || !content || !authorId) {
    return sendJSON({ error: 'Missing title, content, or author ID' }, 400)
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: authorId }
  })

  if (!existingUser) {
    return sendJSON({ error: 'User not found' }, 404)
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId
    }
  })

  return sendJSON(post, 201)
}
