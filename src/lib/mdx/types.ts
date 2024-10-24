export type LegalMetadata = {
  title: string
  updatedDate: string
}

export type LegalDocument = {
  slug: string
  metadata: LegalMetadata
  content: string
}
