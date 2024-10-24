import { cn } from '@/lib'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import React from 'react'
import slugify from 'slugify'
import { highlight } from 'sugar-high'
import Link from './ui/link'

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image {...props} className="rounded-lg" />
}

// @ts-ignore
function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

type TableData = {
  headers: string[]
  rows: string[][]
}

type TableProps = {
  data: TableData
}

function Table({ data }: TableProps) {
  let headers = data.headers.map((header, index) => <th key={index}>{header}</th>)
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

type HeadingProps = {
  children: string
}

function createHeading(level: number) {
  return ({ children }: HeadingProps) => {
    let slug = slugify(children)
    const id = children
      .toLowerCase()
      .replace(/^\d+\.\s/, '')
      .replace(/ /g, '-')
      .trim()
    return React.createElement(
      `h${level}`,
      { id },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  code: Code,
  Table,
  RoundedImage,
  a: Link,
  Link,
}

// @ts-ignore
export default function MdxWrapper(props) {
  return (
    <article
      data-mdx-container
      className={cn(
        'prose prose-zinc dark:prose-invert prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-semibold prose-p:text-base max-w-none transition-all'
      )}
    >
      <MDXRemote source={props.source} components={{ ...components, ...(props.components || {}) }} />
    </article>
  )
}
