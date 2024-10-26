import { cn } from "@/lib"
import React from "react"

const DocSummary = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-neutralgrey-1000 text-sm", className)} {...props} />
})

DocSummary.displayName = "DocSummary"

export default DocSummary
