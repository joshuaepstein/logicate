import { cn } from "@/lib"
import React from "react"

export default function LoadingCircle({ className, strokeWidth, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-4 stroke-neutralgrey-800 text-neutralgrey-400", className)}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="50" cy="50.5908" r="40" stroke="currentColor" fill="none" strokeWidth={strokeWidth || "10"} />
      <circle
        cx="50"
        cy="50.5908"
        r="40"
        stroke="currentStroke"
        fill="none"
        strokeWidth={strokeWidth || "10"}
        strokeDasharray="60 180"
        strokeDashoffset={"50"}
        strokeLinecap="round"
        className="animate-strokedashoffset"
      />
    </svg>
  )
}
