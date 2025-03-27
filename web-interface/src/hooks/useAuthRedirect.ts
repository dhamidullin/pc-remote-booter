import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const useAuthRedirect = (redirectTo: string, when: 'when-unauthed' | 'when-authed'): boolean => {
  const router = useRouter()
  const authContext = useAuth()
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    if (!authContext.loading) {
      if ((when === 'when-authed' && authContext.isAuthenticated) || (when === 'when-unauthed' && !authContext.isAuthenticated)) {
        router.push(redirectTo)
      } else {
        setCanRender(true)
      }
    }
  }, [router, authContext.loading, authContext.isAuthenticated, redirectTo, when])

  return canRender
}

export default useAuthRedirect
