import { getLegalDocuments } from '@/lib/mdx/legal'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalPage from '../components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

export default function LegalTosPage() {
  const document = getLegalDocuments().find((post) => post.slug === 'terms-of-service')
  if (!document) notFound()

  return <LegalPage document={document} />
}
