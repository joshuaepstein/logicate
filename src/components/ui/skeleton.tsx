import { cn } from "@/lib"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-neutralgrey-1200/10 dark:bg-neutralgrey-100/10", className)} {...props} />
}

export { Skeleton }
