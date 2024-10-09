'use client'

import { AppContext } from '@/app/providers'
import Kbd from '@/components/ui/kbd'
import { useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { PublicDisplay, User } from '@logicate/database'
import { cn } from '@/lib'
import ProfilePicture from '@/components/ui/profile-picture/client'
import Logo from '@/components/Logo'

export default function ClientNavbar({
  user,
}: {
  user: User & {
    publicDisplay: PublicDisplay
  }
}) {
  const pathname = usePathname()

  const { setShowCMDK } = useContext(AppContext)
  useHotkeys('l', () => {
    redirect('/login')
  })

  return (
    <>
      <nav className="container flex h-16 items-center justify-between border-b border-b-neutral-500">
        <Link href="/">
          <Logo className="h-8 transition hover:scale-105 active:scale-95" />
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex items-center justify-start gap-4">
            <li
              className="text-sm transition hover:scale-105 active:scale-95"
              style={{
                // make the animation bouncy/spring like
                transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
            >
              <Link href="/changelog">Changelog</Link>
            </li>
          </ul>
          <div className="flex items-stretch justify-end gap-4">
            <div
              className="bg-neutralgrey-200 hidden h-8 w-36 cursor-pointer select-none items-center justify-between rounded-md px-2 md:flex"
              onClick={() => {
                setShowCMDK(true)
              }}
            >
              <p className="text-neutralgrey-1000 text-sm">Search</p>
              <div className="flex items-center gap-1">
                <Kbd variant="ghost" className="bg-neutralgrey-100">
                  ⌘
                </Kbd>
                <Kbd variant="ghost" className="bg-neutralgrey-100">
                  K
                </Kbd>
              </div>
            </div>
            {!user || !user.email ? (
              <>
                <Link
                  href={'/login'}
                  className="bg-neutralgrey-200 group flex items-center justify-center gap-2 rounded-md px-2 py-1 transition"
                >
                  <span className="text-neutralgrey-1000 group-hover:text-neutralgrey-1200 text-sm transition">Log in</span>{' '}
                  <Kbd variant="ghost" className="bg-neutralgrey-100">
                    L
                  </Kbd>
                </Link>
                <Link
                  href={'/register'}
                  className="bg-neutralgrey-1100 hover:bg-neutralgrey-1300 group flex items-center justify-center gap-2 rounded-md px-2 py-1 transition"
                >
                  <span className="text-neutralgrey-100 text-sm transition">Sign up</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={'/dashboard'}
                  className={cn(
                    'group flex items-center justify-center gap-2 rounded-md bg-blue-800 px-2 py-1 text-sm font-medium text-blue-100 transition hover:bg-blue-900',
                    {
                      'bg-neutralgrey-1100 hover:bg-neutralgrey-1300 text-neutralgrey-100': pathname === '/dashboard',
                    }
                  )}
                >
                  Dashboard
                </Link>

                <ProfilePicture type="user" className="shadow-hard-xs size-8 rounded-md bg-contain bg-center bg-no-repeat" user={user} />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
