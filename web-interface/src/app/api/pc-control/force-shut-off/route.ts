import { NextResponse } from 'next/server'
import { forceShutOff } from '@/lib/pc-control'
import { verifyJWT } from '@/lib/middlewares/verifyJWT'

async function handler() {
  try {
    await forceShutOff()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const POST = verifyJWT(handler) 