import '@/styles/globals.css'
import { cn } from '@logicate/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Providers from './providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.className, GeistMono.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
