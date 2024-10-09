import { Footer } from '@/components/marketing/footer'
import LoadingNavbar from '@/components/marketing/loading-navbar'
import Navbar from '@/components/marketing/navbar'
import { Container } from '@/components/ui/not-done-yet/container'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container>{children}</Container>
    </>
  )
}
