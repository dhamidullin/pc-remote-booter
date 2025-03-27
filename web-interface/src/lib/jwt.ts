import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

interface JwtTokenCreationPayload {
  sub: 'user';
  [key: string]: any;
}

export type JwtTokenPayload = JwtTokenCreationPayload & {
  exp: number
  iat: number
}

export const createJwtToken = (payload: JwtTokenCreationPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' })
}

export const decodeJwtToken = (token: string): JwtTokenPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtTokenPayload
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export const parseBearerToJwt = (bearer: string | any): string => {
  if (!bearer || typeof bearer !== 'string')
    throw new Error('Invalid token format')

  const parts = bearer.split(' ')

  if (parts.length !== 2 || parts[0] !== 'Bearer')
    throw new Error('Invalid token format')

  return parts[1]
}