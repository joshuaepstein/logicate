import { randomGateId, randomWireId } from "@/lib/id"
import { GateType } from "./node/gates/types"
import { InputType } from "./node/inputs/types"
import { Item, Wire } from "./types"

function getRandomEnum<T extends object>(enumObj: T): T[keyof T] {
  const values = Object.values(enumObj) as T[keyof T][]
  return values[Math.floor(Math.random() * values.length)]
}

export function generateRandomGate(): { items: Item[]; wires: Wire[] } {
  const items: Item[] = []
  const wires: Wire[] = []

  // Randomly select gate type
  const gateType = getRandomEnum(GateType) === GateType.NOT ? GateType.NOT : getRandomEnum(GateType)

  // Determine number of inputs (1 to 3, except for NOT gate which always has 1)
  const inputCount = 2

  // Generate main gate
  const mainGate: Item = {
    id: randomGateId(),
    type: gateType,
    x: 800,
    y: 400,
    inputs: [],
    outputs: [],
    computedValue: false,
    settings: {
      inputs: inputCount,
      color: "#000",
    },
    itemType: "gate",
  }
  items.push(mainGate)

  // Generate inputs
  for (let i = 0; i < inputCount; i++) {
    const inputType = getRandomEnum(InputType)
    const input: Item = {
      id: randomGateId(),
      type: inputType,
      x: 700 + i * 100,
      y: 300 + i * 100,
      value: inputType === InputType.HIGH_CONSTANT ? true : inputType === InputType.LOW_CONSTANT ? false : Math.random() < 0.5, // Randomly set initial value for other types
      outputs: [],
      settings: {},
      itemType: "input",
    }
    items.push(input)

    // Connect input to main gate
    const wire: Wire = {
      id: randomWireId(),
      from: {
        id: input.id,
        node_index: 0,
      },
      to: {
        id: mainGate.id,
        node_index: i,
      },
      active: input.value,
    }
    wires.push(wire)

    // Update main gate inputs
    mainGate.inputs.push({
      id: input.id,
      node_index: 0,
    })
  }

  return { items, wires }
}
