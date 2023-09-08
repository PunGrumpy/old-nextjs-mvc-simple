import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/utils'
import { User } from '@prisma/client'
import { NextRequest } from 'next/server'

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
export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ error: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return sendJSON({ error: 'User not found' }, 404)
  }

  return sendJSON(user, 200)
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
export async function PUT(req: NextRequest) {
  const { pathname } = req.nextUrl
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ error: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return sendJSON({ error: 'User not found' }, 404)
  }

  const reqBody: User = await req.json()
  const { name, email } = reqBody

  if (!name && !email) {
    return sendJSON({ error: 'Missing name or email' }, 400)
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser && existingUser.id !== Number(id)) {
    return sendJSON({ error: 'User already exists' }, 400)
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      email
    }
  })

  return sendJSON(updatedUser, 200)
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
export async function DELETE(req: NextRequest) {
  const { pathname } = req.nextUrl
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ error: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return sendJSON({ error: 'User not found' }, 404)
  }

  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) }
  })

  return sendJSON(deletedUser, 200)
}
