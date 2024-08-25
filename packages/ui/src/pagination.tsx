import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import * as React from "react";

import { ButtonProps, buttonVariants } from "./button";
import { cn } from "@logicate/ui";
import { VariantProps, cva } from "class-variance-authority";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul"> & {
    variant?: "compact" | "spaced";
  }
>(({ className, variant = "spaced", ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-row items-center",
      {
        "gap-3": variant === "spaced",
        "gap-0": variant === "compact",
      },
      className,
    )}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const paginationLinkVariants = cva("", {
  variants: {
    variant: {
      compact_default: "",
      compact_active: "",

      spaced_default: "",
      spaced_active: "",
    },
    size: {
      sm: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "compact_default",
  },
});

type PaginateLinkVariant = VariantProps<typeof paginationLinkVariants>;

type PaginationLinkProps = {
  isActive?: boolean;
  paginateVariant?: "compact" | "spaced";
} & Pick<PaginateLinkVariant, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  paginateVariant = "spaced",
  size = "sm",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      paginationLinkVariants({
        variant: isActive
          ? `${paginateVariant}_active`
          : `${paginateVariant}_default`,
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  hideText = false,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  hideText?: boolean;
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="sm"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeftIcon className="size-4" />
    {hideText ? null : <span>Previous</span>}
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  hideText,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  hideText?: boolean;
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="sm"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    {hideText ? null : <span>Next</span>}
    <ChevronRightIcon className="size-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
