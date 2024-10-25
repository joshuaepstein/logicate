import * as React from "react"

import { cn } from "@/lib"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // 'shadow-soft-xs border-neutralgrey-400 placeholder:text-neutralgrey-700 focus-visible:ring-neutralgrey-1300 dark:border-neutralgrey-1100 dark:placeholder:text-neutralgrey-600 dark:focus-visible:ring-neutralgrey-500 flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        "box-border flex min-h-[60px] w-min min-w-[300px] gap-2 rounded-lg border border-neutralgrey-500 bg-base-white px-3 text-sm shadow-soft-2xs transition placeholder:text-neutralgrey-900 invalid:border-red-800 invalid:shadow-hard-xs invalid:[border-width:1.5] aria-selected:border-blue-900 aria-selected:shadow-hard-xs aria-selected:[border-width:1.5] data-[debug=disabled]:cursor-not-allowed data-[debug=disabled]:border-neutralgrey-500 data-[debug=error]:border-red-800 data-[debug=focus]:border-neutralgrey-500 data-[debug=hover]:border-neutralgrey-600 data-[debug=selected]:border-blue-900 data-[debug=disabled]:opacity-50 data-[debug=disabled]:shadow-none data-[debug=error]:shadow-hard-xs data-[debug=selected]:shadow-hard-xs data-[debug=focus]:ring-2 data-[debug=focus]:ring-blue-700 data-[debug=focus]:ring-offset-1 data-[debug=error]:[border-width:1.5] data-[debug=selected]:[border-width:1.5] hover:border-neutralgrey-600 focus-visible:border-neutralgrey-500 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
