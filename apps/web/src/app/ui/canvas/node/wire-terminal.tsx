import { forwardRef } from "react";

export type WireTerminalProps = {
  isInput?: boolean;
  isOutput?: boolean;
  isConnecting?: boolean;
  canBeConnected?: boolean;
};

export const WireTerminal = forwardRef<
  SVGSVGElement,
  WireTerminalProps & React.HTMLAttributes<SVGSVGElement>
>(
  (
    { isInput, isOutput, isConnecting, canBeConnected, style, ...rest },
    ref,
  ) => {
    return (
      <>
        <svg
          style={{
            overflow: "visible",
            width: "12.5px",
            height: "12.5px",
            ...style,
          }}
          ref={ref}
          {...rest}
        >
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            stroke="black"
            strokeWidth="1"
            fill="white"
          ></circle>
        </svg>
      </>
    );
  },
);
