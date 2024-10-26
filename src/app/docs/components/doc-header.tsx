import { cn } from "@/lib"
import React from "react"

const DocHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-col gap-y-3", className)} {...props} />
})

DocHeader.displayName = "DocHeader"

export default DocHeader
