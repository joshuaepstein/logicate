'use client'

import { MagicIcon } from '@jfstech/icons-react/24/outline'
import ExpandingArrow from '@/components/ui/icons/expanding-arrow'
import cmdkPages from '@/lib/cmdk-pages'
import va from '@vercel/analytics'
import { Command, useCommandState } from 'cmdk'
import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useDebouncedCallback } from 'use-debounce'
import Modal from './modal'

function CMDKHelper({ showCMDK, setShowCMDK }: { showCMDK: boolean; setShowCMDK: Dispatch<SetStateAction<boolean>> }) {
  const commandListRef = useRef<HTMLDivElement>(null)
  const debounceTrackSearch = useDebouncedCallback((query: string) => {
    va.track('CMDK Search', {
      query,
    })
  }, 1000)

  return (
    <Modal showModal={showCMDK} setShowModal={setShowCMDK} className="animate-smallZoomIn sm:max-w-xl">
      <Command label="CMDK" loop shouldFilter={false}>
        <Command.Input
          autoFocus
          onInput={(e) => {
            // hack to scroll to top of list when input changes (for some reason beyond my comprehension, setTimeout is needed)
            setTimeout(() => {
              commandListRef.current?.scrollTo(0, 0)
            }, 0)
            debounceTrackSearch(e.currentTarget.value)
          }}
          placeholder="Search..."
          className="placeholder-neutralgrey-600 w-full border-none p-4 font-normal focus:outline-none focus:ring-0"
        />
        <Command.List
          ref={commandListRef}
          className="border-neutralgrey-400 scrollbar-hide h-[50vh] max-h-[360px] min-h-[250px] overflow-scroll border-t p-2 transition-all sm:h-[calc(var(--cmdk-list-height)+10rem)]"
        >
          <Command.Empty className="bg-neutralgrey-300 text-neutralgrey-800 flex cursor-not-allowed items-center space-x-2 rounded-md px-4 py-2 text-sm">
            <MagicIcon className="text-neutralgrey-600 size-4" />
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-purple-600">Ask AI (Coming Soon)</p>
              <p className="text-neutralgrey-600 text-xs">Use our AI to find answers on your questions</p>
            </div>
          </Command.Empty>
          <CommandResults setShowCMDK={setShowCMDK} />
        </Command.List>
      </Command>
    </Modal>
  )
}

const CommandResults = ({ setShowCMDK }: { setShowCMDK: Dispatch<SetStateAction<boolean>> }) => {
  const router = useRouter()

  const fuse = useMemo(
    () =>
      new Fuse(cmdkPages, {
        keys: ['title', 'description'],
      }),
    []
  )

  const search = useCommandState((state) => state.search)

  const results = useMemo(() => {
    if (search.length === 0) return cmdkPages
    return fuse.search(search).map((r) => r.item)
  }, [search, fuse])

  return results.map(({ title, description, slug }) => (
    <Command.Item
      key={slug}
      value={title}
      onSelect={() => {
        router.push(`${slug}`)
        setShowCMDK(false)
      }}
      className="hover:bg-neutralgrey-300 active:bg-neutralgrey-400 aria-selected:bg-neutralgrey-300 group flex cursor-pointer items-center justify-between space-x-2 rounded-md px-4 py-2"
    >
      <div className="flex flex-col">
        <Highlighter
          highlightClassName="underline bg-transparent text-purple-500"
          searchWords={search.split(' ')}
          autoEscape={true}
          textToHighlight={title}
          className="text-neutralgrey-1000 text-sm font-medium group-aria-selected:text-purple-600 sm:group-hover:text-purple-600"
        />
        <Highlighter
          highlightClassName="underline bg-transparent text-purple-500"
          searchWords={search.split(' ')}
          autoEscape={true}
          textToHighlight={description}
          className="text-neutralgrey-800 line-clamp-1 text-xs"
        />
      </div>
      <ExpandingArrow className="invisible -ml-4 h-4 w-4 text-purple-600 transition group-aria-selected:visible sm:group-hover:visible" />
    </Command.Item>
  ))
}

export default function useCMDK() {
  const [showCMDK, setShowCMDK] = useState(false)

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const existingModalBackdrop = document.getElementById('modal-backdrop')
      if (e.key === 'k' && (e.metaKey || e.ctrlKey) && !existingModalBackdrop) {
        e.preventDefault()
        setShowCMDK((showCMDK) => !showCMDK)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const CMDK = useCallback(() => {
    return <CMDKHelper showCMDK={showCMDK} setShowCMDK={setShowCMDK} />
  }, [showCMDK, setShowCMDK])

  return useMemo(() => ({ showCMDK, setShowCMDK, CMDK }), [showCMDK, setShowCMDK, CMDK])
}
