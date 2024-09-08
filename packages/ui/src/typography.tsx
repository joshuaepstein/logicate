import { cn } from '@logicate/ui';
import * as React from 'react';

const H1 = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<'h1'>>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn('dark:text-base-white scroll-m-20 text-4xl font-semibold tracking-tight text-black lg:text-5xl', className)}
    {...props}
  />
));

type H2Props = React.ComponentPropsWithoutRef<'h2'> & {
  withUnderline?: boolean;
};

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0', className, {
      'border-b-neutralgrey-400 dark:border-b-neutralgrey-900 border-b': props.withUnderline,
    })}
    {...props}
  />
));

const H3 = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<'h3'>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('mt-8 scroll-m-20 text-2xl font-medium tracking-tight', className)} {...props} />
));

const H4 = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<'h4'>>(({ className, ...props }, ref) => (
  <h4 ref={ref} className={cn('mt-8 scroll-m-20 text-xl font-medium tracking-tight', className)} {...props} />
));

type PType = React.ComponentPropsWithoutRef<'p'> & {
  light?: boolean;
  dark?: boolean;
};

const P = React.forwardRef<HTMLParagraphElement, PType>(({ className, light, dark, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'leading-7 [&:not(:first-child)]:mt-3',
      {
        'dark:text-base-white text-black': !light,
        'text-black': light,
        'text-base-white': dark,
      },
      className
    )}
    {...props}
  />
));

const BlockQuote = React.forwardRef<HTMLQuoteElement, React.ComponentPropsWithoutRef<'blockquote'>>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      'border-neutralgrey-500 text-neutralgrey-1100 dark:border-neutralgrey-800 dark:text-neutralgrey-400 mt-6 border-l-2 pl-6 italic',
      className
    )}
    {...props}
  />
));

const Table = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<'table'>>(({ className, ...props }, ref) => (
  <table ref={ref} className={cn('w-full', className)} {...props} />
));

const THead = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'thead'>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('', className)} {...props} />
));

const TBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'tbody'>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('', className)} {...props} />
));

const TR = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<'tr'>>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-neutralgrey-500 even:bg-neutralgrey-200 dark:border-neutralgrey-900 dark:even:bg-neutralgrey-1100 m-0 border-t p-0',
      className
    )}
    {...props}
  />
));

const TD = React.forwardRef<HTMLTableDataCellElement, React.ComponentPropsWithoutRef<'td'>>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'border-neutralgrey-400 dark:border-neutralgrey-900 border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
      className
    )}
    {...props}
  />
));

const TH = React.forwardRef<HTMLTableHeaderCellElement, React.ComponentPropsWithoutRef<'th'>>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'border-neutralgrey-400 dark:border-neutralgrey-900 dark:text-base-white border px-4 py-2 text-left font-semibold text-black [&[align=center]]:text-center [&[align=right]]:text-right',
      className
    )}
    {...props}
  />
));

const UL = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
));

const LI = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));

const InlineCode = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'code'>>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      'bg-neutralgrey-400/50 text-neutralgrey-1200 dark:bg-neutralgrey-1100 dark:text-neutralgrey-600 relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      className
    )}
    {...props}
  />
));

const Lead = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<'p'>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-neutralgrey-900 dark:text-neutralgrey-600 text-xl', className)} {...props} />
));

const Large = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-neutralgrey-1200 dark:text-neutralgrey-100 text-lg font-semibold', className)} {...props} />
));

const Small = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'small'>>(({ className, ...props }, ref) => (
  <small ref={ref} className={cn('dark:text-base-white text-sm font-medium leading-none', className)} {...props} />
));

const Subtle = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<'p'>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-neutralgrey-700 dark:text-neutralgrey-600 text-sm', className)} {...props} />
));

H1.displayName = 'H1';
H2.displayName = 'H2';
H3.displayName = 'H3';
H4.displayName = 'H4';
P.displayName = 'P';
BlockQuote.displayName = 'BlockQuote';
Table.displayName = 'Table';
THead.displayName = 'THead';
TBody.displayName = 'TBody';
TR.displayName = 'TR';
TD.displayName = 'TD';
TH.displayName = 'TH';
UL.displayName = 'UL';
LI.displayName = 'LI';
InlineCode.displayName = 'InlineCode';
Lead.displayName = 'Lead';
Large.displayName = 'Large';
Small.displayName = 'Small';
Subtle.displayName = 'Subtle';

export { BlockQuote, H1, H2, H3, H4, InlineCode, Large, Lead, LI, P, Small, Subtle, Table, TBody, TD, TH, THead, TR, UL };
