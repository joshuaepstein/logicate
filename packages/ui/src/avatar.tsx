import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@logicate/ui";
import { PersonIcon } from "@radix-ui/react-icons";

type AvatarSize = "2XL" | "XL" | "L" | "M" | "S" | "XS" | "2XS" | "3XS";

type AvatarRounding = "baseRound" | "baseRectangle" | "none";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
  rounding?: AvatarRounding;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = "M", rounding = "baseRound", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden",
      `text-${size.toLowerCase()}`,
      {
        "rounded-full": rounding === "baseRound",
        "rounded-lg": rounding === "baseRectangle",
      },
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "bg-neutralgrey-200 dark:bg-neutralgrey-1100 flex h-full w-full items-center justify-center rounded-full",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarIcon = React.forwardRef<
  React.ElementRef<typeof PersonIcon>,
  React.ComponentPropsWithoutRef<typeof PersonIcon>
>(({ className, ...props }, ref) => (
  <PersonIcon
    ref={ref}
    className={cn("dark:text-base-white h-6 w-6 text-black", className)}
    {...props}
  />
));
AvatarIcon.displayName = "AvatarIcon";

export { Avatar, AvatarFallback, AvatarIcon, AvatarImage };
