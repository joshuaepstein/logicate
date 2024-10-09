'use client'

import { Suspense, use } from 'react'
import { getSession } from '@/lib/auth/utils'
import LoadingNavbar from './loading-navbar'
import ClientNavbar from './client-navbar'
import { usePathname } from 'next/navigation'
import { hiddenLayoutPages } from '@/lib/constants'

export default function Navbar({ sessionPromise }: { sessionPromise: ReturnType<typeof getSession> }) {
  const session = use(sessionPromise)
  const pathname = usePathname()

  if (!session) return <LoadingNavbar />
  if (
    hiddenLayoutPages.some((page) => {
      let path: string = page.replace('%s', '')
      return pathname.startsWith(path)
    })
  ) {
    return null
  }

  return (
    <Suspense fallback={<LoadingNavbar />}>
      <ClientNavbar user={session.user} />
    </Suspense>
  )
}
