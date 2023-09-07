import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/utils'
import { NextRequest } from 'next/server'

/**
 * @swagger
 * /api/post:
 *  get:
 *    tags:
 *      - Post
 *    description: Get a post by ID
 *    responses:
 *      200:
 *        description: Post found
 *      404:
 *        description: Post not found
 */
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

/**
 * @swagger
 * /api/post:
 *  post:
 *    tags:
 *      - Post
 *    description: Create a new post
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *          example:
 *            title: 'My first post'
 *            content: 'Hello world!'
 *            published: true
 *            authorId: 1
 *    responses:
 *      201:
 *        description: Post created
 *      400:
 *        description: Missing title, content, or author ID
 */
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
