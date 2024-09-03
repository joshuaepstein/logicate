import { Tooltip, TooltipContent, TooltipTrigger } from "@logicate/ui/tooltip";
import { gateTypeToIcon } from "./node/gate";
import { inputTypeToIcon } from "./node/inputs";
import { NodeType } from "./node/type";

export const DraggableItem = ({ type }: { type: NodeType }) => {
  return (
    <Tooltip key={type.type === "gate" ? type.gateType : type.inputType}>
      <TooltipTrigger asChild>
        <div
          key={type.type === "gate" ? type.gateType : type.inputType}
          className="rounded-sm shadow-hard-soft-2xs p-3 aspect-square w-max h-max"
          data-logicate-draggable
          data-logicate-draggable-sidebar
          data-logicate-gate-type-type={type.type}
          data-logicate-type={type.type === "gate" ? type.gateType : type.inputType}
        >
          <div
            className="size-6"
            style={{
              backgroundImage: `url(${type.type === "gate" ? gateTypeToIcon[type.gateType] : inputTypeToIcon[type.inputType]})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{type.type === "gate" ? type.gateType : type.inputType}</p>
      </TooltipContent>
    </Tooltip>
  );
};
