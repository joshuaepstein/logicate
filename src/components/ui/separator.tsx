"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"

import { cn } from "@/lib"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    forceMode?: "none" | "light" | "dark"
  }
>(({ className, orientation = "horizontal", decorative = true, forceMode = "none", ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-neutralgrey-400 dark:bg-neutralgrey-1100",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      {
        "bg-neutralgrey-400 dark:bg-neutralgrey-1100": forceMode === "none",
        "bg-neutralgrey-400": forceMode === "light",
        "bg-neutralgrey-1100": forceMode === "dark",
      },
      className
    )}
    {...props}
  />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
