import '@/styles/global.css'
import '@logicate/ui/styles'

import { Footer } from '@/components/footer'
import Navbar from '@/components/navbar'
import { cn } from '@logicate/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Providers from './providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.variable, GeistMono.variable)}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
