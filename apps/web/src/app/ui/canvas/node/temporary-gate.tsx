import { cn } from "@logicate/ui";
import { forwardRef, useMemo } from "react";
import { defaultInputs, GateType, gateTypeToIcon } from "./gate";

const inverted = [GateType.NOT, GateType.NAND, GateType.NOR, GateType.XNOR];

type GateState = boolean | number | string | null;

export type TemporaryGateProps = {
  type: GateType;
  inputs: number;
  state: GateState;
  gateId: string;
};

export const TemporaryGate = forwardRef<
  HTMLDivElement,
  TemporaryGateProps & {
    x: number;
    y: number;
    canvasZoom: number;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, inputs, x, y, state, gateId, canvasZoom, ...rest }, ref) => {
  const isInverted = useMemo(() => {
    return inverted.includes(type);
  }, [type]);
  const isOrType = useMemo(() => {
    return type === GateType.OR || type === GateType.NOR;
  }, [type]);
  const isXorXnorType = useMemo(() => {
    return type === GateType.XOR || type === GateType.XNOR;
  }, [type]);

  return (
    <>
      <div
        className={cn(
          "grid w-auto outline-none absolute origin-top-left items-center justify-center select-none cursor-default pointer-events-none",
        )}
        style={{ left: x, top: y, transform: `scale(${canvasZoom})` }}
        tabIndex={-1}
        ref={ref}
        data-logicate-temporary-dragging-node
        {...rest}
      >
        <div
          className="flex flex-col items-start justify-center"
          style={{
            gridColumn: "3 / span 1",
            gridRow: "2 / span 1",
          }}
        >
          <div className="flex flex-row w-7 items-center relative mb-[2.5px] last-of-type:mb-0">
            <div className="order-2 z-[1] pointer-events-auto" style={{ lineHeight: 0 }}>
              <svg
                style={{
                  overflow: "visible",
                  width: "12.5px",
                  height: "12.5px",
                }}
                className="pointer-events-auto hover:scale-[1.2] transition-transform"
              >
                <circle cx="6.5" cy="6.5" r="6" stroke="black" strokeWidth="1" fill="white"></circle>
              </svg>
            </div>
            <div className="grow order-1 h-[2px] bg-black min-w-4"></div>
            <div
              className={cn("-order-1 z-[1] h-2 w-2 border-2 border-black rounded-[50%] bg-white absolute", {
                hidden: !isInverted,
              })}
            ></div>
          </div>
        </div>
        <div
          className="flex flex-col items-end justify-center"
          style={{
            gridColumn: "1 / span 1",
            gridRow: "2 / span 1",
          }}
        >
          {Array.from({
            length:
              // either the inputs or the default inputs (if inputs is less than defaultInputs[type])
              Math.max(inputs, defaultInputs[type].default),
          }).map((_, index) => (
            <div
              key={index}
              className="pointer-events-none flex flex-row w-7 items-center mb-[2.5px] relative last-of-type:mb-0"
            >
              <div
                className="z-[1] relative"
                style={{
                  lineHeight: 0,
                }}
              >
                <svg
                  style={{
                    overflow: "visible",
                    width: "12.5px",
                    height: "12.5px",
                  }}
                  className="pointer-events-auto hover:scale-[1.2] transition-transform"
                  data-logicate-input-terminal={index}
                >
                  <circle cx="6.5" cy="6.5" r="6" stroke="black" strokeWidth="1" fill="white"></circle>
                </svg>
              </div>
              <div className="grow min-w-4 h-[2px] bg-black"></div>
              <div className="hidden z-[1] h-2 w-2 border-2 border-black rounded-[50%] bg-white absolute"></div>
            </div>
          ))}
        </div>
        <div
          className={cn("bg-transparent w-8 min-h-8 min-w-[30px] border-black flex justify-center items-center", {
            "border-none": inputs < 4,
            "border-l-2 my-[5.25px] self-stretch": inputs > 3,
            "-ml-[4.5px] -mr-px w-[36px]": isOrType,
            "-ml-[9px] -mr-px w-[40px]": isXorXnorType,
          })}
          style={{
            gridColumn: "2 / span 1",
            gridRow: "2 / span 1",
          }}
        >
          <div className="pointer-events-auto w-full h-full flex items-center justify-center">
            <span
              className={cn("w-8 min-h-8 bg-no-repeat", {
                "-ml-[2px]": inputs > 3,
                "w-[38px]": isOrType,
                "w-[40px]": isXorXnorType,
              })}
              style={{
                backgroundImage: `url(${gateTypeToIcon[type]})`,
              }}
              data-logicate-body
            />
          </div>
        </div>
      </div>
    </>
  );
});

TemporaryGate.displayName = "Temporary Logicate Logic Gate";
