import { NextResponse } from 'next/server'
import { getHello } from '@/lib/pc-control'

export async function GET() {
  try {
    const message = await getHello()
    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 