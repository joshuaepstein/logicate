import { cn } from "@logicate/ui";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-neutralgrey-1200/10 dark:bg-neutralgrey-100/10 animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
