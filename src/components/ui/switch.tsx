"use client"

import * as SwitchPrimitives from "@radix-ui/react-switch"
import * as React from "react"

import { cn } from "@/lib"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "shadow-sm peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-neutralgrey-1200 data-[state=unchecked]:bg-neutralgrey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutralgrey-1300 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:data-[state=checked]:bg-neutralgrey-100 dark:data-[state=unchecked]:bg-neutralgrey-1100 dark:focus-visible:ring-neutralgrey-500 dark:focus-visible:ring-offset-neutralgrey-1300",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "shadow-lg pointer-events-none block h-4 w-4 rounded-full bg-base-white ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 dark:bg-neutralgrey-1300"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
