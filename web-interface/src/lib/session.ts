import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import crypto from 'crypto'

const SESSION_DIR_NAME = 'net-control-sessions'

// Get the path to the temporary directory
const tempDir = os.tmpdir()

// Create the full path to the session directory
const sessionDir = path.join(tempDir, SESSION_DIR_NAME)

// Ensure the session directory exists
if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir)
}

// Function to create a session
export function createSession(ttl: number): string {
  const refreshToken = crypto.randomBytes(32).toString('hex')
  const sessionCreatedAt = new Date()
  const refreshTokenValidUntil = new Date(sessionCreatedAt.getTime() + ttl)

  const sessionData = {
    sessionCreatedAt: sessionCreatedAt.toISOString(),
    refreshTokenValidUntil: refreshTokenValidUntil.toISOString(),
  }

  const sessionFilePath = path.join(sessionDir, `${refreshToken}.json`)
  fs.writeFileSync(sessionFilePath, JSON.stringify(sessionData))

  return refreshToken
}

// Function to update a session
export function updateSession(oldRefreshToken: string, ttl: number): string {
  const oldSessionFilePath = path.join(sessionDir, `${oldRefreshToken}.json`)

  if (fs.existsSync(oldSessionFilePath)) {
    const sessionData = JSON.parse(fs.readFileSync(oldSessionFilePath, 'utf-8'))
    const sessionCreatedAt = new Date(sessionData.sessionCreatedAt)
    const refreshToken = crypto.randomBytes(32).toString('hex')
    const refreshTokenValidUntil = new Date(Date.now() + ttl)

    const newSessionData = {
      sessionCreatedAt: sessionCreatedAt.toISOString(),
      refreshTokenValidUntil: refreshTokenValidUntil.toISOString(),
    }

    const newSessionFilePath = path.join(sessionDir, `${refreshToken}.json`)
    fs.writeFileSync(newSessionFilePath, JSON.stringify(newSessionData))

    // Remove the old session file
    fs.unlinkSync(oldSessionFilePath)

    return refreshToken
  } else {
    throw new Error('Old session not found')
  }
}

export const SESSION_TOKEN_COOKIE_NAME = 'net-control-session-refresh-token'

// Function to create a cookie string from a refresh token
export function createRefreshTokenCookie(refreshToken: string): string {
  const secure = process.env.NODE_ENV !== 'development' ? 'Secure; ' : '';
  return `${SESSION_TOKEN_COOKIE_NAME}=${refreshToken}; HttpOnly; ${secure}Path=/; SameSite=Strict`;
}

// Function to extract the refresh token from cookies
export function getRefreshTokenFromCookies(cookies: string | null): string | null {
  return cookies
    ?.split('; ')
    .find(cookie => cookie.startsWith(`${SESSION_TOKEN_COOKIE_NAME}=`))
    ?.split('=')[1] || null;
}

// Function to verify if a session exists by its ID
export function verifySession(refreshToken: string | null): boolean {
  if (!refreshToken) {
    return false;
  }

  const sessionFilePath = path.join(sessionDir, `${refreshToken}.json`);

  if (fs.existsSync(sessionFilePath)) {
    const sessionData = JSON.parse(fs.readFileSync(sessionFilePath, 'utf-8'));
    const refreshTokenValidUntil = new Date(sessionData.refreshTokenValidUntil);

    return refreshTokenValidUntil > new Date();
  }

  return false;
}
