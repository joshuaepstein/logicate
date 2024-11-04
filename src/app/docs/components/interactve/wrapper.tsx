"use client"

import BackgroundElement from "@/app/ui/canvas/background-element"
import useCanvasStore from "@/app/ui/canvas/hooks/useCanvasStore"
import { gates } from "@/app/ui/canvas/node"
import { Gate } from "@/app/ui/canvas/node/gates"
import { Input } from "@/app/ui/canvas/node/inputs"
import { Output } from "@/app/ui/canvas/node/outputs"
import { Item, Wire } from "@/app/ui/canvas/types"
import { ConnectionWire } from "@/app/ui/canvas/wire"
import { useCallback, useEffect, useRef, useState } from "react"

export default function InteractiveWrapper({
  children,
  defaultItems,
  defaultWires,
}: {
  children?: React.ReactNode
  defaultItems?: Item[]
  defaultWires?: Wire[]
}) {
  const canvasReference = useRef<HTMLDivElement>(null)
  const { items, setItems, wires, setWires } = useCanvasStore()

  const [simulatedItemState, setSimulatedItemState] = useState<
    {
      id: string
      state: boolean
    }[]
  >([])
  const [simulatedWires, setSimulatedWires] = useState<
    {
      id: string
      active: boolean
    }[]
  >([])

  useEffect(() => {
    setItems(defaultItems || [])
  }, [defaultItems])

  useEffect(() => {
    setWires(defaultWires || [])
  }, [defaultWires])

  const simulate = useCallback(() => {
    const { items, wires } = useCanvasStore.getState()
    const newSimulatedItems: { id: string; state: boolean }[] = []
    const newSimulatedWires: { id: string; active: boolean }[] = []

    const getValue = (id: string) => {
      const simulatedItem = newSimulatedItems.find((item) => item.id === id)
      if (simulatedItem) return simulatedItem.state
      const item = items.find((item) => item.id === id)
      if (!item) return false
      if (item.itemType === "input") {
        // if (item.type === InputType.VARIABLE && item.settings.expressionLetter) {
        //   return variableValues.some((v) => v.letter === item.settings.expressionLetter && v.value)
        // }
        return item.value || false
      }
      return false
    }

    const simulateItem = (id: string) => {
      const item = items.find((item) => item.id === id)
      if (!item) return false

      if (item.itemType === "input") {
        // if (item.type === InputType.VARIABLE && item.settings.expressionLetter) {
        //   return variableValues.some((v) => v.letter === item.settings.expressionLetter && v.value)
        // }
        return item.value || false
      } else if (item.itemType === "gate" || item.itemType === "output") {
        const inputWires = wires.filter((wire) => wire.to.id === id)
        const inputValues = inputWires.map((wire) => getValue(wire.from.id))

        if (item.itemType === "output") {
          return inputValues[0] || false
        } else if (item.type in gates) {
          // Check if the item has a custom input number set and if it matches the actual inputs
          if (item.settings.inputs && item.settings.inputs !== inputValues.length) {
            return false
          }
          return gates[item.type](inputValues)
        }
      }
      return false
    }

    const maxIterations = items.length * 2 // Prevent infinite loops
    let iteration = 0
    let changed = true

    while (changed && iteration < maxIterations) {
      changed = false
      iteration++

      items.forEach((item) => {
        const oldState = getValue(item.id)
        const newState = simulateItem(item.id)

        if (oldState !== newState) {
          changed = true
          newSimulatedItems.push({ id: item.id, state: newState })
        }
      })
    }

    // Update simulated wires
    wires.forEach((wire) => {
      const fromState = getValue(wire.from.id)
      newSimulatedWires.push({ id: wire.id, active: fromState })
    })

    setSimulatedItemState(newSimulatedItems)
    setSimulatedWires(newSimulatedWires)
  }, [])

  useEffect(() => {
    simulate()
  }, [items, wires])

  return (
    <div className="shadow-hard-2xs relative h-full min-h-[200px] w-full overflow-hidden rounded-md" data-logicate-canvas>
      {items.map((item) =>
        item.itemType === "gate" ? (
          <Gate
            key={item.id}
            type={item.type}
            inputs={item.settings.inputs ?? 0}
            state={item.computedValue ?? false}
            gateId={item.id}
            x={item.x}
            y={item.y}
            simulated={
              simulatedItemState.find((item) => item.id === item.id) ?? {
                id: item.id,
                state: false,
              }
            }
            demo={false}
          />
        ) : item.itemType === "input" ? (
          <Input
            key={item.id}
            type={item.type}
            value={item.value ?? false}
            inputId={item.id}
            x={item.x}
            y={item.y}
            simulated={
              simulatedItemState.find((item) => item.id === item.id) ?? {
                id: item.id,
                state: false,
              }
            }
            input={item}
          />
        ) : item.itemType === "output" ? (
          <Output
            key={item.id}
            type={item.type}
            output={item}
            simulated={
              simulatedItemState.find((item1) => item1.id === item.id) || {
                id: item.id,
                state: false,
              }
            }
            outputId={item.id}
            value={item.computedValue || false}
            x={item.x}
            y={item.y}
          />
        ) : null
      )}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {wires.map((wire, index) => (
          <ConnectionWire key={index} wire={wire} simulatedWires={simulatedWires} />
        ))}
      </svg>
      <BackgroundElement showBackground canvasReference={canvasReference} />
    </div>
  )
}
