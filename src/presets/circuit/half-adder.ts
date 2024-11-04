import { GateType } from "@/app/ui/canvas/node/gates/types"
import { InputType } from "@/app/ui/canvas/node/inputs/types"
import { OutputType } from "@/app/ui/canvas/node/outputs/types"
import { Item, Wire } from "@/app/ui/canvas/types"

/**
 * Half-Adder is a digital circuit that adds two single binary digits.
 *
 * Layout:
 *  - 2 Inputs: A and B
 *  - 2 Outputs: Sum and Carry
 *  - 2 AND Gates
 *  - 1 OR Gate
 *  - 2 NOT Gates
 *
 * TODO: Make a bit more spacious - its currently very cramped when on the canvas, all the items are so close to each other.
 */
export const HalfAdder = (): {
  items: Item[]
  wires: Wire[]
} => {
  return {
    items: [
      {
        id: "input-A",
        itemType: "input",
        type: InputType.SWITCH,
        x: 100,
        y: 100,
        outputs: [],
        value: false,
        settings: {},
      },
      {
        id: "input-B",
        itemType: "input",
        type: InputType.SWITCH,
        x: 100,
        y: 200,
        outputs: [],
        value: false,
        settings: {},
      },
      {
        id: "not-A",
        itemType: "gate",
        type: GateType.NOT,
        x: 200,
        y: 100,
        inputs: [{ id: "input-A", node_index: 0 }],
        outputs: [],
        settings: {
          inputs: 1,
        },
      },
      {
        id: "not-B",
        itemType: "gate",
        type: GateType.NOT,
        x: 200,
        y: 200,
        inputs: [{ id: "input-B", node_index: 0 }],
        outputs: [],
        settings: {
          inputs: 1,
        },
      },
      {
        id: "and1",
        itemType: "gate",
        type: GateType.AND,
        x: 300,
        y: 100,
        inputs: [
          { id: "input-A", node_index: 0 },
          { id: "not-B", node_index: 0 },
        ],
        outputs: [],
        settings: {
          inputs: 2,
        },
      },
      {
        id: "and2",
        itemType: "gate",
        type: GateType.AND,
        x: 300,
        y: 200,
        inputs: [
          { id: "input-B", node_index: 0 },
          { id: "not-A", node_index: 0 },
        ],
        outputs: [],
        settings: {
          inputs: 2,
        },
      },
      {
        id: "or-sum",
        itemType: "gate",
        type: GateType.OR,
        x: 400,
        y: 150,
        inputs: [
          { id: "and1", node_index: 0 },
          { id: "and2", node_index: 0 },
        ],
        outputs: [],
        settings: {
          inputs: 2,
        },
      },
      {
        id: "and-carry",
        itemType: "gate",
        type: GateType.AND,
        x: 300,
        y: 300,
        inputs: [
          { id: "input-A", node_index: 0 },
          { id: "input-B", node_index: 0 },
        ],
        outputs: [],
        settings: {
          inputs: 2,
        },
      },
      {
        id: "output-sum",
        itemType: "output",
        type: OutputType.LIGHT,
        x: 500,
        y: 150,
        inputs: [{ id: "or-sum", node_index: 0 }],
        settings: {},
      },
      {
        id: "output-carry",
        itemType: "output",
        type: OutputType.LIGHT,
        x: 500,
        y: 300,
        inputs: [{ id: "and-carry", node_index: 0 }],
        settings: {},
      },
    ],
    wires: [
      {
        id: "wire-1",
        from: { id: "input-A", node_index: 0 },
        to: { id: "not-A", node_index: 0 },
      },
      {
        id: "wire-2",
        from: { id: "input-B", node_index: 0 },
        to: { id: "not-B", node_index: 0 },
      },
      {
        id: "wire-3",
        from: { id: "input-A", node_index: 0 },
        to: { id: "and1", node_index: 0 },
      },
      {
        id: "wire-4",
        from: { id: "not-B", node_index: 0 },
        to: { id: "and1", node_index: 1 },
      },
      {
        id: "wire-5",
        from: { id: "input-B", node_index: 0 },
        to: { id: "and2", node_index: 0 },
      },
      {
        id: "wire-6",
        from: { id: "not-A", node_index: 0 },
        to: { id: "and2", node_index: 1 },
      },
      {
        id: "wire-7",
        from: { id: "and1", node_index: 0 },
        to: { id: "or-sum", node_index: 0 },
      },
      {
        id: "wire-8",
        from: { id: "and2", node_index: 0 },
        to: { id: "or-sum", node_index: 1 },
      },
      {
        id: "wire-9",
        from: { id: "or-sum", node_index: 0 },
        to: { id: "output-sum", node_index: 0 },
      },
      {
        id: "wire-10",
        from: { id: "input-A", node_index: 0 },
        to: { id: "and-carry", node_index: 0 },
      },
      {
        id: "wire-11",
        from: { id: "input-B", node_index: 0 },
        to: { id: "and-carry", node_index: 1 },
      },
      {
        id: "wire-12",
        from: { id: "and-carry", node_index: 0 },
        to: { id: "output-carry", node_index: 0 },
      },
    ],
  }
}
