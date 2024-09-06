import { cn } from "@logicate/ui";
import { useNode } from "./hooks/useNode";

type WireType = {
  start: { x: number; y: number };
  end: { x: number; y: number };
  isActive: boolean;
  type: "normal";
};

type WireTypeAlt = {
  startId: string;
  endId: string;
  isActive: boolean;
  type: "alt";
};

type WireProps = WireType | WireTypeAlt;

export const Wire = (props: WireProps) => {
  if (props.type === "normal") {
    const { start, end, isActive } = props;

    return (
      <svg className="absolute left-0 top-0 overflow-visible pointer-events-none" data-logicate-signal={isActive}>
        <path
          d={`
              M ${start.x},${start.y}
              C ${start.x + (end.x - start.x) / 2},${start.y}
                ${start.x + (end.x - start.x) / 2},${end.y}
                ${end.x},${end.y}
              `}
          // stroke={isActive ? "#4CAF50" : "#9E9E9E"}
          // strokeWidth="2"
          // fill="none"
          stroke="black"
          fill="none"
          strokeWidth="6"
        />
        <path
          d={`
              M ${start.x},${start.y}
              C ${start.x + (end.x - start.x) / 2},${start.y}
                ${start.x + (end.x - start.x) / 2},${end.y}
                ${end.x},${end.y}
              `}
          strokeWidth="4"
          fill="none"
          className={cn("stroke-current text-white", {
            "text-white": !isActive,
            "text-[#1b88e7]": isActive,
          })}
        />
      </svg>
    );
  } else {
    const { startId, endId, isActive } = props;
    const start = useNode(startId);
    const end = useNode(endId);

    if (!start || !end) return null;

    return (
      <svg className="absolute left-0 top-0 overflow-visible pointer-events-none" data-logicate-signal={isActive}>
        <path
          d={`
              M ${start.x},${start.y}
              C ${start.x + (end.x - start.x) / 2},${start.y}
                ${start.x + (end.x - start.x) / 2},${end.y}
                ${end.x},${end.y}
              `}
          // stroke={isActive ? "#4CAF50" : "#9E9E9E"}
          // strokeWidth="2"
          // fill="none"
          stroke="black"
          fill="none"
          strokeWidth="6"
          style={{
            pointerEvents: "visible",
          }}
          // TODO: Onclick should select the wire
        />
        <path
          d={`
              M ${start.x},${start.y}
              C ${start.x + (end.x - start.x) / 2},${start.y}
                ${start.x + (end.x - start.x) / 2},${end.y}
                ${end.x},${end.y}
              `}
          strokeWidth="4"
          fill="none"
          className={cn("stroke-current text-white", {
            "text-white": !isActive,
            "text-[#1b88e7]": isActive,
          })}
        />
      </svg>
    );
  }
};
