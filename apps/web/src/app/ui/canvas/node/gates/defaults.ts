import { GateType } from './types';

export const defaultInputs: Record<
  GateType,
  {
    min: number;
    max: number;
    default: number;
  }
> = {
  [GateType.AND]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.OR]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.NOT]: {
    default: 1,
    min: 1,
    max: 1,
  },
  [GateType.XOR]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.NAND]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.NOR]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.XNOR]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.BUFFER]: {
    default: 1,
    min: 1,
    max: 1,
  },
};
