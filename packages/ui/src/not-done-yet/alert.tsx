import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@logicate/ui';

const alertVariants = cva(
  'relative w-full rounded-lg border border-neutralgrey-400 px-4 py-3 text-sm dark:border-neutralgrey-1100 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutralgrey-1300 dark:[&>svg]:text-neutralgrey-100 [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-base-white text-neutralgrey-1300 dark:bg-neutralgrey-1300 dark:text-neutralgrey-100',
        destructive: 'border-red-500/50 text-red-500 dark:border-red-500 dark:text-red-900 [&>svg]:text-red-500 dark:[&>svg]:text-red-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
