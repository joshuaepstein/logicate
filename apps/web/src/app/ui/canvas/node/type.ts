import { GateType } from "./gate";
import { InputType } from "./inputs";

export type NodeType =
  | {
      type: "gate";
      node: GateType;
    }
  | {
      type: "input";
      node: InputType;
    };

export enum OutputType {
  LIGHT,
}