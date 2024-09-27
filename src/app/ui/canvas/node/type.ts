import { GateType } from './gates/types'
import { InputType } from './inputs/types'

export type NodeType =
  | {
      type: 'gate'
      node: GateType
    }
  | {
      type: 'input'
      node: InputType
    }
  | {
      type: 'output'
      node: OutputType
    }

export enum OutputType {
  LIGHT = 'LIGHT',
  VARIABLE = 'VARIABLE',
}
