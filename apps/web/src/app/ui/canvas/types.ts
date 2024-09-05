import { GateType } from "./node/gate";
import { InputType } from "./node/inputs";
import { OutputType } from "./node/type";

type Item =
  | {
      id: string;
      type: GateType;
      x: number;
      y: number;
      inputs: string[];
      outputs: string[];
      computedValue?: boolean;
      itemType: "gate";
    }
  | {
      id: string;
      type: InputType;
      x: number;
      y: number;
      outputs: string[];
      value: boolean;
      itemType: "input";
    }
  | {
      id: string;
      type: OutputType;
      x: number;
      y: number;
      inputs: string[];
      computedValue?: boolean;
      itemType: "output";
    };

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
  fromId: string;
  to: {
    x: number;
    y: number;
  };
  active: boolean;
}

export type { Item, TempWire, Wire };
