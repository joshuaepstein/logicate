'use client';

// import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // const { theme = 'system' } = useTheme()

  return (
    <Sonner
      // theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-base-white group-[.toaster]:text-neutralgrey-1300 group-[.toaster]:border-neutralgrey-400 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-neutralgrey-1300 dark:group-[.toaster]:text-neutralgrey-100 dark:group-[.toaster]:border-neutralgrey-1100',
          description: 'group-[.toast]:text-neutralgrey-700 dark:group-[.toast]:text-neutralgrey-600',
          actionButton:
            'group-[.toast]:bg-neutralgrey-1200 group-[.toast]:text-neutralgrey-100 dark:group-[.toast]:bg-neutralgrey-100 dark:group-[.toast]:text-neutralgrey-1200',
          cancelButton:
            'group-[.toast]:bg-neutralgrey-200 group-[.toast]:text-neutralgrey-700 dark:group-[.toast]:bg-neutralgrey-1100 dark:group-[.toast]:text-neutralgrey-600',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
