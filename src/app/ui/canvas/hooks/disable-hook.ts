import { Click } from "@/lib/buttons"
import { useEffect } from "react"

const useDisableHook = (canvasReference: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    // disable right click context menu on canvas as we dont need a context menu
    const disableContextMenu = (e: MouseEvent) => {
      if (e.button === 2) {
        if (canvasReference.current) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    // disable scroll as we have our own scroll behaviour
    const disableScroll = (e: WheelEvent) => {
      if (canvasReference.current) {
        if (e.buttons === Click.Auxiliary) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    // disable text selection as when dragging elements it can sometimes select text
    const disableSelect = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }

    canvasReference.current?.addEventListener("contextmenu", disableContextMenu)
    document.addEventListener("wheel", disableScroll)
    document.addEventListener("selectstart", disableSelect)
    document.body.classList.add("fixed", "w-full", "h-full")
    return () => {
      canvasReference.current?.removeEventListener("contextmenu", disableContextMenu)
      document.removeEventListener("wheel", disableScroll)
      document.removeEventListener("selectstart", disableSelect)
      document.body.classList.remove("fixed", "w-full", "h-full")
    }
  })
}

export default useDisableHook
