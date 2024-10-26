import * as React from "react"

import { cn } from "@/lib"
import { cva, type VariantProps } from "class-variance-authority"

const DocTable = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="relative my-4 w-full p-1">
    <table
      ref={ref}
      className={cn("shadow-hard-xs w-full max-w-full caption-bottom overflow-auto rounded-md text-sm", className)}
      {...props}
    />
  </div>
))
DocTable.displayName = "DocTable"

const DocTableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("", className)} {...props} />
)
DocTableHeader.displayName = "DocTableHeader"

const DocTableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
)
DocTableBody.displayName = "DocTableBody"

const DocTableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn("bg-neutralgrey-200/50 dark:bg-neutralgrey-1100/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
)
DocTableFooter.displayName = "DocTableFooter"

const DocTableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "data-[state=selected]:bg-neutralgrey-200 hover:bg-neutralgrey-100 overflow-hidden transition-colors last:rounded-b-md [&:last-child>td:first-child]:rounded-bl-md [&:last-child>td:last-child]:rounded-br-md [&:not(:last-child)>td]:border-b",
      className
    )}
    {...props}
  />
))
DocTableRow.displayName = "DocTableRow"

const docTableHeadVariants = cva(
  "whitespace-nowrap border-b border-x bg-neutralgrey-200/50 last:border-r-0 border-neutralgrey-300 text-left align-middle text-xs font-semibold text-neutralgrey-1300 first:border-l-0",
  {
    variants: {
      size: {
        sm: "h-10 px-3",
        md: "h-12 px-4",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

type DocTableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & VariantProps<typeof docTableHeadVariants> & {}

const DocTableHead = React.forwardRef<HTMLTableCellElement, DocTableHeadProps>(({ className, children, size, ...props }, ref) => (
  <th ref={ref} className={cn(docTableHeadVariants({ size, className }))} {...props}>
    {children}
  </th>
))
DocTableHead.displayName = "DocTableHead"

type DocTableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

const DocTableCell = React.forwardRef<HTMLTableCellElement, DocTableCellProps>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("border-neutralgrey-300 border-x px-4 py-2 transition first:border-l-0 last:border-r-0", className)}
    {...props}
  />
))
DocTableCell.displayName = "DocTableCell"

const DocTableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("text-neutralgrey-700 dark:text-neutralgrey-600 mt-4 text-sm", className)} {...props} />
  )
)
DocTableCaption.displayName = "DocTableCaption"

const docTableTextVariants = cva("text-sm", {
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

const DocTableText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof docTableTextVariants>
>(({ className, variant, ...props }, ref) => <p ref={ref} className={cn(docTableTextVariants({ variant }), className)} {...props} />)
DocTableText.displayName = "DocTableText"

export { DocTable, DocTableBody, DocTableCaption, DocTableCell, DocTableFooter, DocTableHead, DocTableHeader, DocTableRow, DocTableText }
