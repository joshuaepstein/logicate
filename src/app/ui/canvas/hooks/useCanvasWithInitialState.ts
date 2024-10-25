// useCanvasWithInitialState - Should take in the logicateSession and return the canvas store

import { LogicateSession } from "@logicate/database"
import { Item, TypeWire } from "../types"
import useCanvasStore from "./useCanvasStore"

export const useCanvasWithInitialState = (logicateSession: LogicateSession) => {
  const canvasStore = useCanvasStore()
  if (logicateSession) {
    if (logicateSession.items) {
      canvasStore.setItems(logicateSession.items as Item[])
    }
    if (logicateSession.wires) {
      canvasStore.setWires(logicateSession.wires as unknown as TypeWire[])
    }
  }

  return canvasStore
}
