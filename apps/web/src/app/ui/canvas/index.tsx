"use client";

import { setCookie } from "@/lib/cookies";
import { CenterIcon, Eraser01Icon } from "@jfstech/icons-react/24/outline";
import { Button } from "@logicate/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@logicate/ui/modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@logicate/ui/not-done-yet/accordion";
import { randomGateId } from "@logicate/utils/id";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { SuperJSON } from "superjson";
import surface from "~/grid.png";
import { Gate, GateType, gateTypeToIcon } from "../node/gate";
import type { Item, Wire as TypeWire } from "../types";
import { Wire } from "../wire";
import useDisableHook from "./disable-hook";
import { Click } from "@logicate/utils/buttons";
import { TemporaryGate } from "../node/temporary-gate";

const DraggableItem = ({ type }: { type: GateType }) => {
  return (
    <div
      key={type}
      className="rounded-sm shadow-hard-soft-2xs p-3 aspect-square"
      data-logicate-draggable
      data-logicate-draggable-sidebar
      data-logicate-gate-type={type}
    >
      <div
        className="size-6"
        style={{
          backgroundImage: `url(${gateTypeToIcon[type]})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default function Canvas() {
  const canvasReference = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [wires, setWires] = useState<TypeWire[]>([]);
  const [canvas, setCanvas] = useState<{
    x: number;
    y: number;
    zoom: number;
  }>({ x: 0, y: 0, zoom: 1 });
  const [confirmClear, setConfirmClear] = useState(false);
  const [draggingNewElement, setDraggingNewElement] = useState<{
    type: GateType;
    x: number;
    y: number;
  } | null>(null);

  useDisableHook(canvasReference);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("text") as GateType;
      const rect = canvasReference.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - canvas.x;
        const y = e.clientY - rect.top - canvas.y;
        setItems((prevItems) => [
          ...prevItems,
          {
            id: randomGateId(),
            type,
            x,
            y,
            value: false,
            computedValue: false,
            inputs: [],
            outputs: [],
          },
        ]);
      }
    },
    [canvas.x, canvas.y],
  );

  const handleCanvasMove = useCallback((e: React.MouseEvent) => {
    if (e.buttons === 3) {
      setCanvas((previous) => {
        var newX = previous.x + e.movementX;
        var newY = previous.y + e.movementY;
        if (newX > 1000) {
          newX = 1000;
        } else if (newX < -1000) {
          newX = -1000;
        }
        if (newY > 1000) {
          newY = 1000;
        } else if (newY < -1000) {
          newY = -1000;
        }
        return {
          ...previous,
          x: newX,
          y: newY,
        };
      });
    }
  }, []);

  const simulate = useCallback(() => {
    // setItems((prevItems) => {
    //   const newItems = [...prevItems];
    //   const getValue = (id: number) => {
    //     const item = newItems.find((item) => item.id === id);
    //     return item
    //       ? item.type === "INPUT"
    //         ? item.value
    //         : item.computedValue
    //       : false;
    //   };
    //   const visited = new Set<number>();
    //   const stack: number[] = [];
    //   const visit = (id: number) => {
    //     if (visited.has(id)) return;
    //     visited.add(id);
    //     const item = newItems.find((item) => item.id === id);
    //     if (item) {
    //       item.outputs.forEach((outputId) => visit(outputId));
    //       stack.push(id);
    //     }
    //   };
    //   newItems.forEach((item) => {
    //     if (!visited.has(item.id)) {
    //       visit(item.id);
    //     }
    //   });
    //   while (stack.length > 0) {
    //     const id = stack.pop();
    //     if (id !== undefined) {
    //       const item = newItems.find((item) => item.id === id);
    //       if (item) {
    //         if (item.type !== "INPUT") {
    //           const inputValues = item.inputs
    //             .map(getValue)
    //             .map((a) => a || false);
    //           if (item.type === "OUTPUT") {
    //             item.computedValue = inputValues[0] || false;
    //           } else if (item.type in gates) {
    //             item.computedValue = gates[item.type](inputValues);
    //           }
    //         } else {
    //           item.computedValue = item.value || false;
    //         }
    //       }
    //     }
    //   }
    //   return newItems;
    // });
  }, []);

  useEffect(() => {
    simulate();
  }, [wires, simulate]);

  useEffect(() => {
    setCookie("logicate-unsaved_items", SuperJSON.stringify(items));
    setCookie("logicate-unsaved_wires", SuperJSON.stringify(wires));
  }, [items, wires]);

  // When user starts dragging from the element, save drag position - but it should continue dragging when the cursor leaves this element. So this means the listener needs to be added to the document.
  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (draggingNewElement && e.buttons === Click.Primary) {
        const element = document.querySelector(
          "[data-logicate-temporary-dragging-gate]",
        );
        if (!element) return;
        setDraggingNewElement((previous) => {
          if (previous) {
            return {
              ...previous,
              x: mouseX - element.getBoundingClientRect().width / 2,
              y: mouseY - element.getBoundingClientRect().height / 2,
            };
          }
          return null;
        });
      }

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const mouseOverElement = document.elementFromPoint(mouseX, mouseY);
      if (mouseOverElement) {
        if (mouseOverElement.getAttribute("data-logicate-draggable")) {
          if (
            mouseOverElement.getAttribute("data-logicate-draggable-sidebar")
          ) {
            const type = mouseOverElement.getAttribute(
              "data-logicate-gate-type",
            );
            if (type && !draggingNewElement && e.buttons === Click.Primary) {
              setDraggingNewElement({
                type: type as GateType,
                x: mouseX - 16 / -canvas.zoom,
                y: mouseY + 16 / -canvas.zoom,
              });
            }
          }
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (draggingNewElement) {
        setDraggingNewElement(null);
        // We need to adjust the x and y to be the one relative to the canvas so that it doesnt account for the width of the sidebar
        if (!canvasReference.current) return;
        const clientX = e.clientX;
        const clientY = e.clientY;
        if (
          clientX < canvasReference.current.getBoundingClientRect().left ||
          clientX > canvasReference.current.getBoundingClientRect().right ||
          clientY < canvasReference.current.getBoundingClientRect().top ||
          clientY > canvasReference.current.getBoundingClientRect().bottom
        ) {
          return;
        }
        const xOnCanvas =
          (draggingNewElement.x -
            canvasReference.current.getBoundingClientRect().left) /
          canvas.zoom;
        const yOnCanvas =
          (draggingNewElement.y -
            canvasReference.current.getBoundingClientRect().top) /
          canvas.zoom;
        setItems((prevItems) => [
          ...prevItems,
          {
            id: randomGateId(),
            type: draggingNewElement.type,
            x: xOnCanvas,
            y: yOnCanvas,
            inputs: [],
            outputs: [],
            value: false,
            computedValue: false,
          },
        ]);
      }
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const scrollCanvas = useCallback((e: React.WheelEvent) => {
    // const isOverElement = items.some((item) => {
    //   const element = document.querySelector(`[data-logicate-id="${item.id}"]`);
    //   if (element) {
    //     const rect = element.getBoundingClientRect();
    //     return (
    //       e.clientX > rect.left &&
    //       e.clientX < rect.right &&
    //       e.clientY > rect.top &&
    //       e.clientY < rect.bottom
    //     );
    //   }
    //   return false;
    // });
    // if (isOverElement) return;
    setCanvas((previous) => {
      return {
        ...previous,
        zoom: previous.zoom * (1 - e.deltaY * 0.001),
      };
    });
  }, []);

  return (
    <>
      <main className="w-full h-full grow flex flex-row">
        <aside className="xl:w-[15%] lg:w-[25%] md:w-[35%] w-0 h-full transition-all duration-300 border-r border-neutralgrey-400">
          <Accordion type="multiple">
            <AccordionItem value="inputs">
              <AccordionTrigger>Inputs</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="gates">
              <AccordionTrigger>Gates</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-5 p-4 justify-between items-start">
                  {Object.values(GateType).map((type) => (
                    <DraggableItem key={type} type={type} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        <div
          ref={canvasReference}
          className="w-full grow overflow-hidden relative max-h-[calc(100dvh-4rem)]"
          onMouseMove={(e) => {
            handleCanvasMove(e);
          }}
          onWheel={scrollCanvas}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          data-logicate-canvas-position={`${canvas.x}px ${canvas.y}px`}
          data-logicate-canvas-zoom={canvas.zoom}
        >
          <div
            data-logicate-canvas-background
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url(${surface.src})`,
              backgroundRepeat: "repeat",
              backgroundPosition: `${canvas.x}px ${canvas.y}px`,
              transform: `scale(${canvas.zoom})`,
            }}
          />
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transform: `scale(${canvas.zoom})`,
              transformOrigin: "center",
            }}
          >
            {wires.map((wire, index) => {
              const from = items.find((item) => item.id === wire.from);
              const to = items.find((item) => item.id === wire.to);
              if (!from || !to) return null;
              return (
                <Wire
                  key={index}
                  startX={from.x + canvas.x}
                  startY={from.y + canvas.y}
                  endX={to.x + canvas.x}
                  endY={to.y + canvas.y}
                  isActive={wire.active ?? false}
                  canvas={canvas}
                  canvasReference={canvasReference}
                />
              );
            })}
          </svg>
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `scale(${canvas.zoom})`,
            }}
          >
            {items.map((item) => (
              <Gate
                key={item.id}
                type={item.type}
                inputs={item.inputs.length}
                state={item.computedValue ?? false}
                gateId={item.id}
                x={item.x + canvas.x}
                y={item.y + canvas.y}
                savePosition={(x, y) => {
                  setItems((prevItems) => {
                    const newItems = [...prevItems];
                    const item = newItems.find((item) => item.id === item.id);
                    if (item) {
                      item.x = x;
                      item.y = y;
                    }
                    return newItems;
                  });
                }}
                canvasZoom={canvas.zoom}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-row items-center">
          <Dialog open={confirmClear} onOpenChange={setConfirmClear}>
            <DialogTrigger asChild>
              <Button
                className="mr-2"
                variant="destructive-primary"
                size="icon-sm"
              >
                <Eraser01Icon className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to clear the canvas?
                </DialogTitle>
                <DialogDescription className="text-neutralgrey-900 text-sm">
                  This will clear all components and wires on the canvas. You
                  cannot undo this action.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive-primary"
                  onClick={() => {
                    setItems([]);
                    setWires([]);
                    setConfirmClear(false);
                  }}
                >
                  Clear Canvas
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => {
              setCanvas({
                x: 0,
                y: 0,
                zoom: 1,
              });
            }}
            className="mr-2"
            variant="dark"
            size="icon-sm"
            title="Center Canvas"
          >
            <CenterIcon className="size-5" />
          </Button>
        </div>
      </main>
      {draggingNewElement && (
        <div
          className="absolute origin-top-left pointer-events-none"
          style={{
            width: "1000000px",
          }}
        >
          <TemporaryGate
            canvasZoom={canvas.zoom}
            type={draggingNewElement.type}
            inputs={0}
            state={false}
            gateId={"temporary-dragging-logicate-element"}
            x={draggingNewElement.x}
            y={draggingNewElement.y}
          />
        </div>
      )}
    </>
  );
}
