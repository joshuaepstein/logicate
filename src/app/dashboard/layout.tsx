import { Container } from '@/components/ui/not-done-yet/container'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>
}
