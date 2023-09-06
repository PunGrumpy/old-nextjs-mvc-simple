import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/users
export async function GET() {
  const users = await prisma.user.findMany()

  if (!users) {
    return NextResponse.json({ message: 'No users found' }, { status: 404 })
  }

  return NextResponse.json({ message: 'All users', users }, { status: 200 })
}

// POST /api/users
export async function POST(req: NextRequest) {
  const reqBody: { name: string; email: string } = await req.json()

  if (!reqBody) {
    return NextResponse.json({ message: 'No data sent' }, { status: 400 })
  }

  const { name, email } = reqBody

  if (!name || !email) {
    return NextResponse.json(
      { message: 'Name and email are required' },
      { status: 400 }
    )
  }

  const userExists = await prisma.user.findUnique({
    where: { email }
  })

  if (userExists) {
    return NextResponse.json(
      { message: 'User with this email already exists' },
      { status: 400 }
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      email
    }
  })

  return NextResponse.json({ message: 'User created', user }, { status: 201 })
}
