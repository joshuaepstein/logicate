export const gates = {
  AND: (inputs: boolean[]) => inputs.length > 0 && inputs.every(Boolean),
  OR: (inputs: boolean[]) => inputs.length > 0 && inputs.some(Boolean),
  NOT: (inputs: boolean[]) => inputs.length > 0 && inputs.every(Boolean),
  NAND: (inputs: boolean[]) => inputs.length > 0 && !inputs.every(Boolean),
  NOR: (inputs: boolean[]) => inputs.length > 0 && !inputs.some(Boolean),
  XOR: (inputs: boolean[]) =>
    inputs.length > 0 && inputs.filter(Boolean).length % 2 !== 0,
  XNOR: (inputs: boolean[]) =>
    inputs.length > 0 && inputs.filter(Boolean).length % 2 === 0,
};
