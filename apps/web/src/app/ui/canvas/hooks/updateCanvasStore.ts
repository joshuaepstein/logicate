import { useEffect, useState, useTransition } from 'react'
import SuperJSON from 'superjson'
import useCanvasStore from './useCanvasStore'
import { useDebounce } from 'use-debounce'

const useUpdateCanvasStore = (canvasId: string) => {
  const [cachedDatabase, setCachedDatabase] = useState<string | null>(null)
  const { updatingDatabase, setUpdatingDatabase, ...canvasStore } = useCanvasStore()
  const [debouncedCanvasStore] = useDebounce(canvasStore, 1000)
  const [fetching, useFetch] = useTransition()

  useEffect(() => {
    const stringified = SuperJSON.stringify(canvasStore)
    localStorage.setItem(canvasId, stringified)
  }, [debouncedCanvasStore])

  useEffect(() => {
    const stringified = SuperJSON.stringify(canvasStore)
    if (stringified === cachedDatabase) return
    setCachedDatabase(stringified)
    if (updatingDatabase.is || fetching) return
    useFetch(async () => {
      setUpdatingDatabase({ is: true, lastUpdated: Date.now(), progress: 0 })
      const response = await fetch(`/api/canvas/${canvasId}`, {
        method: 'POST',
        body: JSON.stringify({
          database: stringified,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setUpdatingDatabase({ is: false, lastUpdated: Date.now(), progress: 0 })
    })
  }, [debouncedCanvasStore])
}

export default useUpdateCanvasStore
