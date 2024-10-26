import { cn } from "@/lib"
import React from "react"

const DocList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("text-is-section-member mt-4 list-inside list-disc", className)} {...props} />
))
DocList.displayName = "DocList"

const DocListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
DocListItem.displayName = "DocListItem"

export { DocList, DocListItem }
