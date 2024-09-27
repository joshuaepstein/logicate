'use client';

import { ChevronLeftIcon } from '@jfstech/icons-react/24/outline';
import { cn } from '@/lib';
import { ClassValue } from 'clsx';
import { useRouter } from 'next/navigation';

export function BackButton({ onClick, className }: { onClick?: () => void; className?: ClassValue | ClassValue[] }) {
  const router = useRouter();

  return (
    <div
      className={cn(
        'hover:bg-neutralgrey-200 dark:hover:bg-neutralgrey-1200 group flex w-max cursor-pointer items-center justify-center space-x-3 rounded-lg px-4 py-2',
        className
      )}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          router.back();
        }
      }}
    >
      <ChevronLeftIcon className="text-neutralgrey-900 dark:text-neutralgrey-700 group-hover:dark:text-neutralgrey-500 size-4" />
      <p className="text-neutralgrey-900 dark:text-neutralgrey-700 group-hover:dark:text-neutralgrey-500 text-sm font-medium">Back</p>
    </div>
  );
}
