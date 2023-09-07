import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/utils'
import { NextRequest } from 'next/server'

// GET /api/post/[id]
export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ error: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return sendJSON({ error: 'Post not found' }, 404)
  }

  return sendJSON(post, 200)
}

// PUT /api/post/[id]
export async function PUT(req: NextRequest) {
  const { pathname } = req.nextUrl
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ error: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return sendJSON({ error: 'Post not found' }, 404)
  }

  const reqBody: Post = await req.json()
  const { title, content } = reqBody

  if (!title && !content) {
    return sendJSON({ message: 'Missing title or content' }, 400)
  }

  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content
    }
  })

  return sendJSON(updatedPost, 200)
}

// DELETE /api/post/[id]
export async function DELETE(req: NextRequest) {
  const { pathname } = req.nextUrl
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ error: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return sendJSON({ error: 'Post not found' }, 404)
  }

  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) }
  })

  return sendJSON(deletedPost, 200)
}
