import { ChevronRightIcon, DotsHorizontalIcon, SlashIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/lib';

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'text-neutralgrey-900 dark:text-neutralgrey-500 flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp ref={ref} className={cn('hover:text-neutralgrey-1300 dark:hover:text-neutralgrey-100 transition-colors', className)} {...props} />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('text-neutralgrey-1300 dark:text-neutralgrey-100 font-normal', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({
  children,
  className,
  separator = 'slash',
  ...props
}: React.ComponentProps<'li'> & {
  separator: 'slash' | 'chevron';
}) => (
  <li role="presentation" aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} {...props}>
    {children ?? (separator === 'slash' ? <SlashIcon /> : <ChevronRightIcon />)}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('text-neutralgrey-900 flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="size-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };