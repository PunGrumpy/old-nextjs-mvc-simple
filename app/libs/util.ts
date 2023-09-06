import { NextResponse } from 'next/server'

export function makeSerializable<T extends any>(o: T): T {
  return JSON.parse(JSON.stringify(o))
}

export function sendJSON<T extends any>(o: T, status = 200): NextResponse {
  return new NextResponse(JSON.stringify(o), { status })
}
