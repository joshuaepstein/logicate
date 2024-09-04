import { GateType } from "./node/gate";
import { InputType } from "./node/inputs";
import { OutputType } from "./node/type";

type Alphabet = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

type GateItem = {
  id: string;
  type: GateType;
  x: number;
  y: number;
  inputs: string[];
  outputs: string[];
  computedValue?: boolean;
  settings: {
    inputs: number;
    label?: string;
  };
  itemType: "gate";
};

type InputItem = {
  id: string;
  type: InputType;
  x: number;
  y: number;
  outputs: string[];
  value: boolean;
  settings: {
    label?: string;
    constant?: boolean;
    expressionLetter?: Alphabet;
  };
  itemType: "input";
};

type OutputItem = {
  id: string;
  type: OutputType;
  x: number;
  y: number;
  inputs: string[];
  computedValue?: boolean;
  settings: {
    label?: string;
    expressionLetter?: Alphabet;
  };
  itemType: "output";
};

type Item = GateItem | InputItem | OutputItem;

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

export type { Alphabet, GateItem, InputItem, Item, OutputItem, TempWire, Wire };
