import { cn } from "@/lib"
import React from "react"

const Documentation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-col", className)} {...props} />
})

Documentation.displayName = "Documentation"

export default Documentation
