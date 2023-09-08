import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { ResponseJSON } from '@/lib/http'
import { type NextRequest } from 'next/server'

/**
 * @swagger
 * /api/user:
 *  get:
 *    tags:
 *      - User
 *    description: Get all users
 *    responses:
 *     200:
 *      description: Users found
 *     404:
 *      description: No users found
 */
export async function GET() {
  const users = await prisma.user.findMany()

  if (!users) {
    return ResponseJSON({ error: 'No users found' }, 404)
  }

  return ResponseJSON(users, 200)
}

/**
 * @swagger
 * /api/user:
 *  post:
 *    tags:
 *      - User
 *    description: Create a new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            name: 'John Doe'
 *            email: 'john@doe.com'
 *    responses:
 *      201:
 *        description: User created
 *      400:
 *        description: Missing name or email
 *
 */
export async function POST(request: NextRequest) {
  const { name, email }: User = await request.json()

  if (!name || !email) {
    return ResponseJSON({ error: 'Missing name or email' }, 400)
  }
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })
  if (existingUser) {
    return ResponseJSON({ error: 'User already exists' }, 400)
  }

  const user = await prisma.user.create({
    data: {
      name,
      email
    }
  })

  return ResponseJSON(user, 201)
}
