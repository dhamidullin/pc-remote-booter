import { NextResponse } from 'next/server'
import { pingEsp32Booter } from '@/lib/pc-control'
import { verifyJWT } from '@/lib/middlewares/verifyJWT'

async function handler() {
  try {
    const online = await pingEsp32Booter()
    return NextResponse.json({ online })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const GET = verifyJWT(handler) 