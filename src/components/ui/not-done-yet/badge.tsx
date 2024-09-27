import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border border-neutralgrey-400 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutralgrey-1300 focus:ring-offset-2 dark:border-neutralgrey-1100 dark:focus:ring-neutralgrey-500',
  {
    variants: {
      variant: {
        default:
          'shadow border-transparent bg-neutralgrey-1200 text-neutralgrey-100 hover:bg-neutralgrey-1200/80 dark:bg-neutralgrey-100 dark:text-neutralgrey-1200 dark:hover:bg-neutralgrey-100/80',
        secondary:
          'border-transparent bg-neutralgrey-200 text-neutralgrey-1200 hover:bg-neutralgrey-200/80 dark:bg-neutralgrey-1100 dark:text-neutralgrey-100 dark:hover:bg-neutralgrey-1100/80',
        destructive:
          'shadow border-transparent bg-red-500 text-neutralgrey-100 hover:bg-red-500/80 dark:bg-red-900 dark:text-neutralgrey-100 dark:hover:bg-red-900/80',
        outline: 'text-neutralgrey-1300 dark:text-neutralgrey-100',
        green: 'border-transparent bg-green-100 font-medium text-green-600 dark:bg-green-900 dark:text-green-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
