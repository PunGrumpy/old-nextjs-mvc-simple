import { authOptions } from '@/app/libs/auth'
import { sendJSON } from '@/app/libs/util'
import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return sendJSON({ message: 'No session found' }, 404)
  }

  return sendJSON({ session }, 200)
}
