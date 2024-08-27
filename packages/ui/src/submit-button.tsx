"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./button";
import LoadingCircle from "./icons/loading-circle";
import { cn } from "./lib/utils";

export function SubmitButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} {...props} className={cn("relative", className)}>
      <span className={cn({ "opacity-0": pending })}>{children}</span>

      {pending && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingCircle className="size-5" />
        </div>
      )}
    </Button>
  );
}
