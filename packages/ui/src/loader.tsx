import { cn } from "@logicate/ui";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import LoadingCircle from "./icons/loading-circle";
import LoadingSpinner from "./icons/loading-spinner";

const loaderVariants = cva("", {
  variants: {
    variant: {
      primary: "",
      secondary: "",
      darkPrimary: "",
      darkSecondary: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface LoaderProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof loaderVariants> {
  hideText?: boolean;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    { className, size = "md", variant = "primary", hideText = false, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <LoadingCircle
          className={cn({
            "text-neutralgrey-500 stroke-blue-900": variant === "primary",
            "stroke-flatgrey-1300 text-neutralgrey-500":
              variant === "secondary",
            "stroke-blue-900 text-[#FFFFFF08]": variant === "darkPrimary",
            "stroke-base-white text-[#FFFFFF08]": variant === "darkSecondary",

            "size-[24px]": size === "xs",
            "size-8": size === "sm",
            "size-10": size === "md",
            "size-12": size === "lg",
          })}
          strokeWidth={
            size === "md" ? 10 : size === "lg" ? 12 : size === "sm" ? 8 : 6
          }
        />
        <span
          className={cn("text-neutralgrey-1000 text-sm", {
            "text-base-white/45": variant?.includes("dark"),
          })}
        >
          Loading...
        </span>
      </div>
    );
  },
);
Loader.displayName = "Button";

export { Loader };
