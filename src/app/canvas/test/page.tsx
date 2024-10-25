import { GateType } from "@/app/ui/canvas/node/gates/types"
import { InputType } from "@/app/ui/canvas/node/inputs/types"
import { OutputType } from "@/app/ui/canvas/node/outputs/types"
import { Item, Wire } from "@/app/ui/canvas/types"
import { Suspense } from "react"
import Canvas from "../../ui/canvas"

export default async function Home() {
  const testing: {
    items: Item[]
    wires: Wire[]
  } = {
    items: [
      {
        id: "1",
        type: InputType.SWITCH,
        itemType: "input",
        outputs: [],
        settings: {},
        value: false,
        x: 400,
        y: 100,
      },
      {
        id: "2",
        type: InputType.SWITCH,
        itemType: "input",
        outputs: [],
        settings: {},
        value: false,
        x: 400,
        y: 300,
      },
      {
        id: "3",
        type: GateType.AND,
        itemType: "gate",
        settings: {
          inputs: 2,
        },
        x: 600,
        y: 200,
        computedValue: false,
        inputs: [],
        outputs: [],
      },
      {
        id: "4",
        type: OutputType.LIGHT,
        inputs: [],
        itemType: "output",
        settings: {},
        x: 800,
        y: 200,
      },
    ],
    wires: [
      { id: "w-1", from: { id: "1", node_index: 0 }, to: { id: "3", node_index: 0 } },
      { id: "w-2", from: { id: "2", node_index: 0 }, to: { id: "3", node_index: 1 } },
      { id: "w-3", from: { id: "3", node_index: 0 }, to: { id: "4", node_index: 0 } },
    ],
  }
  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col overflow-hidden">
      {/* <nav className="border-neutralgrey-400 h-16 w-full border-b">{session.user.name}</nav> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          sessionId="1239ua"
          isNew={false}
          logicateSession={{
            id: "demo",
            name: "Demo",
            createdAt: new Date(),
            items: testing.items,
            wires: [...testing.wires],
            variableValues: [],
            ownerId: "",
            updatedAt: new Date(),
          }}
          user={null}
        />
      </Suspense>
    </div>
  )
}
