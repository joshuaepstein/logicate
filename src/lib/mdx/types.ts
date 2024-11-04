export type LegalMetadata = {
  title: string
  updatedAt: string
}

export type LegalDocument = {
  slug: string
  metadata: LegalMetadata
  content: string
}
