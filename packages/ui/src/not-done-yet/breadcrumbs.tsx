'use client';

import { ChevronRightIcon, Home03Icon as HomeIcon } from '@jfstech/icons-react/24/outline';
import { capitalise, cn } from '@logicate/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export function AutomaticBreadcrumbs({ includeHome = true, customEndPathName }: { includeHome?: boolean; customEndPathName?: string }) {
  const pathname = usePathname();

  if (pathname == null || pathname === '/') {
    return <></>;
  }

  const split = pathname.split('/').filter((x) => x);

  return (
    <div className="flex items-center space-x-2 text-sm font-medium leading-[1em] transition-colors duration-200 ease-in-out">
      {(includeHome === true && <HomeBreadcrumb />) || null}
      {split.map((part, i) => {
        const href = '/' + split.slice(0, i + 1).join('/');
        const active = href === pathname;
        if (active && customEndPathName) {
          return <Breadcrumb href={href} label={customEndPathName} disableSeparator={active} key={i} />;
        }
        return <Breadcrumb href={href} label={capitalise(part)} disableSeparator={active} key={i} />;
      })}
    </div>
  );
}

export function BreadcrumbsParent({ children, includeHome }: React.ComponentProps<'div'> & { includeHome?: boolean }) {
  return (
    <div className="flex items-center space-x-2 text-sm font-normal leading-[1em] transition-colors duration-200 ease-in-out">
      {includeHome && <HomeBreadcrumb />}
      {children}
    </div>
  );
}

export function HomeBreadcrumb() {
  return (
    <>
      <Link href="/">
        <HomeIcon className="text-neutralgrey-800 hover:text-neutralgrey-700 dark:text-neutralgrey-500 dark:hover:text-neutralgrey-600 size-4 cursor-pointer transition-colors duration-200 ease-in-out" />
      </Link>
      <BreadcrumbSeparator />
    </>
  );
}

const BreadcrumbSeparator = () => <ChevronRightIcon className="text-neutralgrey-800 dark:text-neutralgrey-500 size-4" />;

type Breadcrumb = {
  href: string;
  label: string;
  disabled?: boolean;
  disableSeparator?: boolean;
  active?: boolean;
};

export function Breadcrumb({ href, label, disableSeparator, disabled, active }: Breadcrumb) {
  const pathname = usePathname() ?? '';
  const active_ = pathname.endsWith(href) || active;

  return (
    <div className="flex items-center space-x-2 text-sm font-normal leading-[1em] transition-colors duration-200 ease-in-out">
      <Link
        href={href}
        className="flex items-center space-x-2 text-sm font-normal leading-[1em] transition-colors duration-200 ease-in-out"
      >
        <span
          className={cn('cursor-pointer transition-colors', {
            'text-neutralgrey-800 hover:text-neutralgrey-700 dark:text-neutralgrey-500 dark:hover:text-neutralgrey-600': !disabled,
            'text-neutralgrey-600 dark:text-neutralgrey-800 cursor-not-allowed': disabled,
            'text-primary-600 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300': active_,
          })}
        >
          {label}
        </span>
      </Link>
      {!disableSeparator && <BreadcrumbSeparator />}
    </div>
  );
}
