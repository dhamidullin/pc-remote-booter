'use client'

import React, { ReactNode, startTransition, useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import { getAuthToken, setAuthToken } from '@/lib/utils'
import { login } from '@/lib/api'

interface LoginControllerProps {
  children: ReactNode
}

export default function LoginController({ children }: LoginControllerProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    startTransition(() => {
      const token = getAuthToken()

      setIsLoading(false)
      setIsLoggedIn(!!token)
    })
  }, [])

  const loginHandler = (password: string) => startTransition(async () => {
    setIsLoading(true)

    await login(password)
      .then((res) => {
        setAuthToken(res.access_token)
        setIsLoggedIn(true)
      })
      .catch(err => {
        // @ts-ignore
        alert(err?.message || 'An error occurred')
      })
      .finally(() => {
        setIsLoading(false)
      })
  })

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Loading...</p>
    )
  }

  if (isLoggedIn) {
    return (
      <>
        {children}
      </>
    )
  }

  return <LoginForm onSubmit={loginHandler} />
}
