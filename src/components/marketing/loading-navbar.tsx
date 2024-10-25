"use client"

import { AppContext } from "@/app/providers"
import Kbd from "@/components/ui/kbd"
import { redirect } from "next/navigation"
import { useContext } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import Logo from "../Logo"
import LoadingCircle from "../ui/icons/loading-circle"

export default function LoadingNavbar() {
  const { setShowCMDK } = useContext(AppContext)
  useHotkeys("l", () => {
    redirect("/login")
  })

  return (
    <>
      <nav className="border-b-neutral-500 container flex h-16 items-center justify-between border-b">
        <Logo className="h-8 transition hover:scale-105 active:scale-95" />
        <div className="flex items-center gap-4">
          <div className="flex items-stretch justify-end gap-4">
            <div
              className="flex h-8 w-36 cursor-pointer select-none items-center justify-between rounded-md bg-neutralgrey-200 px-2"
              onClick={() => {
                setShowCMDK(true)
              }}
            >
              <p className="text-sm text-neutralgrey-1000">Search</p>
              <div className="flex items-center gap-1">
                <Kbd variant="ghost" className="bg-neutralgrey-100">
                  ⌘
                </Kbd>
                <Kbd variant="ghost" className="bg-neutralgrey-100">
                  K
                </Kbd>
              </div>
            </div>
            <div className="group flex items-center justify-center gap-2 rounded-md bg-neutralgrey-200 px-2 py-1 transition">
              <span className="text-sm text-neutralgrey-1000 transition group-hover:text-neutralgrey-1200">Loading</span> <LoadingCircle />
            </div>
            <div className="group flex items-center justify-center gap-2 rounded-md bg-neutralgrey-1100 px-2 py-1 transition hover:bg-neutralgrey-1300">
              <span className="text-sm text-neutralgrey-100 transition">Loading</span> <LoadingCircle />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
