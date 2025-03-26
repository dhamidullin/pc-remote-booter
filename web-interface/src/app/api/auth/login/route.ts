import { NextResponse } from 'next/server'
import { createJwtToken } from '@/lib/jwt'

if (!process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD environment variable is not set')
}

const password = process.env.ADMIN_PASSWORD

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password: providedPassword } = body

    if (providedPassword !== password) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    const token = createJwtToken({ sub: 'user' })

    return NextResponse.json({ access_token: token })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
