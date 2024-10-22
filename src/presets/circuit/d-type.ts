import { GateType } from '@/app/ui/canvas/node/gates/types'
import { InputType } from '@/app/ui/canvas/node/inputs/types'
import { OutputType } from '@/app/ui/canvas/node/outputs/types'
import { Item, Wire } from '@/app/ui/canvas/types'
import { randomGateId } from '@/lib/id'

/**
 * D-Type Flip-Flop is a digital circuit that stores a single bit of information.
 *
 * Layout:
 *  - 2 Inputs: Switch (D) and Clock (CLK)
 *  - 2 Outputs (Both Light Bulbs)
 *  - 2 AND Gates
 *  - 1 NOT Gate
 *  - 2 NOR Gates
 *
 */
export const DTypeFlipFlop = (): {
  items: Item[]
  wires: Wire[]
} => {
  return {
    items: [
      {
        id: 'clock-input',
        itemType: 'input',
        type: InputType.CLOCK,
        x: 100,
        y: 100,
        outputs: [],
        value: false,
        settings: {},
      },
      {
        id: 'switch-input',
        itemType: 'input',
        type: InputType.SWITCH,
        x: 100,
        y: 200,
        outputs: [],
        value: false,
        settings: {},
      },
      {
        id: 'not-gate',
        itemType: 'gate',
        type: GateType.NOT,
        x: 200,
        y: 100,
        inputs: [{ id: 'switch-input', node_index: 0 }],
        outputs: [],
        settings: {
          inputs: 1,
        },
      },
      {
        id: 'and-gate-1',
        itemType: 'gate',
        type: GateType.AND,
        inputs: [
          { id: 'not-gate', node_index: 0 },
          { id: 'clock-input', node_index: 0 },
        ],
        outputs: [],
        settings: {
          inputs: 2,
        },
        x: 300,
        y: 100,
      },
      {
        id: 'and-gate-2',
        itemType: 'gate',
        type: GateType.AND,
        inputs: [
          { id: 'switch-input', node_index: 0 },
          { id: 'clock-input', node_index: 0 },
        ],
        outputs: [],
        settings: {
          inputs: 2,
        },
        x: 300,
        y: 200,
      },
      {
        id: 'nor-gate-1',
        itemType: 'gate',
        type: GateType.NOR,
        inputs: [
          { id: 'and-gate-1', node_index: 0 },
          { id: 'nor-gate-2', node_index: 0 },
        ],
        outputs: [],
        settings: {
          inputs: 2,
        },
        x: 400,
        y: 100,
      },
      {
        id: 'nor-gate-2',
        itemType: 'gate',
        type: GateType.NOR,
        inputs: [
          { id: 'and-gate-2', node_index: 0 },
          { id: 'nor-gate-1', node_index: 0 },
        ],
        outputs: [],
        settings: {
          inputs: 1,
        },
        x: 400,
        y: 200,
      },
      {
        id: 'output-1',
        itemType: 'output',
        type: OutputType.LIGHT,
        x: 500,
        y: 100,
        inputs: [{ id: 'nor-gate-1', node_index: 0 }],
        settings: {},
      },
      {
        id: 'output-2',
        itemType: 'output',
        type: OutputType.LIGHT,
        x: 500,
        y: 200,
        inputs: [{ id: 'nor-gate-2', node_index: 0 }],
        settings: {},
      },
    ],
    wires: [
      //   Should be 11 wires
      {
        id: 'wire-1',
        from: { id: 'clock-input', node_index: 0 },
        to: { id: 'and-gate-2', node_index: 0 },
      },
      {
        id: 'wire-2',
        from: { id: 'clock-input', node_index: 0 },
        to: { id: 'and-gate-1', node_index: 1 },
      },
      {
        id: 'wire-3',
        from: { id: 'switch-input', node_index: 0 },
        to: { id: 'not-gate', node_index: 0 },
      },
      {
        id: 'wire-4',
        from: { id: 'not-gate', node_index: 0 },
        to: { id: 'and-gate-1', node_index: 0 },
      },
      {
        id: 'wire-5',
        from: { id: 'switch-input', node_index: 0 },
        to: { id: 'and-gate-2', node_index: 1 },
      },
      {
        id: 'wire-6',
        from: { id: 'and-gate-1', node_index: 0 },
        to: { id: 'nor-gate-1', node_index: 0 },
      },
      {
        id: 'wire-7',
        from: { id: 'and-gate-2', node_index: 0 },
        to: { id: 'nor-gate-2', node_index: 1 },
      },
      {
        id: 'wire-8',
        from: { id: 'nor-gate-1', node_index: 0 },
        to: { id: 'output-1', node_index: 0 },
      },
      {
        id: 'wire-9',
        from: { id: 'nor-gate-2', node_index: 0 },
        to: { id: 'output-2', node_index: 0 },
      },
      {
        id: 'wire-10',
        from: { id: 'nor-gate-1', node_index: 0 },
        to: { id: 'nor-gate-2', node_index: 0 },
      },
      {
        id: 'wire-11',
        from: { id: 'nor-gate-2', node_index: 0 },
        to: { id: 'nor-gate-1', node_index: 1 },
      },
    ],
  }
}
