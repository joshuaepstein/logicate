import { cn } from "@/lib"
import React from "react"

const DocTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => {
  return <h1 ref={ref} className={cn("text-neutralgrey-1300 text-4xl font-semibold", className)} {...props} />
})

DocTitle.displayName = "DocTitle"

export default DocTitle

const DocTitle2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => {
  return <h2 ref={ref} className={cn("text-neutralgrey-1000 text-2xl font-medium", className)} {...props} />
})

DocTitle2.displayName = "DocTitle2"

const DocTitle3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={cn("text-neutralgrey-900 text-xl font-semibold", className)} {...props} />
})

DocTitle3.displayName = "DocTitle3"

export { DocTitle, DocTitle2, DocTitle3 }
