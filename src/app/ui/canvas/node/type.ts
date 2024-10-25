import { GateType } from "./gates/types"
import { InputType } from "./inputs/types"
import { OutputType } from "./outputs/types"

export type NodeType =
  | {
      type: "gate"
      node: GateType
    }
  | {
      type: "input"
      node: InputType
    }
  | {
      type: "output"
      node: OutputType
    }
