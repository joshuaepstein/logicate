import { cn } from '@logicate/ui';
import { forwardRef } from 'react';
import { InputType } from '.';

export type TemporaryInputProps = {
  type: InputType;
  inputId: string;
};

export const TemporaryInput = forwardRef<
  HTMLDivElement,
  TemporaryInputProps & {
    x: number;
    y: number;
    canvasZoom: number;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, x, y, inputId, canvasZoom, ...rest }, ref) => {
  return (
    <>
      <div
        className={cn(
          'pointer-events-none absolute grid w-auto origin-top-left cursor-default select-none items-center justify-center outline-none'
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
            gridColumn: '3 / span 1',
            gridRow: '2 / span 1',
          }}
        >
          <div className="relative mb-[2.5px] flex w-7 flex-row items-center last-of-type:mb-0">
            <div className="pointer-events-auto z-[1] order-2" style={{ lineHeight: 0 }}>
              <svg
                style={{
                  overflow: 'visible',
                  width: '12.5px',
                  height: '12.5px',
                }}
                className="pointer-events-auto transition-transform hover:scale-[1.2]"
              >
                <circle cx="6.5" cy="6.5" r="6" stroke="black" strokeWidth="1" fill="white"></circle>
              </svg>
            </div>
            <div className="order-1 h-[2px] min-w-4 grow bg-black"></div>
          </div>
        </div>
        <div
          className={cn('flex min-h-[42px] w-[42px] min-w-[42px] items-center justify-center border-2 border-black bg-white')}
          style={{
            gridColumn: '2 / span 1',
            gridRow: '2 / span 1',
          }}
        >
          <div className="pointer-events-auto flex h-full w-full items-center justify-center">
            <svg style={{ overflow: 'visible', width: '30px', height: '30px' }} className={cn('')} data-logicate-body>
              <g>
                <circle
                  //class="signalFill"
                  className={cn({
                    // "text-blue-700 fill-current": computedValue === true,
                  })}
                  fill="#FFFFFF"
                  stroke="#000000"
                  cx="15"
                  cy="15"
                  r="15"
                ></circle>
                <circle
                  // class="buttonSurface"
                  className="cursor-pointer"
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1"
                  cx="15"
                  cy="15"
                  r="11"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
});

TemporaryInput.displayName = 'Temporary Logicate Logic Input';
