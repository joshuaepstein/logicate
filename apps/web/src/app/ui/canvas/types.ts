import { NodeType } from "./node/type";
interface Item {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  value: boolean | null;
  inputs: string[];
  outputs: string[];
  computedValue?: boolean;
}

interface Wire {
  from: string;
  to: string;
  id: string;
  active?: boolean;
}

interface TempWire {
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
  active: boolean;
}

export type { Item, TempWire, Wire };
