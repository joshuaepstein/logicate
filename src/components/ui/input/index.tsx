import * as React from 'react';

import { cn } from '@/lib';
import { VariantProps, cva } from 'class-variance-authority';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

export const inputVariants = cva(
  'flex w-min min-w-[300px] border bg-base-white transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutralgrey-1300 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        basic:
          'box-border border-neutralgrey-500 shadow-soft-2xs placeholder:text-neutralgrey-900 hover:border-neutralgrey-600 focus-visible:border-neutralgrey-500 focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-1 aria-selected:border-blue-900 aria-selected:shadow-hard-xs aria-selected:[border-width:1.5] data-[debug=disabled]:cursor-not-allowed data-[debug=disabled]:border-neutralgrey-500 data-[debug=error]:border-red-800 data-[debug=focus]:border-neutralgrey-500 data-[debug=hover]:border-neutralgrey-600 data-[debug=selected]:border-blue-900 data-[debug=disabled]:opacity-50 data-[debug=disabled]:shadow-none data-[debug=error]:shadow-hard-xs data-[debug=selected]:shadow-hard-xs data-[debug=focus]:ring-2 data-[debug=focus]:ring-blue-700 data-[debug=focus]:ring-offset-1 data-[debug=error]:[border-width:1.5] data-[debug=selected]:[border-width:1.5]',
        website:
          'box-border border-neutralgrey-500 shadow-soft-2xs placeholder:text-neutralgrey-900 hover:border-neutralgrey-600 focus-visible:border-neutralgrey-500 focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-1 aria-selected:border-blue-900 aria-selected:shadow-hard-xs aria-selected:[border-width:1.5] data-[debug=disabled]:cursor-not-allowed data-[debug=disabled]:border-neutralgrey-500 data-[debug=error]:border-red-800 data-[debug=focus]:border-neutralgrey-500 data-[debug=hover]:border-neutralgrey-600 data-[debug=selected]:border-blue-900 data-[debug=disabled]:opacity-50 data-[debug=disabled]:shadow-none data-[debug=error]:shadow-hard-xs data-[debug=selected]:shadow-hard-xs data-[debug=focus]:ring-2 data-[debug=focus]:ring-blue-700 data-[debug=focus]:ring-offset-1 data-[debug=error]:[border-width:1.5] data-[debug=selected]:[border-width:1.5]',
        quantity:
          'box-border border-neutralgrey-500 shadow-soft-2xs placeholder:text-neutralgrey-900 hover:border-neutralgrey-600 focus-visible:border-neutralgrey-500 focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-1 aria-selected:border-blue-900 aria-selected:shadow-hard-xs aria-selected:[border-width:1.5] data-[debug=disabled]:cursor-not-allowed data-[debug=disabled]:border-neutralgrey-500 data-[debug=error]:border-red-800 data-[debug=focus]:border-neutralgrey-500 data-[debug=hover]:border-neutralgrey-600 data-[debug=selected]:border-blue-900 data-[debug=disabled]:opacity-50 data-[debug=disabled]:shadow-none data-[debug=error]:shadow-hard-xs data-[debug=selected]:shadow-hard-xs data-[debug=focus]:ring-2 data-[debug=focus]:ring-blue-700 data-[debug=focus]:ring-offset-1 data-[debug=error]:[border-width:1.5] data-[debug=selected]:[border-width:1.5]',
      },
      inputSize: {
        xs: 'h-8 gap-1 rounded-sm px-2 text-xs',
        sm: 'h-10 gap-2 rounded-lg px-2 text-sm',
        lg: 'h-12 gap-2 rounded-lg px-3 text-sm',
      },
      debug: {
        '': '',
        hover: 'hovered',
        focus: 'focused',
        selected: 'selected',
        disabled: 'disabled',
        error: 'error',
      },
      displayError: {
        true: 'invalid:border-red-800 invalid:shadow-hard-xs invalid:[border-width:1.5]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'basic',
      inputSize: 'sm',
      debug: '',
      displayError: true,
    },
  }
);

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, displayError, children, disabled, inputSize, debug, ...props }, ref) => {
    return (
      <>
        <input
          type={type || 'text'}
          className={cn(
            inputVariants({
              variant,
              inputSize,
              debug,
              displayError,
              className,
            })
          )}
          ref={ref}
          disabled={disabled || debug === 'disabled'}
          {...(debug && { 'data-debug': debug })}
          {...(debug === 'error' && {
            'aria-invalid': true,
            'aria-describedby': 'error-message',
          })}
          {...props}
        />
      </>
    );
  }
);
TextInput.displayName = 'Input';

export { TextInput as Input, TextInput };
