'use client'

import { cn } from '@/lib'
import { backgroundOverlayStylesTW } from '@/components/ui/bg-overlay'
import useMediaQuery from '@/lib/hooks/use-media-query'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { Drawer } from 'vaul'

export default function Modal({
  children,
  showModal,
  setShowModal,
  className,
  onClose,
  preventDefaultClose,
}: {
  children: React.ReactNode
  showModal?: boolean
  setShowModal?: Dispatch<SetStateAction<boolean>>
  className?: string
  onClose?: () => void
  preventDefaultClose?: boolean
}) {
  const router = useRouter()

  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return
    }
    // fire onClose event if provided
    onClose && onClose()

    // if setShowModal is defined, use it to close modal
    if (setShowModal) {
      setShowModal(false)
      // else, this is intercepting route @modal
    } else {
      router.back()
    }
  }
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <Drawer.Root
        open={setShowModal ? showModal : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true })
          }
        }}
      >
        <Drawer.Overlay className={backgroundOverlayStylesTW('backdrop-blur-sm')} />
        <Drawer.Portal>
          <Drawer.Content
            className={cn(
              'fixed bottom-0 left-0 right-0 z-[123456789] mt-24 rounded-t-[10px] border-t border-gray-200 bg-white',
              className
            )}
          >
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>
            {children}
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    )
  }
  return (
    <Dialog.Root
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal()
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay id="modal-backdrop" className={backgroundOverlayStylesTW('backdrop-blur-sm')} />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'animate-slide-up-fade shadow-hard-sm fixed inset-0 z-[123456789] m-auto hidden max-h-fit w-full max-w-md overflow-hidden rounded-md bg-white p-0 shadow-xl md:block',
            className
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
