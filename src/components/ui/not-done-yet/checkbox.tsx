"use client"

import { Check01Icon as CheckIcon } from "@jfstech/icons-react/24/outline"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as React from "react"

import { cn } from "@/lib"
import { DashIcon } from "@radix-ui/react-icons"
import { VariantProps, cva } from "class-variance-authority"

// data-[state=checked] is a hack to style the checked state
const checkboxVariants = cva("flex appearance-none items-center justify-center outline-none transition duration-300 focus-visible:ring-0", {
  variants: {
    size: {
      xs: "size-[14px]",
      sm: "size-4",
      md: "size-[18px]",
      lg: "size-5",
    },
    variant: {
      default:
        "data-[state=checked]:ring-blue-[#618DF2] data-[state=indeterminate]:ring-blue-[#618DF2] rounded-[4px] border-2 border-neutralgrey-600 text-white data-[state=checked]:border-blue-900 data-[state=indeterminate]:border-blue-900 data-[state=checked]:bg-blue-900 data-[state=indeterminate]:bg-blue-900 hover:border-blue-700 data-[state=checked]:hover:border-blue-1000 data-[state=indeterminate]:hover:border-blue-1000 data-[state=checked]:hover:bg-blue-1000 data-[state=indeterminate]:hover:bg-blue-1000 focus-visible:border-neutralgrey-600 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-1 data-[state=checked]:focus-visible:ring-2 data-[state=indeterminate]:focus-visible:ring-2 disabled:opacity-50",
      alt: "hover:shadow-checkbox-hover disabled:shadow-checkbox-disabled data-[state=checked]:shadow-checkbox-active data-[state=indeterminate]:shadow-checkbox-active rounded-[4px] p-0 text-white shadow-checkbox-default data-[state=checked]:bg-blue-900 data-[state=indeterminate]:bg-blue-900 hover:data-[state=checked]:bg-blue-1000 hover:data-[state=indeterminate]:bg-blue-1000 focus-visible:shadow-checkbox-default focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
})

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size, variant, checked, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root ref={ref} checked={checked} className={cn(checkboxVariants({ size, variant, className }))} {...props}>
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current", {
            "size-[10px]": size === "xs" || size === "sm",
            "size-[12px]": size === "md" || size === "lg",
          })}
        >
          {checked !== "indeterminate" ? <CheckIcon className={cn({})} /> : <DashIcon className={cn({})} />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
