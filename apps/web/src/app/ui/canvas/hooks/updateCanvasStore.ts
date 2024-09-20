import { useEffect, useState, useTransition } from 'react'
import SuperJSON from 'superjson'
import useCanvasStore from './useCanvasStore'
import { useDebounce } from 'use-debounce'
import { getCookie } from 'react-use-cookie'

export const updateDatabase = async (stringData: string, canvasId: string) => {
  const { updatingDatabase, setUpdatingDatabase } = useCanvasStore.getState()
  if (updatingDatabase.is) return false
  setUpdatingDatabase({ is: true, lastUpdated: Date.now(), progress: 0 })
  const response = await fetch(`/api/canvas/${canvasId}`, {
    method: 'POST',
    body: JSON.stringify({
      database: stringData,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.debug(`Database updated: ${Date.now()}`)
  return response.ok
}

// Function which allows us to update the database
const useUpdateCanvasStore = (canvasId: string) => {
  const [cachedDatabase, setCachedDatabase] = useState<string | null>(null)
  const { updatingDatabase, setUpdatingDatabase, ...canvasStore } = useCanvasStore()
  const [debouncedCanvasStore] = useDebounce(canvasStore, 1000) // Will update the database every 5 seconds
  const [fetching, useFetch] = useTransition() // Allows us to run an async function while keeping track of the state of the function.

  useEffect(() => {
    if (getCookie(`autoSave-${canvasId}`) === 'false') return
    // We cache the database string here so that we are not updating the database every time that the canvas store changes
    // This makes sure that we are not sending too many requests to our database.
    const stringified = SuperJSON.stringify(canvasStore)
    if (stringified === cachedDatabase) return
    setCachedDatabase(stringified)
    if (updatingDatabase.is || fetching) return
    useFetch(async () => {
      const database = await updateDatabase(stringified, canvasId)
      if (database) {
        setUpdatingDatabase({ is: false, lastUpdated: Date.now(), progress: 0 })
      } else {
        setUpdatingDatabase({ is: false, lastUpdated: null, progress: 0 })
      }
    })
  }, [debouncedCanvasStore])
}

export default useUpdateCanvasStore
