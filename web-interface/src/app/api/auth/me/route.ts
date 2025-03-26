import { NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/middlewares/verifyJWT'

async function handler() {
  return NextResponse.json({ success: true })
}

export const GET = verifyJWT(handler)
