import prisma from '@/app/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/posts/[id]
export async function GET(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'No ID provided' }, { status: 400 })
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json({ message: 'Post found', post }, { status: 200 })
}

// PUT /api/posts/[id]
export async function PUT(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'No ID provided' }, { status: 400 })
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 })
  }

  const reqBody: { title: string; content: string } = await req.json()

  if (!reqBody) {
    return NextResponse.json({ message: 'No data sent' }, { status: 400 })
  }

  const { title, content } = reqBody

  if (!title && !content) {
    return NextResponse.json(
      { message: 'Title and content are required' },
      { status: 400 }
    )
  }

  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content
    }
  })

  return NextResponse.json(
    { message: 'Post updated', updatedPost },
    { status: 200 }
  )
}

// DELETE /api/posts/[id]
export async function DELETE(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'No ID provided' }, { status: 400 })
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 })
  }

  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) }
  })

  return NextResponse.json(
    { message: 'Post deleted', deletedPost },
    { status: 200 }
  )
}
