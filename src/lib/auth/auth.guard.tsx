import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from './auth.store'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export default function AuthGuard({ children }: AuthenticatedLayoutProps) {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.accessToken)

  const expired = user?.exp ? Date.now() > user.exp : true

  const authRoutes = ['/sign-in', '/sign-up']

  if (!token || !user || expired) {
    return <Navigate to='/sign-in' replace />
  }

  if (token && user && authRoutes.includes(location.pathname)) {
    return <Navigate to='/' replace />
  }

  return children ?? <Outlet />
}
