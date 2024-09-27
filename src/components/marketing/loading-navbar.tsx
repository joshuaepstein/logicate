'use client'

import { AppContext } from '@/app/providers'
import Kbd from '@/components/ui/kbd'
import { useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LoadingCircle from '../ui/icons/loading-circle'

export default function LoadingNavbar() {
  const { setShowCMDK } = useContext(AppContext)
  useHotkeys('l', () => {
    redirect('/login')
  })

  return (
    <>
      <nav className="container flex h-16 items-center justify-between border-b border-b-neutral-500">
        <p className="font-medium">Logicate</p>
        <div className="flex items-center gap-4">
          <div className="flex items-stretch justify-end gap-4">
            <div
              className="bg-neutralgrey-200 flex h-8 w-36 cursor-pointer select-none items-center justify-between rounded-md px-2"
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
            <div className="bg-neutralgrey-200 group flex items-center justify-center gap-2 rounded-md px-2 py-1 transition">
              <span className="text-neutralgrey-1000 group-hover:text-neutralgrey-1200 text-sm transition">Loading</span> <LoadingCircle />
            </div>
            <div className="bg-neutralgrey-1100 hover:bg-neutralgrey-1300 group flex items-center justify-center gap-2 rounded-md px-2 py-1 transition">
              <span className="text-neutralgrey-100 text-sm transition">Loading</span> <LoadingCircle />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
