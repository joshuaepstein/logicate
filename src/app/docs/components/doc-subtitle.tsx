import { cn } from "@/lib"
import React from "react"

const DocSubtitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={cn("text-neutralgrey-900 mt-1 text-xs", className)} {...props} />
})

DocSubtitle.displayName = "DocSubtitle"

export default DocSubtitle
