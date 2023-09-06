import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/posts
export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: true
    }
  })

  if (!posts) {
    return NextResponse.json({ message: 'No posts found' }, { status: 404 })
  }

  return NextResponse.json({ message: 'All posts', posts }, { status: 200 })
}

// POST /api/posts
export async function POST(req: NextRequest) {
  const reqBody: { title: string; content: string; authorId: number } =
    await req.json()

  if (!reqBody) {
    return NextResponse.json({ message: 'No data sent' }, { status: 400 })
  }

  const { title, content, authorId } = reqBody

  if (!title || !content || !authorId) {
    return NextResponse.json(
      { message: 'Title, content and authorId are required' },
      { status: 400 }
    )
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId
    }
  })

  return NextResponse.json({ message: 'Post created', post }, { status: 201 })
}
