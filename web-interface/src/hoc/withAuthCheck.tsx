'use client'

import React, { useEffect, useState } from 'react'
import { refreshToken } from '@/lib/api'
import { setAuthToken } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import ms from 'ms'

const withAuthCheck = <T extends object>(WrappedComponent: React.ComponentType<T>, expectAuthState: boolean, redirectToOnFail: string) => (props: T) => {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  const getAuthState = async (): Promise<boolean> => {
    try {
      const res = await refreshToken()
      setAuthToken(res.accessToken)
      setShowContent(true)
      return true
    } catch (err) {
      return false
    }
  }

  const handleAuthCheck = async (): Promise<void> => {
    const isAuthenticated = await getAuthState()

    if (isAuthenticated !== expectAuthState) {
      router.push(redirectToOnFail)
    }
  }

  useEffect(() => {
    handleAuthCheck()
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await refreshToken()
      setAuthToken(res.accessToken)
    }, ms('3 minutes'))

    return () => clearInterval(interval)
  }, [showContent])

  if (!showContent) {
    return <div>Loading...</div>
  }

  return <WrappedComponent {...props} />
}

export default withAuthCheck 