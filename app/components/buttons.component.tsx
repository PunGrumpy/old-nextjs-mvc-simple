'use client'

import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { HiLogin, HiLogout, HiUser } from 'react-icons/hi'

export const LoginButton = () => {
  return (
    <button
      className="bg-gray-800 shadow-md hover:shadow-xl hover:scale-110 hover:text-indigo-400 text-indigo-700 py-2 px-4 rounded-md flex items-center space-x-2 transition-transform duration-300 ease-in-out"
      onClick={() => signIn()}
    >
      <HiLogin className="w-5 h-5" />
      <span>Sign In</span>
    </button>
  )
}

export const RegisterButton = () => {
  return (
    <Link
      href="/register"
      className="bg-gray-800 shadow-md hover:shadow-xl hover:scale-110 hover:text-indigo-400 text-indigo-700 py-2 px-4 rounded-md flex items-center space-x-2 transition-transform duration-300 ease-in-out"
    >
      <HiLogin className="w-5 h-5" />
      <span>Register</span>
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <button
      className="bg-gray-800 shadow-md hover:shadow-xl hover:scale-110 hover:text-indigo-400 text-indigo-700 py-2 px-4 rounded-md flex items-center space-x-2 transition-transform duration-300 ease-in-out"
      onClick={() => signOut()}
    >
      <HiLogout className="w-5 h-5" />
      <span>Sign Out</span>
    </button>
  )
}

export const ProfileButton = () => {
  return (
    <Link
      href="/profile"
      className="bg-gray-800 shadow-md hover:shadow-xl hover:scale-110 hover:text-indigo-400 text-indigo-700 py-2 px-4 rounded-md flex items-center space-x-2 transition-transform duration-300 ease-in-out"
    >
      <HiUser className="w-5 h-5" />
      <span>Profile</span>
    </Link>
  )
}
