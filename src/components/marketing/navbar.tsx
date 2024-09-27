import { Suspense } from 'react'
import { getSession } from '@/lib/auth/utils'
import LoadingNavbar from './loading-navbar'
import ClientNavbar from './client-navbar'

export default async function Navbar() {
  const session = await getSession()

  if (!session) return <LoadingNavbar />

  console.log(session)

  return <ClientNavbar user={session.user} publicDisplay={session.publicDisplay} />
}
