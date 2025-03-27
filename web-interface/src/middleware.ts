import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (request: NextRequest) => {
  return NextResponse.next()
}

export const config = {
  // matcher: '/login',
}
