import { GateType } from './node/gates/types'
import { InputType } from './node/inputs/types'
import { OutputType } from './node/type'

type Alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'

type ConnectedNode = {
  id: string
  node_index: number
}

type GateItem = {
  id: string
  type: GateType
  x: number
  y: number
  inputs: ConnectedNode[]
  outputs: ConnectedNode[]
  computedValue?: boolean
  settings: {
    color?: `#${string}`
    inputs: number
    label?: string
  }
  itemType: 'gate'
}

type InputItem = {
  id: string
  type: InputType
  x: number
  y: number
  outputs: ConnectedNode[]
  value: boolean
  settings: {
    color?: string
    label?: string
    constant?: boolean
    expressionLetter?: Alphabet
  }
  itemType: 'input'
}

type OutputItem = {
  id: string
  type: OutputType
  x: number
  y: number
  inputs: ConnectedNode[]
  computedValue?: boolean
  settings: {
    color?: string
    label?: string
    expressionLetter?: Alphabet
  }
  itemType: 'output'
}

type Item = GateItem | InputItem | OutputItem

interface Wire {
  from: {
    id: string
    node_index: number
  }
  to: {
    id: string
    node_index: number
  }
  id: string
  active?: boolean
}

export type TypeWire = Wire

interface TempWire {
  from: {
    x: number
    y: number
  }
  fromId: string
  fromNodeIndex: number
  fromTerminal: 'input' | 'output'
  to: {
    x: number
    y: number
  }
  active: boolean
}

type SelectedItem = Item & { selectedType: 'item' }
type SelectedWire = Wire & { selectedType: 'wire' }

type Selected = SelectedItem | SelectedWire

export type RecentAction =
  | {
      action: 'add' | 'remove' | 'update'
      type: 'item'
      id: string
      oldState: Item
      newState: Item
      datetime: number
    }
  | {
      action: 'add' | 'remove' | 'update'
      type: 'wire'
      id: string
      oldState: Wire
      newState: Wire
      datetime: number
    }

export type { Alphabet, GateItem, InputItem, Item, OutputItem, TempWire, Wire, Selected, SelectedItem, SelectedWire }
