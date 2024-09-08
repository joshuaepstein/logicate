'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@logicate/ui';
import { buttonVariants } from '../button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants({ variant: 'borders' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-neutralgrey-700 rounded-md w-8 font-normal text-[0.8rem] dark:text-neutralgrey-600',
        row: 'flex w-full mt-2',
        cell: cn(
          '[&:has([aria-selected])]:bg-neutralgrey-200 dark:[&:has([aria-selected])]:bg-neutralgrey-1100 [&:has([aria-selected].day-outside)]:bg-neutralgrey-200/50 dark:[&:has([aria-selected].day-outside)]:bg-neutralgrey-1100/50 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(buttonVariants({ variant: 'secondary' }), 'h-8 w-8 p-0 font-normal aria-selected:opacity-100'),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-neutralgrey-1200 text-neutralgrey-100 hover:bg-neutralgrey-1200 hover:text-neutralgrey-100 focus:bg-neutralgrey-1200 focus:text-neutralgrey-100 dark:bg-neutralgrey-100 dark:text-neutralgrey-1200 dark:hover:bg-neutralgrey-100 dark:hover:text-neutralgrey-1200 dark:focus:bg-neutralgrey-100 dark:focus:text-neutralgrey-1200',
        day_today: 'bg-neutralgrey-200 text-neutralgrey-1200 dark:bg-neutralgrey-1100 dark:text-neutralgrey-100',
        day_outside:
          'day-outside text-neutralgrey-700 opacity-50  aria-selected:bg-neutralgrey-200/50 aria-selected:text-neutralgrey-700 aria-selected:opacity-30 dark:text-neutralgrey-600 dark:aria-selected:bg-neutralgrey-1100/50 dark:aria-selected:text-neutralgrey-600',
        day_disabled: 'text-neutralgrey-700 opacity-50 dark:text-neutralgrey-600',
        day_range_middle:
          'aria-selected:bg-neutralgrey-200 aria-selected:text-neutralgrey-1200 dark:aria-selected:bg-neutralgrey-1100 dark:aria-selected:text-neutralgrey-100',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="size-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="size-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
