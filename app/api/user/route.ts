import { NextRequest } from 'next/server'
import prisma from '@/app/libs/prisma'
import { sendJSON } from '@/app/libs/util'

// GET /api/users
export async function GET() {
  const users = await prisma.user.findMany()

  if (!users) {
    return sendJSON({ message: 'No users found' }, 404)
  }

  return sendJSON({ users }, 200)
}

// POST /api/users
export async function POST(req: NextRequest) {
  const reqBody: { name: string; email: string } = await req.json()

  if (!reqBody) {
    return sendJSON({ message: 'No data sent' }, 400)
  }

  const { name, email } = reqBody

  if (!name || !email) {
    return sendJSON({ message: 'Missing name or email' }, 400)
  }

  const userExists = await prisma.user.findUnique({
    where: { email }
  })

  if (userExists) {
    return sendJSON({ message: 'User already exists' }, 400)
  }

  const user = await prisma.user.create({
    data: {
      name,
      email
    }
  })

  return sendJSON({ user }, 201)
}
