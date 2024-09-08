import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@logicate/ui';
import isEmpty from '@logicate/utils/is-empty';

const buttonVariants = cva(
  'inline-flex w-max items-center justify-center whitespace-nowrap rounded-lg ring-offset-base-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none data-[debug=focus]:ring-2 data-[debug=focus]:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'box-border bg-blue-900 text-base-white hover:bg-blue-1000 focus-visible:bg-blue-1000 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-blue-1000 data-[debug=focus]:bg-blue-1000 data-[debug=hover]:bg-blue-1000 data-[debug=focus]:ring-neutralgrey-600',
        secondary:
          'box-border bg-neutralgrey-200 text-neutralgrey-1000 hover:bg-neutralgrey-300 hover:text-neutralgrey-1300 focus-visible:bg-base-white focus-visible:text-neutralgrey-1300 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-neutralgrey-300 data-[debug=focus]:bg-base-white data-[debug=hover]:bg-neutralgrey-300 data-[debug=focus]:text-neutralgrey-1300 data-[debug=focus]:ring-neutralgrey-600',
        dark: 'box-border bg-neutralgrey-1200 text-neutralgrey-100 hover:bg-neutralgrey-1000 focus-visible:bg-neutralgrey-1000 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-neutralgrey-1000 data-[debug=focus]:bg-neutralgrey-1000 data-[debug=hover]:bg-neutralgrey-1000 data-[debug=focus]:ring-neutralgrey-600',
        borders:
          'box-border border border-neutralgrey-500 bg-base-white text-neutralgrey-1000 hover:border-neutralgrey-600 hover:text-neutralgrey-1300 focus-visible:text-neutralgrey-1300 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:border-neutralgrey-600 data-[debug=focus]:border-neutralgrey-600 data-[debug=hover]:border-neutralgrey-600 data-[debug=focus]:text-neutralgrey-1300 data-[debug=focus]:ring-neutralgrey-600',
        'no-borders':
          'box-border bg-base-white text-neutralgrey-1000 hover:bg-neutralgrey-300 hover:text-neutralgrey-1300 focus-visible:text-neutralgrey-1300 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-neutralgrey-300 data-[debug=focus]:bg-base-white data-[debug=hover]:bg-neutralgrey-300 data-[debug=focus]:text-neutralgrey-1300 data-[debug=hover]:text-neutralgrey-1300 data-[debug=focus]:ring-neutralgrey-600',

        'primary-borders':
          'border border-neutralgrey-500 bg-base-white text-blue-700 hover:border-blue-700 focus-visible:border-blue-700 focus-visible:ring-blue-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:border-blue-700 data-[debug=focus]:border-blue-700 data-[debug=hover]:border-blue-700 data-[debug=focus]:ring-blue-400',

        'destructive-primary':
          'bg-red-800 text-base-white hover:bg-red-900 focus-visible:bg-red-900 focus-visible:ring-red-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-red-900 data-[debug=focus]:bg-red-900 data-[debug=hover]:bg-red-900 data-[debug=focus]:ring-red-400',
        'destructive-secondary':
          'bg-red-100 text-red-700 hover:bg-red-200 focus-visible:bg-base-white focus-visible:ring-red-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-red-200 data-[debug=focus]:bg-base-white data-[debug=hover]:bg-red-200 data-[debug=focus]:ring-red-400',
        'destructive-borders':
          'border border-neutralgrey-500 bg-base-white text-red-700 hover:border-red-700 focus-visible:border-red-700 focus-visible:ring-red-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:border-red-700 data-[debug=focus]:border-red-700 data-[debug=hover]:border-red-700 data-[debug=focus]:ring-red-400',
        'destructive-no-borders':
          'bg-base-white text-red-700 hover:bg-red-200 focus-visible:text-red-700 focus-visible:ring-red-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-red-200 data-[debug=focus]:bg-base-white data-[debug=hover]:bg-red-200 data-[debug=focus]:ring-red-400',

        grey: 'bg-neutralgrey-1300 text-base-white hover:bg-neutralgrey-1000 focus-visible:bg-neutralgrey-1000 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-neutralgrey-1000 data-[debug=focus]:bg-neutralgrey-1000 data-[debug=hover]:bg-neutralgrey-1000 data-[debug=focus]:ring-neutralgrey-600',

        green:
          'bg-green-800 text-base-white hover:bg-green-900 focus-visible:bg-green-900 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-green-900 data-[debug=focus]:bg-green-900 data-[debug=hover]:bg-green-900 data-[debug=focus]:ring-neutralgrey-600',
        'green-borders':
          'border border-neutralgrey-500 bg-base-white text-green-700 hover:border-green-700 focus-visible:border-green-700 focus-visible:ring-green-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:border-green-700 data-[debug=focus]:border-green-700 data-[debug=hover]:border-green-700 data-[debug=focus]:ring-green-400',

        orange:
          'bg-orange-800 text-base-white hover:bg-orange-900 focus-visible:bg-orange-900 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-orange-900 data-[debug=focus]:bg-orange-900 data-[debug=hover]:bg-orange-900 data-[debug=focus]:ring-neutralgrey-600',
        'orange-borders':
          'border border-neutralgrey-500 bg-base-white text-orange-700 hover:border-orange-700 focus-visible:border-orange-700 focus-visible:ring-orange-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:border-orange-700 data-[debug=focus]:border-orange-700 data-[debug=hover]:border-orange-700 data-[debug=focus]:ring-orange-400',

        teal: 'bg-teal-800 text-base-white hover:bg-teal-900 focus-visible:bg-teal-900 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-teal-900 data-[debug=focus]:bg-teal-900 data-[debug=hover]:bg-teal-900 data-[debug=focus]:ring-neutralgrey-600',
        'teal-borders':
          'border border-neutralgrey-500 bg-base-white text-teal-700 hover:border-teal-700 focus-visible:border-teal-700 focus-visible:ring-teal-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:border-teal-700 data-[debug=focus]:border-teal-700 data-[debug=hover]:border-teal-700 data-[debug=focus]:ring-teal-400',

        magenta:
          'bg-magenta-800 text-base-white hover:bg-magenta-900 focus-visible:bg-magenta-900 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-magenta-900 data-[debug=focus]:bg-magenta-900 data-[debug=hover]:bg-magenta-900 data-[debug=focus]:ring-neutralgrey-600',
        'magenta-borders':
          'border border-neutralgrey-500 bg-base-white text-magenta-700 hover:border-magenta-700 focus-visible:border-magenta-700 focus-visible:ring-magenta-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:border-magenta-700 data-[debug=focus]:border-magenta-700 data-[debug=hover]:border-magenta-700 data-[debug=focus]:ring-magenta-400',

        purple:
          'bg-purple-800 text-base-white hover:bg-purple-900 focus-visible:bg-purple-900 focus-visible:ring-neutralgrey-600 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:bg-purple-900 data-[debug=focus]:bg-purple-900 data-[debug=hover]:bg-purple-900 data-[debug=focus]:ring-neutralgrey-600',
        'purple-borders':
          'border border-neutralgrey-500 bg-base-white text-purple-700 hover:border-purple-700 focus-visible:border-purple-700 focus-visible:ring-purple-400 disabled:bg-neutralgrey-300 disabled:text-neutralgrey-700 data-[debug=active]:border-purple-700 data-[debug=focus]:border-purple-700 data-[debug=hover]:border-purple-700 data-[debug=focus]:ring-purple-400',

        'text-primary':
          'text-blue-900 hover:text-blue-1000 focus-visible:text-blue-900 focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-0 disabled:text-neutralgrey-500 data-[debug=active]:text-blue-1000 data-[debug=focus]:text-blue-1000 data-[debug=hover]:text-blue-1000 data-[debug=focus]:ring-blue-900 data-[debug=focus]:ring-offset-0',
        'text-secondary':
          'text-neutralgrey-1000 hover:text-neutralgrey-1300 focus-visible:text-neutralgrey-1300 focus-visible:ring-2 focus-visible:ring-neutralgrey-1000 focus-visible:ring-offset-0 disabled:text-neutralgrey-500 data-[debug=active]:text-neutralgrey-1300 data-[debug=focus]:text-neutralgrey-1300 data-[debug=hover]:text-neutralgrey-1300 data-[debug=focus]:ring-neutralgrey-1000 data-[debug=focus]:ring-offset-0',
        'text-destructive':
          'text-red-800 hover:text-red-800 focus-visible:text-red-800 focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-0 disabled:text-neutralgrey-500 data-[debug=active]:text-red-800 data-[debug=focus]:text-red-800 data-[debug=hover]:text-red-800 data-[debug=focus]:ring-red-800 data-[debug=focus]:ring-offset-0',
        'text-contrast':
          'text-white/50 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0 disabled:text-base-white/30 data-[debug=active]:text-white data-[debug=focus]:text-white data-[debug=hover]:text-white data-[debug=focus]:ring-white data-[debug=focus]:ring-offset-0',

        none: '',
      },
      size: {
        xl: 'h-12 px-4 py-2 text-lg',
        lg: 'h-11 px-[14px] py-[10px]',
        md: 'h-10 px-[14px] py-[7px] text-sm',
        sm: 'h-9 px-3 py-1 text-sm',
        xs: 'h-8 px-[10px] py-[2px] text-sm',
        '2xs': 'h-[30px] px-[8px] py-[2px] text-2xs',

        'icon-xl': 'size-12 p-3',
        'icon-lg': 'size-11 p-[10px]',
        'icon-md': 'size-10 p-2',
        'icon-sm': 'size-9 p-2',
        'icon-xs': 'size-8 p-2',
        'icon-2xs': 'size-[30px] p-2',

        text: 'rounded-sm p-0 text-base',
        'text-sm': 'rounded-sm p-0 text-sm',

        none: '',
      },
      shadow: {
        none: '',
        soft: 'shadow-soft-md',
        hard: 'shadow-hard-md',
        button: 'shadow-button',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shadow: 'hard',
    },
  }
);

const noShadowVariants: ButtonProps['variant'][] = [
  'no-borders',
  'destructive-no-borders',
  'secondary',
  'destructive-secondary',
  'grey',
  'text-primary',
  'text-secondary',
  'text-destructive',
  'text-contrast',
];

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  debug?: 'hover' | 'focus' | 'active' | 'disabled';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, debug, shadow, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={cn(
          buttonVariants({
            variant,
            size: variant?.includes('text') && !size?.includes('text') ? 'text' : size,
            className,
            shadow: !isEmpty(shadow) && shadow !== 'none' ? shadow : disabled || noShadowVariants.includes(variant) ? 'none' : undefined,
          })
        )}
        ref={ref}
        disabled={disabled || debug === 'disabled'}
        // debug
        {...(debug && { 'data-debug': debug })}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
