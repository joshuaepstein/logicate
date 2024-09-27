import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib';

const kbdVariants = cva(
  'select-none rounded border border-neutralgrey-400 px-1.5 py-px font-mono text-[0.7rem] font-normal shadow-sm disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-neutralgrey-200 text-neutralgrey-700',
        outline: 'bg-white text-neutralgrey-1100',
        ghost: 'bg-transparent text-neutralgrey-1100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, VariantProps<typeof kbdVariants> {
  /**
   * The title of the `abbr` element inside the `kbd` element.
   * @default undefined
   * @type string | undefined
   * @example title="Command"
   */
  abbrTitle?: string;
}

const Kbd = React.forwardRef<HTMLUnknownElement, KbdProps>(({ abbrTitle, children, className, variant, ...props }, ref) => {
  return (
    <kbd className={cn(kbdVariants({ variant, className }))} ref={ref} {...props}>
      {abbrTitle ? (
        <abbr title={abbrTitle} className="no-underline">
          {children}
        </abbr>
      ) : (
        children
      )}
    </kbd>
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
export default Kbd;
