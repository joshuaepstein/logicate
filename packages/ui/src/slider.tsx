'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@logicate/ui';

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn('relative flex w-full touch-none select-none items-center', className)} {...props}>
      <SliderPrimitive.Track className="bg-neutralgrey-1200/20 dark:bg-neutralgrey-100/20 relative h-1.5 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className="bg-neutralgrey-1200 dark:bg-neutralgrey-100 absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="border-neutralgrey-1200/50 border-neutralgrey-400 bg-base-white focus-visible:ring-neutralgrey-1300 dark:border-neutralgrey-100/50 dark:border-neutralgrey-1100 dark:bg-neutralgrey-1300 dark:focus-visible:ring-neutralgrey-500 block size-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
