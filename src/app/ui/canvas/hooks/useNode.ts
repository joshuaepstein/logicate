import { useEffect, useState } from "react"
import { Item, Wire as WireItemType } from "../types"
import useCanvasStore from "./useCanvasStore"

export const useNode = (id: string, itemsDefined?: Item[], wiresDefined?: WireItemType[]) => {
  const { items } = useCanvasStore()
  return itemsDefined ? itemsDefined.find((item) => item.id === id) : items.find((item) => item.id === id)
}

const useNodeHook = (id: string, itemsDefined?: Item[], wiresDefined?: WireItemType[]) => {
  const [node, setNode] = useState<Item | null>(null)
  const { items } = useCanvasStore()

  useEffect(() => {
    const allWithId = items.filter((item) => item.id === id)
    if (allWithId && allWithId.length > 0) {
      setNode(allWithId[0])
    }
  }, [items])

  return node
}

export default useNodeHook
