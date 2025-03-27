"use client"

import React, { useState } from 'react'
import LoginForm from '@/app/login/LoginForm'
import { setAuthToken } from '@/lib/utils'
import { login, refreshToken } from '@/lib/api'
import { useRouter } from 'next/navigation'
import withAuthCheck from '@/hoc/withAuthCheck'

const loginWithPassword = async (password: string): Promise<{ accessToken: string }> => {
  await login(password)
  return await refreshToken()
}

function LoginPage() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleLogin = async (password: string): Promise<void> => {
    setIsPending(true)

    try {
      const res = await loginWithPassword(password)
      setAuthToken(res.accessToken)
      router.push('/')
    } catch (error) {
      console.error(error)
      debugger // TODO later: show error messagea
    } finally {
      setIsPending(false)
    }
  }

  if (isPending) {
    return (
      <p className="text-center text-gray-500">Loading...</p>
    )
  }

  return (
    <LoginForm onSubmit={handleLogin} />
  )
}

export default withAuthCheck(LoginPage, false, '/')
