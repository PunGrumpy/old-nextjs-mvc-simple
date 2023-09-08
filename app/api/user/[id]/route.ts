import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { ResponseJSON } from '@/lib/http'
import { type NextRequest } from 'next/server'

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *    tags:
 *      - User
 *    description: Get a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User ID
 *    schema:
 *      $ref: '#/components/schemas/User'
 *    example:
 *      id: 1
 *    responses:
 *      200:
 *        description: User found
 *      400:
 *        description: No ID provided
 *      404:
 *        description: User not found
 */
export async function GET({ params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return ResponseJSON({ error: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return ResponseJSON({ error: 'User not found' }, 404)
  }

  return ResponseJSON(user, 200)
}

/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *    tags:
 *      - User
 *    description: Update a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User ID
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            name: 'John Doe'
 *            email: 'john@change.com'
 *    responses:
 *      200:
 *        description: User updated
 *      400:
 *        description: Missing name or email
 *      404:
 *        description: User not found
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return ResponseJSON({ error: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return ResponseJSON({ error: 'User not found' }, 404)
  }

  const { name, email }: User = await request.json()

  if (!name && !email) {
    return ResponseJSON({ error: 'Missing name or email' }, 400)
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser && existingUser.id !== Number(id)) {
    return ResponseJSON({ error: 'User already exists' }, 400)
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      email
    }
  })

  return ResponseJSON(updatedUser, 200)
}

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *    tags:
 *      - User
 *    description: Delete a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User ID
 *    example:
 *      id: 1
 *    responses:
 *      200:
 *        description: User deleted
 *      400:
 *        description: No ID provided
 *      404:
 *        description: User not found
 */
export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return ResponseJSON({ error: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return ResponseJSON({ error: 'User not found' }, 404)
  }

  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) }
  })

  return ResponseJSON(deletedUser, 200)
}
