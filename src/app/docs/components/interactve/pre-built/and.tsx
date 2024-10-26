import { GateType } from "@/app/ui/canvas/node/gates/types"
import { InputType } from "@/app/ui/canvas/node/inputs/types"
import { OutputType } from "@/app/ui/canvas/node/outputs/types"
import InteractiveWrapper from "../wrapper"

export default function AndInteractive() {
  return (
    <InteractiveWrapper
      defaultItems={[
        {
          id: "input-1",
          itemType: "input",
          outputs: [],
          settings: {},
          type: InputType.SWITCH,
          value: false,
          x: 30,
          y: 30,
        },
        {
          id: "input-2",
          itemType: "input",
          outputs: [{ id: "and-gate", node_index: 1 }],
          settings: {},
          type: InputType.SWITCH,
          value: false,
          x: 30,
          y: 100,
        },
        {
          id: "and-gate",
          inputs: [
            { id: "input-1", node_index: 0 },
            { id: "input-2", node_index: 1 },
          ],
          outputs: [{ id: "output", node_index: 0 }],
          itemType: "gate",
          settings: {
            inputs: 2,
          },
          type: GateType.AND,
          x: 150,
          y: 70,
          computedValue: false,
        },
        {
          id: "output",
          itemType: "output",
          inputs: [
            {
              id: "and-gate",
              node_index: 0,
            },
          ],
          settings: {},
          type: OutputType.LIGHT,
          x: 300,
          y: 30,
        },
      ]}
      defaultWires={[
        {
          from: {
            id: "input-1",
            node_index: 0,
          },
          to: {
            id: "and-gate",
            node_index: 0,
          },
          id: "wire-1",
          active: false,
        },
        {
          from: {
            id: "input-2",
            node_index: 0,
          },
          to: {
            id: "and-gate",
            node_index: 1,
          },
          id: "wire-2",
          active: false,
        },
        {
          from: {
            id: "and-gate",
            node_index: 0,
          },
          to: {
            id: "output",
            node_index: 0,
          },
          id: "wire-3",
          active: false,
        },
      ]}
    />
  )
}
