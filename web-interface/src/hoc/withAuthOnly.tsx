import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const withAuthOnly = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
  return (props: T) => {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    if (!isAuthenticated) {
      router.push('/login')
      return null
    }

    return (
      <div data-testid="auth-only-wrapper">
        <WrappedComponent {...props} />
      </div>
    )
  }
}

export default withAuthOnly
