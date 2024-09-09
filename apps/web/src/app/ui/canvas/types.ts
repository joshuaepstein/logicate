import { GateType } from './node';
import { InputType } from './node/inputs';
import { OutputType } from './node/type';

type Alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

type ConnectedNode = {
  id: string;
  node_index: number;
};

type GateItem = {
  id: string;
  type: GateType;
  x: number;
  y: number;
  inputs: ConnectedNode[];
  outputs: ConnectedNode[];
  computedValue?: boolean;
  settings: {
    color?: `#${string}`;
    inputs: number;
    label?: string;
  };
  itemType: 'gate';
};

type InputItem = {
  id: string;
  type: InputType;
  x: number;
  y: number;
  outputs: ConnectedNode[];
  value: boolean;
  settings: {
    color?: string;
    label?: string;
    constant?: boolean;
    expressionLetter?: Alphabet;
  };
  itemType: 'input';
};

type OutputItem = {
  id: string;
  type: OutputType;
  x: number;
  y: number;
  inputs: ConnectedNode[];
  computedValue?: boolean;
  settings: {
    color?: string;
    label?: string;
    expressionLetter?: Alphabet;
  };
  itemType: 'output';
};

type Item = GateItem | InputItem | OutputItem;

interface Wire {
  from: {
    id: string;
    node_index: number;
  };
  to: {
    id: string;
    node_index: number;
  };
  id: string;
  active?: boolean;
}

interface TempWire {
  from: {
    x: number;
    y: number;
  };
  fromId: string;
  fromNodeIndex: number;
  fromTerminal: 'input' | 'output';
  to: {
    x: number;
    y: number;
  };
  active: boolean;
}

export type { Alphabet, GateItem, InputItem, Item, OutputItem, TempWire, Wire };
