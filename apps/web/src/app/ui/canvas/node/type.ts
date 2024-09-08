import { GateType } from './gate';
import { InputType } from './inputs';

export type NodeType =
  | {
      type: 'gate';
      node: GateType;
    }
  | {
      type: 'input';
      node: InputType;
    }
  | {
      type: 'output';
      node: OutputType;
    };

export enum OutputType {
  LIGHT,
}
