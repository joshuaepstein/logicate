import { GateType } from './gate';

export const gates: Record<GateType, (inputs: boolean[]) => boolean> = {
  [GateType.AND]: (inputs: boolean[]) => inputs.length > 0 && inputs.every(Boolean),
  [GateType.OR]: (inputs: boolean[]) => inputs.length > 0 && inputs.some(Boolean),
  [GateType.NOT]: (inputs: boolean[]) => inputs.length === 1 && !inputs[0],
  [GateType.NAND]: (inputs: boolean[]) => inputs.length > 0 && !inputs.every(Boolean),
  [GateType.NOR]: (inputs: boolean[]) => inputs.length > 0 && !inputs.some(Boolean),
  [GateType.XOR]: (inputs: boolean[]) => inputs.length > 0 && inputs.filter(Boolean).length % 2 !== 0,
  [GateType.XNOR]: (inputs: boolean[]) => inputs.length > 0 && inputs.filter(Boolean).length % 2 === 0,
  [GateType.BUFFER]: (inputs: boolean[]) => inputs.length > 0 && inputs[0],
};
