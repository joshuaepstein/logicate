import { cn } from "@/lib"
import { InputItem } from "../../../types"

export default function VariableBody({ input }: { input?: InputItem }) {
  return (
    <svg
      width="10"
      height="21"
      viewBox="0 0 10 21"
      style={{ overflow: "visible", width: "10px", height: "21px" }}
      className={cn("pointer-events-none flex items-center justify-center")}
      data-logicate-input-content
      data-logicate-input-variable={input?.settings.expressionLetter}
    >
      {/* Text with the letter A in the middle of the svg component */}
      <text
        x="50%"
        y="60%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill={(input && input.settings.color) || "#000"}
      >
        {(input && input.settings.expressionLetter) || "?"}
      </text>
    </svg>
  )
}
