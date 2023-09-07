import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/util'

// GET /api/users/[id]
export async function GET(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ message: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return sendJSON({ message: 'User not found' }, 404)
  }

  return sendJSON({ user }, 200)
}

// PUT /api/users/[id]
export async function PUT(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ message: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return sendJSON({ message: 'User not found' }, 404)
  }

  const reqBody: { name: string; email: string } = await req.json()

  if (!reqBody) {
    return sendJSON({ message: 'No data sent' }, 400)
  }

  const { name, email } = reqBody

  if (!name && !email) {
    return sendJSON({ message: 'Missing name or email' }, 400)
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      email
    }
  })

  return sendJSON({ updatedUser }, 200)
}

// DELETE /api/users/[id]
export async function DELETE(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return sendJSON({ message: 'No ID provided' }, 400)
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return sendJSON({ message: 'User not found' }, 404)
  }

  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) }
  })

  return sendJSON({ deletedUser }, 200)
}
