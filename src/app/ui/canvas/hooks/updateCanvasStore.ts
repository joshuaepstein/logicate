import { getStorage } from "@/lib/hooks/use-storage"
import { useEffect, useState, useTransition } from "react"
import SuperJSON from "superjson"
import { InputType } from "../node/inputs/types"
import useCanvasStore from "./useCanvasStore"

export const updateDatabase = async (stringData: string, canvasId: string) => {
  const { updatingDatabase, setUpdatingDatabase } = useCanvasStore.getState()
  if (updatingDatabase.is) return false
  setUpdatingDatabase({ is: true, lastUpdated: Date.now(), progress: 0 })
  const response = await fetch(`/api/canvas/${canvasId}`, {
    method: "POST",
    body: JSON.stringify({
      database: stringData,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.ok
}

// Function which allows us to update the database
const useUpdateCanvasStore = (canvasId: string) => {
  const [cachedDatabase, setCachedDatabase] = useState<string | null>(null)
  const { updatingDatabase, setUpdatingDatabase, ...canvasStore } = useCanvasStore()
  const [initialRun, setInitialRun] = useState(false)
  const [debouncedCanvasStore, setDebouncedCanvasStore] = useState({
    items: canvasStore.items.map((item) =>
      item.itemType === "input" && item.type === InputType.CLOCK ? { ...item, value: undefined } : item
    ),
    wires: canvasStore.wires,
    variableValues: canvasStore.variableValues,
  })
  const [fetching, useFetch] = useTransition() // Allows us to run an async function while keeping track of the state of the function.

  // Debounce logic implemented using useEffect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCanvasStore({
        items: canvasStore.items.map((item) =>
          item.itemType === "input" && item.type === InputType.CLOCK ? { ...item, value: undefined } : item
        ),
        wires: canvasStore.wires,
        variableValues: canvasStore.variableValues,
      })
    }, 1000) // 1 second debounce

    return () => {
      clearTimeout(handler)
    }
  }, [canvasStore.items, canvasStore.wires, canvasStore.variableValues])

  useEffect(() => {
    if (canvasId === "demo") return
    if (!initialRun) {
      setInitialRun(true)
      return
    }
    if (getStorage()(`autoSave-${canvasId}`) === "false") return
    const stringified = SuperJSON.stringify(debouncedCanvasStore)
    if (stringified === cachedDatabase) return
    if (debouncedCanvasStore.items.length === 0 && debouncedCanvasStore.wires.length === 0) {
      // TODO: confirm with user if they want to continue and remove all data
      // console.log('AVOIDING SAVING EMPTY CANVAS')
      // return
    }
    // We cache the database string here so that we are not updating the database every time that the canvas store changes
    // This makes sure that we are not sending too many requests to our database.
    setCachedDatabase(stringified)
    if (updatingDatabase.is || fetching) return
    useFetch(async () => {
      const database = await updateDatabase(stringified, canvasId)
      if (database) {
        setUpdatingDatabase({ is: false, lastUpdated: Date.now(), progress: 0 })
      } else {
        setUpdatingDatabase({ is: false, lastUpdated: null, progress: 0 })
        console.error("Received error while saving canvas data.")
      }
    })
  }, [debouncedCanvasStore, canvasId, initialRun, cachedDatabase, updatingDatabase, fetching, useFetch])
}

export default useUpdateCanvasStore
