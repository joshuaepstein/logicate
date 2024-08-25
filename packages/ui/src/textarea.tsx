import * as React from "react";

import { cn } from "@logicate/ui";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // 'shadow-soft-xs border-neutralgrey-400 placeholder:text-neutralgrey-700 focus-visible:ring-neutralgrey-1300 dark:border-neutralgrey-1100 dark:placeholder:text-neutralgrey-600 dark:focus-visible:ring-neutralgrey-500 flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          "border-neutralgrey-500 bg-base-white shadow-soft-2xs placeholder:text-neutralgrey-900 invalid:shadow-hard-xs hover:border-neutralgrey-600 focus-visible:border-neutralgrey-500 aria-selected:shadow-hard-xs data-[debug=disabled]:border-neutralgrey-500 data-[debug=focus]:border-neutralgrey-500 data-[debug=hover]:border-neutralgrey-600 data-[debug=error]:shadow-hard-xs data-[debug=selected]:shadow-hard-xs box-border flex min-h-[60px] w-min min-w-[300px] gap-2 rounded-lg border px-3 text-sm transition invalid:border-red-800 invalid:[border-width:1.5] focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 aria-selected:border-blue-900 aria-selected:[border-width:1.5] data-[debug=disabled]:cursor-not-allowed data-[debug=error]:border-red-800 data-[debug=selected]:border-blue-900 data-[debug=disabled]:opacity-50 data-[debug=disabled]:shadow-none data-[debug=focus]:ring-2 data-[debug=focus]:ring-blue-700 data-[debug=focus]:ring-offset-1 data-[debug=error]:[border-width:1.5] data-[debug=selected]:[border-width:1.5]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
