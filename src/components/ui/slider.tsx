"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/lib"

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-neutralgrey-1200/20 dark:bg-neutralgrey-100/20">
        <SliderPrimitive.Range className="absolute h-full bg-neutralgrey-1200 dark:bg-neutralgrey-100" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="shadow block size-4 rounded-full border border-neutralgrey-1200/50 border-neutralgrey-400 bg-base-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutralgrey-1300 disabled:pointer-events-none disabled:opacity-50 dark:border-neutralgrey-100/50 dark:border-neutralgrey-1100 dark:bg-neutralgrey-1300 dark:focus-visible:ring-neutralgrey-500" />
    </SliderPrimitive.Root>
  )
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
