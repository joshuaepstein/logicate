import { GateType } from "./gate";
import { InputType } from "./inputs";

export type NodeType =
  | {
      type: "gate";
      gateType: GateType;
    }
  | {
      type: "input";
      inputType: InputType;
    };
