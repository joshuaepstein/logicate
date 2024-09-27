import '@/styles/globals.css'
import { cn } from '@/lib'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Providers from './providers'
import Navbar from '@/components/marketing/navbar'
import { Footer } from '@/components/marketing/footer'
import { Container } from '@/components/ui/not-done-yet/container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.className, GeistMono.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
