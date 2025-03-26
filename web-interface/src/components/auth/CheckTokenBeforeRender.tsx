'use client'

import { startTransition, useActionState, useEffect } from "react"
import LoginController from "./LoginController"
import { getMe } from "@/lib/api"
import { removeAuthToken } from "@/lib/utils"

interface AuthStatusFetcherProps {
  children: React.ReactNode
}

export default function AuthStatusFetcher({ children }: AuthStatusFetcherProps) {
  const [_authState, fetchAuthState, isPending] = useActionState(async () => {
    try {
      await getMe()
    } catch (err) {
      // @ts-ignore
      if (err?.status === 401) {
        removeAuthToken()
      }
    }
  }, null)

  const actions = {
    fetchAuthState: () => startTransition(() => fetchAuthState())
  }

  useEffect(() => {
    actions.fetchAuthState()
  }, [])

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h2 className="text-2xl font-semibold whitespace-nowrap">
          Loading...
        </h2>
      </div>
    )
  }

  return (
    <>
      <LoginController>
        {children}
      </LoginController>
    </>
  )
}
