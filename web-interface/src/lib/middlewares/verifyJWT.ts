import type { NextRequest } from 'next/server'
import { decodeJwtToken, JwtTokenPayload, parseBearerToJwt } from '../jwt'
import { headers } from 'next/headers'

export const verifyJWT = (handler: (req: NextRequest) => Promise<Response>) => {
  return async (req: NextRequest) => {
    const headersList = await headers()
    const authorization = headersList.get('authorization')

    let actualToken: ReturnType<typeof parseBearerToJwt> | null = null

    try {
      actualToken = parseBearerToJwt(authorization)
    } catch (error) {
      if (error instanceof Error) {
        const expectedErrors = ['Invalid token format']

        if (expectedErrors.includes(error.message)) {
          return new Response(JSON.stringify({ message: 'Invalid or missing token' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }

      throw error
    }

    let userData: JwtTokenPayload | null = null

    try {
      userData = decodeJwtToken(actualToken)
    } catch (error) {
      if (error instanceof Error) {
        const forwardableErrors = ['Invalid token']

        const message = forwardableErrors.includes(error.message)
          ? error.message
          : 'Invalid or missing token'

        return new Response(JSON.stringify({ message }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      return new Response('', {
        status: 500,
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
