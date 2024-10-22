'use client'

import { AppContext } from '@/app/providers'
import Kbd from '@/components/ui/kbd'
import { useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { PublicDisplay, User } from '@logicate/database'
import { cn } from '@/lib'
import ProfilePicture from '@/components/ui/profile-picture/client'
import Logo from '@/components/Logo'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { P } from '../ui/typography'
import { signOut } from 'next-auth/react'
import { NewFeature, NewFeatureDateLimit } from '@/lib/features/new'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocalStorage } from 'usehooks-ts'

export default function ClientNavbar({
  user,
}: {
  user: User & {
    publicDisplay: PublicDisplay
  }
}) {
  const pathname = usePathname()
  const router = useRouter()
  // const [isInsightsNewFeatureEnabled, setIsInsightsNewFeatureEnabled, newFeature] = useNewFeatureState(NewFeature.INSIGHTS, true)
  const [hiddenInsights] = useLocalStorage('hiddenInsights-navbar', false)
  const { setShowCMDK } = useContext(AppContext)
  useHotkeys('l', () => {
    // redirect('/login')
    router.push('/login')
  })

  // useEffect(() => {
  //   return () => {
  //     if (!isInsightsNewFeatureEnabled) {
  //       setIsInsightsNewFeatureEnabled(true)
  //     }
  //   }
  // }, [pathname, isInsightsNewFeatureEnabled, setIsInsightsNewFeatureEnabled])

  return (
    <navigation-header>
      <nav className="container flex h-16 items-center justify-between border-b border-b-neutral-500">
        <Link href="/">
          <Logo className="h-8 transition hover:scale-105 active:scale-95" />
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex items-center justify-start gap-4">
            <li className="text-neutralgrey-1200 text-xs font-[450]">
              <Link href="/canvas">Your Canvases</Link>
            </li>
            {/* {new Date() > NewFeatureDateLimit[NewFeature.INSIGHTS] ? (
              <li className="text-neutralgrey-1200 text-xs font-[450]">
                <Link href="/insights">Insights</Link>
              </li>
            ) : (
              // Start: Animating the width from 0 to 100% - then opacity each letter from 0 to 1 with spread and delay of 0.05 per character
              <motion.li
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                exit={{ width: 'auto' }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                <motion.a href="/insights" className="text-xs font-[450] text-blue-800">
                  {'Insights'.split('').map((letter, index) => {
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.05 + 0.05 * index }}
                        exit={{ opacity: 1 }}
                        className="animate-shimmer"
                        style={
                          {
                            '--index': index,
                          } as CSSProperties
                        }
                      >
                        {letter}
                      </motion.span>
                    )
                  })}
                </motion.a>
              </motion.li>
            )} */}
            <li className="text-neutralgrey-1200 text-xs font-[450]">
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

                <Popover>
                  <PopoverTrigger>
                    <ProfilePicture
                      type="user"
                      className="shadow-hard-xs size-8 rounded-md bg-contain bg-center bg-no-repeat"
                      user={user}
                    />
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="end" className="w-max min-w-0">
                    <P className="!mt-0 mb-2 font-medium">{user.name}</P>
                    <button
                      onClick={() => {
                        signOut()
                      }}
                      className={cn(
                        'bg-neutralgrey-1100 text-neutralgrey-400 hover:bg-neutralgrey-1000 hover:text-neutralgrey-300 mt-1.5 w-full rounded px-2 py-1 text-left transition duration-150'
                      )}
                    >
                      Logout
                    </button>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {(new Date() <= NewFeatureDateLimit[NewFeature.INSIGHTS] && !hiddenInsights) || true ? (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
            className="animated-new-background sticky top-0 z-[123] flex items-center justify-center overflow-hidden backdrop-blur-[6px]"
          >
            <div className="text-neutralgrey-1200 py-2 text-xs font-medium">
              {/* Introducing Insights! <span className="ml-1 hue-rotate-180">🧠</span>{' '} */}
              This web application is currently in development. There are bugs and unfinished features.
              {/* <Link
                href="/insights"
                className="group ml-1 inline-flex items-center underline opacity-75 transition-opacity hover:opacity-100"
              >
                Click here to learn more <ExpandingArrow className="size-4" />
              </Link> */}
            </div>
            {/* <button
              className="group absolute right-4 rounded-md bg-black/5 p-1 transition hover:bg-black/10"
              onClick={() => setHiddenInsights(true)}
            >
              <X02Icon className="group-hover:text-neutralgrey-1300 text-neutralgrey-1000 size-4 transition" />
            </button> */}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </navigation-header>
  )
}
