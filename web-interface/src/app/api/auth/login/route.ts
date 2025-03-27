import { NextResponse } from 'next/server'
import { createJwtToken } from '@/lib/jwt'
import { createRefreshTokenCookie, createSession, SESSION_TOKEN_COOKIE_NAME } from '@/lib/session'
import ms from 'ms'

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

    const sessionTtl = ms('1 week')
    const refreshToken = createSession(sessionTtl)
    const secure = process.env.NODE_ENV !== 'development' ? 'Secure; ' : ''

    return NextResponse.json({ success: true }, {
      headers: {
        'Set-Cookie': createRefreshTokenCookie(refreshToken)
      }
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
