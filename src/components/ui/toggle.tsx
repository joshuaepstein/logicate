"use client"

import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-neutralgrey-200 data-[state=on]:text-neutralgrey-1200 hover:bg-neutralgrey-200 hover:text-neutralgrey-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutralgrey-1300 disabled:pointer-events-none disabled:opacity-50 dark:data-[state=on]:bg-neutralgrey-1100 dark:data-[state=on]:text-neutralgrey-100 dark:hover:bg-neutralgrey-1100 dark:hover:text-neutralgrey-600 dark:focus-visible:ring-neutralgrey-500",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "shadow-sm border border-neutralgrey-400 bg-transparent hover:bg-neutralgrey-200 hover:text-neutralgrey-1200 dark:border-neutralgrey-1100 dark:hover:bg-neutralgrey-1100 dark:hover:text-neutralgrey-100",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
