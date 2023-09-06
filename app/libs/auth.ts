import prisma from '@/app/libs/prisma'
import { compare } from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

type User = {
  id: string
  email: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !compare(credentials.password, user.password as string)) {
          return null
        }

        const userResult: User = {
          id: Number(user.id).toString(),
          email: user.email
        }

        return userResult
      }
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        }
      }
    },
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id
        }
      }
      return token
    }
  }
}
