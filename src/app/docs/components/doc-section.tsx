import { cn } from "@/lib"
import React from "react"

const DocSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mt-doc-section mt-12 flex flex-col text-[0.9375rem] leading-[1.75rem]", className)}
      aria-description="documentation-section"
      {...props}
    />
  )
})

DocSection.displayName = "DocSection"

export default DocSection
