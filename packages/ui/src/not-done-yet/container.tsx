// Container

import { cn } from '@logicate/ui';
import React from 'react';

type Type = React.HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
  mt?: string;
  className?: string;
  flex?: boolean;
};

/**
 * @deprecated Use MaxWidthWrapper instead
 */
export const Container = ({ children, className, mt = 'mt-16', flex = false, ...props }: Type) => {
  return (
    <section
      className={cn(
        `container`,
        mt,
        {
          'flex flex-row items-center justify-between': flex,
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
