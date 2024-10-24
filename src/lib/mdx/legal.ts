import fs from 'fs'
import path from 'path'
import { LegalMetadata } from './types'
import { getMDXFiles } from './utils'

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<LegalMetadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(':')
    let value = valueArr.join(':').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes

    metadata[key.trim() as keyof LegalMetadata] = value as string
  })

  return { metadata, content }
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))
    return {
      metadata,
      content,
      slug,
    }
  })
}

export function getLegalDocuments() {
  return getMDXData(path.join(process.cwd(), 'src', 'content', 'legal'))
}
