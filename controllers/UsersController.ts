import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import catchAsyncErrors from '@/middlewares/catchAsyncErrors'

const getAllUsers = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await prisma.user.findMany()

    if (!users) {
      return res.status(404).json({
        success: false,
        error: 'No users found'
      })
    }

    res.status(200).json({ success: true, data: users })
  }
)

const createUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email } = req.body

    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })

    res.status(201).json({ success: true, data: user })
  }
)

const updateUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const { name, email } = req.body

    const user = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        email
      }
    })

    res.status(200).json({ success: true, data: user })
  }
)

const deleteUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })

    res.status(200).json({ success: true, data: {} })
  }
)

const getUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    res.status(200).json({ success: true, data: user })
  }
)

export { getAllUsers, createUser, updateUser, deleteUser, getUser }
