import { refreshToken } from '@/lib/api'
import { setAuthToken } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import React, { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react'
import ms from 'ms'

interface AuthContextInterface {
  isAuthenticated: boolean
  handleAuthState: () => Promise<void>
}

const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  handleAuthState: async () => { }
})

const refreshAndSetToken = async (): Promise<void> => {
  const res = await refreshToken()
  setAuthToken(res.accessToken) // set refreshed jwt token to the local storage
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const tokenRefreshInterval = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // triues to call a token refresh endpoint to initialize the auth state of the app
  const handleAuthState = async () => {
    try {
      await refreshAndSetToken()
      setIsAuthenticated(true)
    } catch (err) {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleAuthState()
  }, [])

  useEffect(() => {
    if (loading) return

    if (isAuthenticated && pathname === '/login') {
      console.log('pushing to /')
      router.push('/')
    }

    if (!isAuthenticated && pathname === '/') {
      console.log('pushing to /login')
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  // start/stop token refresh every minute
  useEffect(() => {
    if (tokenRefreshInterval.current) {
      clearInterval(tokenRefreshInterval.current)
      tokenRefreshInterval.current = null
    }

    if (isAuthenticated) {
      tokenRefreshInterval.current = setInterval(refreshAndSetToken, ms('1 minute'))

      return () => {
        if (tokenRefreshInterval.current) {
          clearInterval(tokenRefreshInterval.current)
          tokenRefreshInterval.current = null
        }
      }
    }
  }, [loading, isAuthenticated])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext<AuthContextInterface>(AuthContext)

export default AuthContext