import { cn } from '@/lib'

export const backgroundOverlayStylesTW = (className?: string) =>
  cn(
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 z-[123456789] bg-[#05051440]',
    className
  )

export const OVERLAY_COLOUR_TW = 'bg-[#05051430]'
