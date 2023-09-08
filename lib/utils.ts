import { NextResponse } from 'next/server'

export function MakeSerializable<T extends any>(o: T): T {
  if (typeof o !== 'object' || o === null) {
    throw new Error('Invalid input object. It must be a serializable object.')
  }

  return JSON.parse(JSON.stringify(o))
}
