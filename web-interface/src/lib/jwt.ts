import jwt from 'jsonwebtoken'

interface JwtTokenCreationPayload {
  sub: 'user';
  [key: string]: any;
}

export type JwtTokenPayload = JwtTokenCreationPayload & {
  exp: number
  iat: number
}

export const createJwtToken = (payload: JwtTokenCreationPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export const decodeJwtToken = (token: string): JwtTokenPayload => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET) as JwtTokenPayload
  } catch (error) {
    console.error('Invalid token error', error)
    throw new Error('Invalid token')
  }
}

export const parseBearerToJwt = (bearer: string | any): string => {
  console.log('bearer', bearer)

  if (!bearer || typeof bearer !== 'string')
    throw new Error('Invalid token format')

  const parts = bearer.split(' ')

  if (parts.length !== 2 || parts[0] !== 'Bearer')
    throw new Error('Invalid token format')

  return parts[1]
}