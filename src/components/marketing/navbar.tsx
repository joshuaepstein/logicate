import { Suspense, use } from 'react'
import { getSession } from '@/lib/auth/utils'
import LoadingNavbar from './loading-navbar'
import ClientNavbar from './client-navbar'

export default function Navbar() {
  const session = use(getSession())

  if (!session) return <LoadingNavbar />

  return (
    <Suspense fallback={<LoadingNavbar />}>
      <ClientNavbar user={session.user} />
    </Suspense>
  )
}
