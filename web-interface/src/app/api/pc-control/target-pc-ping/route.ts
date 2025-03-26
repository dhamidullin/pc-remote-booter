import { NextResponse } from 'next/server'
import { pingPc } from '@/lib/pc-control'
import { verifyJWT } from '@/lib/middlewares/verifyJWT'

async function handler() {
  try {
    const online = await pingPc()
    return NextResponse.json({ online })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const GET = verifyJWT(handler)
