import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/util'
import { NextRequest } from 'next/server'

// GET /api/posts/[id]
export async function GET(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ message: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return sendJSON({ message: 'Post not found' }, 404)
  }

  return sendJSON({ post }, 200)
}

// PUT /api/posts/[id]
export async function PUT(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ message: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return sendJSON({ message: 'Post not found' }, 404)
  }

  const reqBody: { title: string; content: string } = await req.json()

  if (!reqBody) {
    return sendJSON({ message: 'No data sent' }, 400)
  }

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

  return sendJSON({ updatedPost }, 200)
}

// DELETE /api/posts/[id]
export async function DELETE(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ message: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return sendJSON({ message: 'Post not found' }, 404)
  }

  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) }
  })

  return sendJSON({ deletedPost }, 200)
}
