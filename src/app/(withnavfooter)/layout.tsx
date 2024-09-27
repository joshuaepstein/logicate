import { Footer } from '@/components/marketing/footer'
import Navbar from '@/components/marketing/navbar'
import { Container } from '@/components/ui/not-done-yet/container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
