import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prisma'

// GET /api/users/[id]
export async function GET(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'No ID provided' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({ message: 'User found', user }, { status: 200 })
}

// PUT /api/users/[id]
export async function PUT(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'No ID provided' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const reqBody: { name: string; email: string } = await req.json()

  if (!reqBody) {
    return NextResponse.json({ message: 'No data sent' }, { status: 400 })
  }

  const { name, email } = reqBody

  if (!name && !email) {
    return NextResponse.json(
      { message: 'Name and email are required' },
      { status: 400 }
    )
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      email
    }
  })

  return NextResponse.json(
    { message: 'User updated', updatedUser },
    { status: 200 }
  )
}

// DELETE /api/users/[id]
export async function DELETE(req: NextRequest) {
  const {
    nextUrl: { pathname }
  } = req
  const id = pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'No ID provided' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) }
  })

  return NextResponse.json(
    { message: 'User deleted', deletedUser },
    { status: 200 }
  )
}
