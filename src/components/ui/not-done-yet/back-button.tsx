"use client"

import { cn } from "@/lib"
import { ChevronLeftIcon } from "@jfstech/icons-react/24/outline"
import { ClassValue } from "clsx"
import { useRouter } from "next/navigation"

export function BackButton({ onClick, className }: { onClick?: () => void; className?: ClassValue | ClassValue[] }) {
  const router = useRouter()

  return (
    <div
      className={cn(
        "group flex w-max cursor-pointer items-center justify-center space-x-3 rounded-lg px-4 py-2 hover:bg-neutralgrey-200 dark:hover:bg-neutralgrey-1200",
        className
      )}
      onClick={() => {
        if (onClick) {
          onClick()
        } else {
          router.back()
        }
      }}
    >
      <ChevronLeftIcon className="size-4 text-neutralgrey-900 dark:text-neutralgrey-700 group-hover:dark:text-neutralgrey-500" />
      <p className="text-sm font-medium text-neutralgrey-900 dark:text-neutralgrey-700 group-hover:dark:text-neutralgrey-500">Back</p>
    </div>
  )
}
