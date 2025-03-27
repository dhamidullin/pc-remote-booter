import { createJwtToken } from '@/lib/jwt';
import { createRefreshTokenCookie, SESSION_TOKEN_COOKIE_NAME, updateSession, getRefreshTokenFromCookies } from '@/lib/session'
import ms from 'ms';
import { NextResponse } from 'next/server'

async function handleAccessTokenRefresh(request: Request) {
  const cookies = request.headers.get('cookie');
  const oldRefreshToken = getRefreshTokenFromCookies(cookies);

  if (!oldRefreshToken) {
    return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 });
  }

  const newRefreshToken = updateSession(oldRefreshToken, ms('1 week'))
  const accessToken = createJwtToken({ sub: 'user' })
  const secure = process.env.NODE_ENV !== 'development' ? 'Secure; ' : ''

  return NextResponse.json({ accessToken }, {
    headers: {
      'Set-Cookie': createRefreshTokenCookie(newRefreshToken)
    }
  });
}

export const GET = handleAccessTokenRefresh
