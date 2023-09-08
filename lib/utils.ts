import { NextResponse } from 'next/server'

export function MakeSerializable<T extends any>(o: T): T {
  if (typeof o !== 'object' || o === null) {
    throw new Error('Invalid input object. It must be a serializable object.')
  }

  return JSON.parse(JSON.stringify(o))
}

export function ResponseJSON<T extends any>(
  o: T,
  status: number
): NextResponse {
  try {
    const serializedData = JSON.stringify(MakeSerializable(o))
    return new NextResponse(serializedData, { status })
  } catch (error) {
    return new NextResponse('Error occurred while processing the request', {
      status: 500
    })
  }
}
