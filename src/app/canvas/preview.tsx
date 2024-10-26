"use client"

import { LogicateSession } from "@/database"
import { useEffect, useState } from "react"
import { Gate } from "../ui/canvas/node/gates"
import { Input } from "../ui/canvas/node/inputs"
import { Output } from "../ui/canvas/node/outputs"
import { Item, Wire } from "../ui/canvas/types"
import { ConnectionWire } from "../ui/canvas/wire"

export default function CanvasPreview({ logicateSession }: { logicateSession: LogicateSession }) {
  const [items, setItems] = useState<Item[]>([])
  const [wires, setWires] = useState<Wire[]>([])

  const [center, setCenter] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!logicateSession.id) return
    setItems(logicateSession.items as Item[])
    setWires(logicateSession.wires as Wire[])
    const minimumX = Math.min(...(logicateSession.items as Item[]).map((item) => item.x))
    const maximumX = Math.max(...(logicateSession.items as Item[]).map((item) => item.x))
    const minimumY = Math.min(...(logicateSession.items as Item[]).map((item) => item.y))
    const maximumY = Math.max(...(logicateSession.items as Item[]).map((item) => item.y))
    setCenter({
      x: (minimumX + maximumX) / 2,
      y: (minimumY + maximumY) / 2,
    })
    console.log(center)
  }, [logicateSession])

  useEffect(() => {
    if (items.length === 0) return

    const minimumX = Math.min(...items.map((item) => item.x))
    const maximumX = Math.max(...items.map((item) => item.x))
    const minimumY = Math.min(...items.map((item) => item.y))
    const maximumY = Math.max(...items.map((item) => item.y))
    setCenter({
      x: (minimumX + maximumX) / 2,
      y: (minimumY + maximumY) / 2,
    })
    console.log(center)
  }, [items])

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full" data-logicate-canvas>
      <div className="absolute inset-0 z-20 h-full w-full scale-[0.25]" data-logicate-canvas-items>
        {items.map((item, index) =>
          item.itemType === "gate" ? (
            <Gate
              key={item.id}
              type={item.type}
              inputs={item.settings.inputs ?? 0}
              state={item.computedValue ?? false}
              gateId={item.id}
              x={item.x - center.x}
              y={item.y - center.y}
              simulated={{
                id: item.id,
                state: false,
              }}
              demo={false}
            />
          ) : item.itemType === "input" ? (
            <Input
              key={item.id}
              type={item.type}
              value={item.value ?? false}
              inputId={item.id}
              x={item.x - center.x}
              y={item.y - center.y}
              simulated={{
                id: item.id,
                state: false,
              }}
              input={item}
            />
          ) : item.itemType === "output" ? (
            <Output
              key={item.id}
              type={item.type}
              output={item}
              simulated={{
                id: item.id,
                state: false,
              }}
              outputId={item.id}
              value={item.computedValue || false}
              x={item.x - center.x}
              y={item.y - center.y}
            />
          ) : null
        )}
      </div>
      <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
        {wires.map((wire, index) => {
          return (
            <ConnectionWire
              key={index}
              wire={wire}
              customStrokeScale={0.25}
              simulatedWires={[]}
              itemsDefined={items}
              wiresDefined={wires}
            />
          )
        })}
      </svg>
    </div>
  )
}
