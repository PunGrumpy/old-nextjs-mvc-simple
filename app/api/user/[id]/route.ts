import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/utils'
import { NextRequest } from 'next/server'

// GET /api/user/[id]
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

// PUT /api/user/[id]
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

// DELETE /api/user/[id]
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
