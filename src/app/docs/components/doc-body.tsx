import { cn } from "@/lib"
import React from "react"

const DocBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-col gap-y-6", className)} {...props} />
})

DocBody.displayName = "DocBody"

export default DocBody
