import prisma from '@/lib/prisma'
import { sendJSON } from '@/lib/util'
import { hash } from 'bcryptjs'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, password } = (await req.json()) as {
    name: string
    email: string
    password: string
  }
  const hashed_password = await hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashed_password
    }
  })

  return sendJSON({ user }, 201)
}
