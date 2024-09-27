import useCanvasStore from './useCanvasStore'
import { useEffect, useState } from 'react'
import { Item } from '../types'

export const useNode = (id: string) => {
  const { items } = useCanvasStore()
  return items.find((item) => item.id === id)
}

const useNodeHook = (id: string) => {
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
