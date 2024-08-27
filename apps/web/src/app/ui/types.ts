import { gates } from "./gates";

interface Item {
  id: number;
  type: keyof typeof gates | "INPUT" | "OUTPUT";
  x: number;
  y: number;
  value: boolean | null;
  inputs: number[];
  outputs: number[];
  computedValue?: boolean;
}

interface Wire {
  from: number;
  to: number;
}

export type { Item, Wire };
