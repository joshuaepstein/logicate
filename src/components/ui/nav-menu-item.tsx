import { cn } from '@/lib';
import Link from 'next/link';
import React from 'react';

type Props = React.ComponentPropsWithoutRef<'li'> & {
  active?: boolean;
  variant?: 'primary' | 'secondary';
} & {
  icon?:
    | React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & React.RefAttributes<SVGSVGElement>>
    | React.ElementType;
  iconOnly?: boolean;
  text?: string;
  compType?: 'default' | 'link';
  href?: string;
};

const NavigationMenuItem = React.forwardRef<React.ElementRef<'li'>, Props>(
  ({ className, icon: Icon, iconOnly = false, compType = 'default', active, variant = 'primary', href, ...props }, ref) => {
    const Component = compType === 'link' ? Link : 'li';

    return (
      // @ts-ignore
      (<Component
        className={cn(
          'hover:bg-neutralgrey-200 focus:inner-border-2 focus:inner-border-blue-900 group box-content flex w-max flex-row items-center gap-3 rounded-lg p-2 transition focus:border-none focus:outline-none',
          {
            'bg-blue-200': active,
          },
          className
        )}
        {...(compType === 'link' ? { href: href || '/' } : { ref })}
        {...props}
      >
        {Icon && (
          <Icon
            className={cn(
              'fill-neutralgrey-1000 text-neutralgrey-1000 group-hover:fill-neutralgrey-1300 group-hover:text-neutralgrey-1300 size-4 w-max transition group-focus:fill-blue-900 group-focus:text-blue-900',
              {
                'fill-blue-900 text-blue-900': active,
              }
            )}
          />
        )}
        {!iconOnly && (
          <span
            className={cn('text-neutralgrey-1000 group-hover:text-neutralgrey-1300 w-max grow text-sm font-[475] transition', {
              'text-blue-900': active,
            })}
          >
            {props.text}
          </span>
        )}
      </Component>)
    );
  }
);

NavigationMenuItem.displayName = 'NavigationMenuItem';

const NavMenuHeader = React.forwardRef<
  React.ElementRef<'li'>,
  React.ComponentPropsWithoutRef<'li'> & {
    text: string;
  }
>(({ text, className, children, ...props }, ref) => (
  <p className={cn('text-3xs text-neutralgrey-1000 px-4 py-2 font-[500] uppercase tracking-wide', className)}>{text}</p>
));

NavMenuHeader.displayName = 'NavMenuHeader';

export { NavMenuHeader, NavigationMenuItem as NavMenuItem };
