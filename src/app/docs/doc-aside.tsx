"use client"

import { capitaliseEachWord, cn } from "@/lib"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useState } from "react"
import { ALL_DOCS, CATEGORIES_TO_DATA } from "./docs"

export default function DocAside() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const pathname = usePathname()
  const categories = ALL_DOCS.reduce((acc, doc) => {
    if (!acc.includes(doc.path.split("/")[0])) {
      acc.push(doc.path.split("/")[0])
    }
    return acc
  }, [] as string[])

  const getCategoryDocs = (category: string) => {
    return ALL_DOCS.filter((doc) => doc.path.split("/")[0] === category)
  }

  const selectedDoc = ALL_DOCS.find((doc) => doc.path === pathname.replace("/docs/", ""))
  const selectedDocCategory = selectedDoc?.path.split("/")[0]

  return (
    <aside className="flex w-full max-w-[200px] flex-col items-start justify-start text-left">
      <p className="text-lg font-medium">Docs</p>
      <ul className="mt-2 flex w-full flex-col gap-2">
        {categories.map((category, index) => {
          const categoryData = CATEGORIES_TO_DATA.find((c) => c.category === category)
          const Icon = categoryData?.icon
          return (
            <Fragment key={"category-" + index}>
              <li className="relative">
                <button
                  type="button"
                  className="group/item hover:before:bg-neutralgrey-100 hover:text-neutralgrey-1100 relative isolate flex w-full items-center gap-x-2 px-2 py-[0.4375rem] text-left transition-colors before:absolute before:inset-x-0 before:inset-y-[0.0625rem] before:-z-10 before:rounded-md before:transition-colors"
                  aria-expanded={expandedCategories.includes(category)}
                  aria-controls={`nav-:${category}:`}
                  onClick={() => {
                    setExpandedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
                  }}
                >
                  {Icon && <Icon className="text-neutralgrey-600 size-5 flex-none transition-colors" />}
                  {capitaliseEachWord(categoryData?.displayName || "") || category}
                  <svg
                    aria-hidden={!expandedCategories.includes(category)}
                    viewBox="0 0 16 16"
                    fill="none"
                    className={cn("stroke-neutralgrey-600 ml-auto mt-0.5 size-4 flex-none transition-transform", {
                      "-rotate-90": !expandedCategories.includes(category),
                    })}
                  >
                    <path d="M4.75 6.75L8 10.25L11.25 6.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
              </li>

              {expandedCategories.includes(category) && (
                <ul role="list" id={`nav-${category}-items`}>
                  {getCategoryDocs(category).map((doc, index) => (
                    <li
                      key={"doc-" + index}
                      className={cn(
                        "before:bg-neutralgrey-1200/10 dark:before:bg-neutralgrey-1100 relative before:pointer-events-none before:absolute before:bottom-0 before:left-[calc(1.125rem-0.5px)] before:z-10 before:w-px",
                        {
                          "before:top-[calc(7/16*1rem)]": index === 0,
                          "before:top-0": index !== 0,
                          "before:bottom-[calc(7/16*1rem)]": index === getCategoryDocs(category).length - 1,
                        }
                      )}
                      aria-current={pathname.replace("/docs/", "") === doc.path ? "page" : undefined}
                    >
                      <Link
                        aria-current={pathname.replace("/docs/", "") === doc.path ? "page" : undefined}
                        className="group/item hover:before:bg-neutralgrey-100 hover:text-neutralgrey-1200 aria-[current=page]:text-neutralgrey-1200 aria-[current=page]:after:bg-neutralgrey-1200 relative flex items-start gap-x-2 overflow-hidden rounded-md py-[0.3rem] pl-9 pr-2 text-sm transition-colors before:absolute before:inset-x-0 before:inset-y-[0.0625rem] before:-z-10 before:rounded-md before:transition-colors after:absolute after:inset-y-[0.4375rem] after:left-[calc(1.125rem-0.5px)] after:z-10 after:w-px after:transition-colors"
                        href={"/docs/" + doc.path}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Fragment>
          )
        })}
      </ul>
    </aside>
  )
}
