import prisma from '@/app/libs/prisma'
import { sendJSON } from '@/app/libs/util'
import { NextRequest } from 'next/server'

// GET /api/posts
export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: true
    }
  })

  if (!posts) {
    return sendJSON({ message: 'No posts found' }, 404)
  }

  return sendJSON({ posts }, 200)
}

// POST /api/posts
export async function POST(req: NextRequest) {
  const reqBody: { title: string; content: string; authorId: number } =
    await req.json()

  if (!reqBody) {
    return sendJSON({ message: 'No data sent' }, 400)
  }

  const { title, content, authorId } = reqBody

  if (!title || !content || !authorId) {
    return sendJSON({ message: 'Missing title, content, or author ID' }, 400)
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId
    }
  })

  return sendJSON({ post }, 201)
}
