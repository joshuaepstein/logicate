'use client'

import useCMDK from '@/components/marketing/cmdk'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Analytics } from '@vercel/analytics/react'
import { createContext, Dispatch, ReactNode, SetStateAction } from 'react'
export const AppContext = createContext<{
  setShowCMDK: Dispatch<SetStateAction<boolean>>
}>({
  setShowCMDK: () => {},
})

export default function Providers({ children }: { children: ReactNode }) {
  const { CMDK, setShowCMDK } = useCMDK()

  return (
    <>
      <AppContext.Provider
        value={{
          setShowCMDK,
        }}
      >
        <TooltipProvider>
          <CMDK />
          {children}
          <Toaster richColors position="top-right" />
        </TooltipProvider>
        <Analytics />
      </AppContext.Provider>
    </>
  )
}
