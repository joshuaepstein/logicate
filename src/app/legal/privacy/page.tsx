import { getLegalDocuments } from '@/lib/mdx/legal'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalPage from '../components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function LegalPrivacyPage() {
  const document = getLegalDocuments().find((post) => post.slug === 'privacy')
  if (!document) notFound()

  return <LegalPage document={document} />
}
