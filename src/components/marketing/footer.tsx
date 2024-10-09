'use client'

import { hiddenLayoutPages } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoIcon from '../Logo'

export const Footer: React.FC = () => {
  const pathname = usePathname()

  if (
    hiddenLayoutPages.some((page) => {
      let path: string = page.replace('%s', '')
      return pathname.startsWith(path)
    })
  ) {
    return null
  }

  return (
    <footer className="border-t-neutralgrey-500 w-full border-t py-8">
      <div className="container items-start">
        <LogoIcon className="h-8 text-[#a3a7b5]" />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-neutralgrey-1100/80 text-sm">&copy; 2024 Logicate. All rights reserved.</p>
          <p className="text-neutralgrey-1100/80 text-sm">
            Created by{' '}
            <Link className="text-neutralgrey-1300 hover:text-neutralgrey-1200 font-[450] hover:underline" href="https://joshepstein.co.uk">
              Joshua Epstein
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
