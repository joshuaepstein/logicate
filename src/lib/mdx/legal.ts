import fs from "fs"
import path from "path"
import { LegalMetadata } from "./types"
import { getMDXFiles } from "./utils"

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, "").trim()
  const frontMatterLines = frontMatterBlock.trim().split("\n")
  const metadata: Partial<LegalMetadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(":")
    let value = valueArr.join(":").trim()
    value = value.replace(/^['"](.*)['"]$/, "$1") // Remove quotes

    metadata[key.trim() as keyof LegalMetadata] = value as string
  })

  return { metadata, content }
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  const rawContent = fs.readFileSync(filePath, "utf8")
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return {
      metadata,
      content,
      slug,
    }
  })
}

export function getLegalDocuments() {
  return getMDXData(path.join(process.cwd(), "src", "content", "legal"))
}
