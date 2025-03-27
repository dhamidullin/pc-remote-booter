'use client'

import React, { useEffect, useRef, useState } from 'react'
import { refreshToken } from '@/lib/api'
import { setAuthToken } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import ms from 'ms'

const refreshAndSetAuthToken = async (): Promise<void> => {
  const res = await refreshToken()
  setAuthToken(res.accessToken)
}

const withAuthCheck = <T extends object>(WrappedComponent: React.ComponentType<T>, expectAuthState: boolean, redirectToOnFail: string) => (props: T) => {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const tokenRefreshInterval = useRef<NodeJS.Timeout | null>(null)

  const getAuthState = async (): Promise<boolean> => {
    try {
      await refreshAndSetAuthToken()

      return true
    } catch (err) {
      return false
    }
  }

  const handleAuthCheck = async (): Promise<void> => {
    const isAuthenticated = await getAuthState()

    if (isAuthenticated !== expectAuthState) {
      router.push(redirectToOnFail)
    } else {
      setShowContent(true)
    }
  }

  useEffect(() => {
    handleAuthCheck()
  }, [])

  useEffect(() => {
    if (tokenRefreshInterval.current) {
      clearInterval(tokenRefreshInterval.current)
      tokenRefreshInterval.current = null
    }

    if (showContent && expectAuthState) {
      tokenRefreshInterval.current = setInterval(refreshAndSetAuthToken, ms('3 minutes'))

      return () => {
        if (tokenRefreshInterval.current) {
          clearInterval(tokenRefreshInterval.current)
          tokenRefreshInterval.current = null
        }
      }
    }
  }, [showContent])

  if (!showContent) {
    return <div>Loading...</div>
  }

  return <WrappedComponent {...props} />
}

export default withAuthCheck 