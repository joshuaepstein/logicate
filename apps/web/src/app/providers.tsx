'use client'

import { Toaster } from '@logicate/ui/sonner'
import { TooltipProvider } from '@logicate/ui/tooltip'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <TooltipProvider>
        {children}
        <Toaster richColors position="top-right" />
      </TooltipProvider>
    </>
  )
}
