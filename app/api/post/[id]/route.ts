import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'
import { ResponseJSON } from '@/lib/http'
import { type NextRequest } from 'next/server'

/**
 * @swagger
 * /api/post/{id}:
 *  get:
 *    tags:
 *      - Post
 *    description: Get a post by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Post ID
 *    schema:
 *      $ref: '#/components/schemas/Post'
 *    example:
 *      id: 1
 *    responses:
 *      200:
 *        description: Post found
 *      400:
 *        description: No ID provided
 *      404:
 *        description: Post not found
 */
export async function GET({ params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return ResponseJSON({ error: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return ResponseJSON({ error: 'Post not found' }, 404)
  }

  return ResponseJSON(post, 200)
}

/**
 * @swagger
 * /api/post/{id}:
 *  put:
 *    tags:
 *      - Post
 *    description: Update a post by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Post ID
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *          example:
 *            title: 'My first post'
 *            content: 'Hello world!'
 *    responses:
 *      200:
 *        description: Post updated
 *      400:
 *        description: Missing title or content
 *      404:
 *        description: Post not found
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return ResponseJSON({ error: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return ResponseJSON({ error: 'Post not found' }, 404)
  }

  const { title, content }: Post = await request.json()

  if (!title && !content) {
    return ResponseJSON({ message: 'Missing title or content' }, 400)
  }

  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content
    }
  })

  return ResponseJSON(updatedPost, 200)
}

/**
 * @swagger
 * /api/post/{id}:
 *  delete:
 *    tags:
 *      - Post
 *    description: Delete a post by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Post ID
 *    responses:
 *      200:
 *        description: Post deleted
 *      400:
 *        description: No ID provided
 *      404:
 *        description: Post not found
 */
export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return ResponseJSON({ error: 'No ID provided' }, 400)
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  if (!post) {
    return ResponseJSON({ error: 'Post not found' }, 404)
  }

  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) }
  })

  return ResponseJSON(deletedPost, 200)
}
