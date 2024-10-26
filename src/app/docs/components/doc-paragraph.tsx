import { cn } from "@/lib"
import React from "react"

const DocParagraph = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-neutralgrey-1200 text-is-section-member", className)}
      {...props}
      aria-description="documentation-paragraph"
    />
  )
})

DocParagraph.displayName = "DocParagraph"

export default DocParagraph
