import type { NextRequest } from 'next/server'
import { decodeJwtToken, JwtTokenPayload, parseBearerToJwt } from '../jwt'
import { headers } from 'next/headers'

export const verifyJWT = (handler: (req: NextRequest) => Promise<Response>) => {
  return async (req: NextRequest) => {
    const headersList = await headers()
    const authorization = headersList.get('authorization')

    const actualToken = parseBearerToJwt(authorization)

    let userData: JwtTokenPayload | null = null

    try {
      userData = decodeJwtToken(actualToken)
    } catch (error) {
      console.error('Error verifying token:', error)
      return new Response(JSON.stringify({ message: 'Invalid or missing token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!userData) {
      return new Response(JSON.stringify({ message: 'Invalid or missing token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return handler(req)
  }
}
