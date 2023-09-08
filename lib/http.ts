import { NextResponse } from 'next/server'
import { MakeSerializable } from './utils'

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
