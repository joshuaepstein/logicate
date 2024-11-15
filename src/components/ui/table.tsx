"use client"

import * as React from "react"

import { cn } from "@/lib"
import { DownArrowIcon as ArrowDownIcon, ArrowUpIcon } from "@jfstech/icons-react/24/outline"
import { cva, type VariantProps } from "class-variance-authority"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("border-x", className)} {...props} />
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn("bg-neutralgrey-200/50 dark:bg-neutralgrey-1100/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("data-[state=selected]:bg-neutralgrey-200 hover:bg-neutralgrey-100 transition-colors", className)}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const tableHeadVariants = cva(
  "whitespace-nowrap border-b border-t border-neutralgrey-300 text-left align-middle text-xs font-semibold text-neutralgrey-1300 first:border-l-0",
  {
    variants: {
      size: {
        sm: "h-10 px-3",
        md: "h-12 px-4",
      },
      sortable: {
        true: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "sm",
      sortable: false,
    },
  }
)

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> &
  VariantProps<typeof tableHeadVariants> & {
    sortable?: boolean
    sorted?: boolean
    sortDirection?: "asc" | "desc"
    onSort?: () => void
  }

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, onSort, size, sortable, sorted = false, sortDirection, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableHeadVariants({ size, sortable, className }))}
      onClick={() => {
        if (onSort && sortable) {
          onSort()
        }
      }}
      {...props}
    >
      {children}
      {sorted &&
        (sortDirection === "asc" ? (
          <ArrowUpIcon className="text-neutralgrey-900 ml-1 inline size-[14px]" />
        ) : (
          <ArrowDownIcon className="text-neutralgrey-900 ml-1 inline size-[14px]" />
        ))}
    </th>
  )
)
TableHead.displayName = "TableHead"

const tableCellVariants = cva("border-x border-b border-neutralgrey-300 transition", {
  variants: {
    size: {
      sm: "h-12 px-4",
      md: "h-16 px-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & VariantProps<typeof tableCellVariants>

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, size, ...props }, ref) => (
  <td ref={ref} className={tableCellVariants({ size, className })} {...props} />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("text-neutralgrey-700 dark:text-neutralgrey-600 mt-4 text-sm", className)} {...props} />
  )
)
TableCaption.displayName = "TableCaption"

const tableTextVariants = cva("text-sm", {
  variants: {
    variant: {
      primary: "font-medium text-neutralgrey-1300",
      secondary: "font-normal text-neutralgrey-1000",
      tertiary: "font-medium text-neutralgrey-900",
      quaternary: "font-normal text-neutralgrey-900",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

const TableText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof tableTextVariants>
>(({ className, variant, ...props }, ref) => <p ref={ref} className={cn(tableTextVariants({ variant }), className)} {...props} />)
TableText.displayName = "TableText"

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableText }
