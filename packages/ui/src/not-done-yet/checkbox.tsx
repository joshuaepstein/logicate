'use client';

import { Check01Icon as CheckIcon } from '@jfstech/icons-react/24/outline';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { cn } from '@logicate/ui';
import { DashIcon } from '@radix-ui/react-icons';
import { VariantProps, cva } from 'class-variance-authority';

// data-[state=checked] is a hack to style the checked state
const checkboxVariants = cva('transition duration-300 flex items-center justify-center appearance-none outline-none focus-visible:ring-0', {
  variants: {
    size: {
      xs: 'size-[14px]',
      sm: 'size-4',
      md: 'size-[18px]',
      lg: 'size-5',
    },
    variant: {
      default:
        'rounded-[4px] border-2 disabled:opacity-50 text-white data-[state=checked]:bg-blue-900 data-[state=indeterminate]:bg-blue-900 data-[state=indeterminate]:border-blue-900 data-[state=checked]:border-blue-900 data-[state=checked]:hover:bg-blue-1000 data-[state=indeterminate]:hover:bg-blue-1000 data-[state=checked]:focus-visible:ring-2 data-[state=indeterminate]:focus-visible:ring-2 data-[state=checked]:ring-blue-[#618DF2] data-[state=indeterminate]:ring-blue-[#618DF2] data-[state=checked]:hover:border-blue-1000 data-[state=indeterminate]:hover:border-blue-1000 border-neutralgrey-600 hover:border-blue-700 focus-visible:border-neutralgrey-600 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-1',
      alt: 'shadow-checkbox-default rounded-[4px] hover:shadow-checkbox-hover p-0 disabled:shadow-checkbox-disabled data-[state=checked]:bg-blue-900 data-[state=indeterminate]:bg-blue-900 text-white data-[state=checked]:shadow-checkbox-active data-[state=indeterminate]:shadow-checkbox-active hover:data-[state=indeterminate]:bg-blue-1000 hover:data-[state=checked]:bg-blue-1000 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:shadow-checkbox-default',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>;

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size, variant, checked, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root ref={ref} checked={checked} className={cn(checkboxVariants({ size, variant, className }))} {...props}>
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current', {
            'size-[10px]': size === 'xs' || size === 'sm',
            'size-[12px]': size === 'md' || size === 'lg',
          })}
        >
          {checked !== 'indeterminate' ? <CheckIcon className={cn({})} /> : <DashIcon className={cn({})} />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
