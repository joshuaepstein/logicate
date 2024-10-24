import MdxWrapper from '@/components/mdx-wrapper'
import { cn } from '@/lib'
import { LegalMetadata } from '@/lib/mdx/types'
import Link from 'next/link'

export default function LegalPage({
  document,
}: {
  document: {
    metadata: Partial<LegalMetadata>
    content: string
    slug: string
  }
}) {
  const getTableOfContents = () => {
    const headings = document.content.match(/#+ (.*)/g)
    return headings || []
  }

  return (
    <div className="flex flex-col justify-start gap-12 md:flex-row md:py-16">
      <div className="mt-8 h-max w-full px-6 md:sticky md:top-16 md:mt-0 md:flex md:w-1/3 md:flex-col md:px-0">
        <h1 className="text-4xl font-semibold leading-[1.15] md:text-right">{document.metadata.title}</h1>
        <ul className="mt-16 flex h-max list-none flex-col gap-1 md:text-right">
          {getTableOfContents().map((heading) => {
            const text = heading.replace(/^#+ /, '')
            const id = text
              .toLowerCase()
              .replace(/^\d+\.\s/, '')
              .replace(/ /g, '-')
              .trim()
            return (
              <li key={id} className={cn('hover:underline')}>
                <Link href={`#${id}`}>
                  {text.includes('. ') ? (
                    <>
                      <span className="text-neutralgrey-800">{text.split('. ')[0]}. </span>
                      {text.split('. ')[1]}
                    </>
                  ) : (
                    text
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col justify-start px-6 pb-6 md:max-w-[66.66666666666666%] md:grow md:pl-0 md:pr-24">
        <MdxWrapper source={document.content} />
      </div>
    </div>
  )
}
