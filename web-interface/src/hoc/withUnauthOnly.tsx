import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const withUnauthOnly = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
  return (props: T) => {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    if (isAuthenticated) {
      router.push('/')
      return null
    }

    return <div data-testid="unauth-only-wrapper">
      <WrappedComponent {...props} />
    </div>
  }
}

export default withUnauthOnly