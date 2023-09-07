import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/utils'
import { NextRequest } from 'next/server'

// GET /api/user
export async function GET() {
  const users = await prisma.user.findMany()

  if (!users) {
    return sendJSON({ error: 'No users found' }, 404)
  }

  return sendJSON(users, 200)
}

// POST /api/user
export async function POST(req: NextRequest) {
  const reqBody: User = await req.json()
  const { name, email } = reqBody

  if (!name || !email) {
    return sendJSON({ error: 'Missing name or email' }, 400)
  }
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })
  if (existingUser) {
    return sendJSON({ error: 'User already exists' }, 400)
  }

  const user = await prisma.user.create({
    data: {
      name,
      email
    }
  })

  return sendJSON(user, 201)
}
