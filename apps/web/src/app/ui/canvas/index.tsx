"use client";

import { CenterIcon, Eraser01Icon } from "@jfstech/icons-react/24/outline";
import { LogicateSession, User } from "@logicate/database";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@logicate/ui/not-done-yet/accordion";
import { Click } from "@logicate/utils/buttons";
import { randomGateId, randomWireId } from "@logicate/utils/id";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import BackgroundElement from "./background-element";
import useDisableHook from "./disable-hook";
import { DraggableItem } from "./draggable-item";
import useCanvasStore from "./hooks/useCanvasStore";
import { gates } from "./node";
import { Gate, GateType } from "./node/gate";
import { Input, InputType } from "./node/inputs";
import { TemporaryInput } from "./node/inputs/temporary";
import { TemporaryGate } from "./node/temporary-gate";
import { NodeType } from "./node/type";
import { Item, Wire as WireType } from "./types";
import updateStore from "./update-store-hook";
import { Wire } from "./wire";

export default function Canvas({
  sessionId,
  user,
}: {
  sessionId: string;
  logicateSession: LogicateSession;
  user: User;
}) {
  const canvasReference = useRef<HTMLDivElement>(null);
  const {
    items,
    setItems,
    addItem,
    selected,
    setSelected,
    wires,
    setWires,
    addWire,
    canvas,
    setCanvas,
    setX,
    setY,
    isHolding,
    setHolding,
    itemsUpdate,
    temporaryWire,
    setTemporaryWire,
    updateTemporaryWire,
    canvasU,
  } = useCanvasStore();
  const [simulatedItems, setSimulatedItems] = useState<Item[]>([]);
  const [simulatedWires, setSimulatedWires] = useState<WireType[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);
  const [draggingNewElement, setDraggingNewElement] = useState<{
    type: NodeType;
    x: number;
    y: number;
  } | null>(null);

  useDisableHook(canvasReference);
  updateStore(sessionId);

  const handleCanvasMove = useCallback((e: React.MouseEvent) => {
    if (e.buttons === 3) {
      let newX = canvas.x + e.movementX;
      let newY = canvas.y + e.movementY;
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
      setX(newX);
      setY(newY);
    }
  }, []);

  const simulate = useCallback(() => {
    setSimulatedItems((prevItems) => {
      const newItems = [...prevItems];
      const getValue = (id: string) => {
        const item = newItems.find((item) => item.id === id);
        return item ? (item.itemType === "input" ? item.value : item.computedValue) : false;
      };
      const visited = new Set<string>();
      const stack: string[] = [];
      const visit = (id: string) => {
        if (visited.has(id)) return;
        visited.add(id);
        const item = newItems.find((item) => item.id === id);
        if (item) {
          if (item.itemType === "output") {
            stack.push(id);
          } else {
            item.outputs.forEach((outputId) => visit(outputId));
            stack.push(id);
          }
        }
      };
      newItems.forEach((item) => {
        if (!visited.has(item.id)) {
          visit(item.id);
        }
      });
      while (stack.length > 0) {
        const id = stack.pop();
        if (id !== undefined) {
          const item = newItems.find((item) => item.id === id);
          if (item) {
            if (item.itemType !== "input") {
              const inputValues = item.inputs.map(getValue).map((a) => a || false);
              if (item.itemType === "output") {
                item.computedValue = inputValues[0] || false;
              } else if (item.itemType === "gate") {
                item.computedValue = gates[item.type](inputValues);
              }
            } else {
              item.value = item.value || false;
            }
          }
        }
      }
      return newItems;
    });
  }, []);

  useEffect(() => {
    simulate();
  }, [items, wires, simulate]);

  useHotkeys("esc", () => {
    if (draggingNewElement) {
      setDraggingNewElement(null);
    }
    if (selected.length > 0) {
      setSelected([]);
    }
    if (confirmClear) {
      setConfirmClear(false);
    }
  });

  useHotkeys("ctrl+z", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selected.length > 0) setSelected([]);
    if (draggingNewElement) setDraggingNewElement(null);
    if (confirmClear) setConfirmClear(false);

    const recentItem = items[items.length - 1];
    if (recentItem) {
      itemsUpdate((items) => items.slice(0, -1));
      const wiresConnecting = wires.filter((wire) => wire.from === recentItem.id || wire.to === recentItem.id);
      const updatedWires = wires.filter((wire) => !wiresConnecting.includes(wire));
      setWires(updatedWires);
    }
  });

  // When user starts dragging from the element, save drag position - but it should continue dragging when the cursor leaves this element. So this means the listener needs to be added to the document.
  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (temporaryWire && e.buttons === Click.Primary) {
        // update the end position of the wire
        updateTemporaryWire((previous) => ({ ...previous, to: { x: e.clientX, y: e.clientY } }));
      }

      if (draggingNewElement && e.buttons === Click.Primary) {
        const element = document.querySelector("[data-logicate-temporary-dragging-node]");
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
      if (
        mouseOverElement &&
        mouseOverElement.getAttribute("data-logicate-draggable") &&
        mouseOverElement.getAttribute("data-logicate-draggable-sidebar") &&
        !isHolding
      ) {
        const type = mouseOverElement.getAttribute("data-logicate-gate-type-type");
        const typeType = mouseOverElement.getAttribute("data-logicate-type");
        if (type && !draggingNewElement && e.buttons === Click.Primary) {
          setDraggingNewElement({
            type: {
              type: type as NodeType["type"],
              node: typeType as NodeType["node"],
            } as NodeType,
            x: mouseX - 16 / -canvas.zoom,
            y: mouseY + 16 / -canvas.zoom,
          });
          setHolding(true);
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (temporaryWire) {
        const cursorOn = document.elementFromPoint(e.clientX, e.clientY);
        console.log(cursorOn);
        if (cursorOn && cursorOn.getAttribute("data-logicate-node-parent-id")) {
          const parentId = cursorOn.getAttribute("data-logicate-node-parent-id");
          const terminalType = cursorOn.getAttribute("data-logicate-parent-terminal-type");
          if (parentId && terminalType) {
            const parent = items.find((item) => item.id === parentId);
            if (!parent) return;
            switch (parent.itemType) {
              case "gate":
                if (terminalType === "input") {
                  parent.inputs.push(temporaryWire.fromId);
                  addWire({
                    id: randomWireId(),
                    from: temporaryWire.fromId,
                    to: parentId,
                    active: false,
                  });
                } else if (terminalType === "output") {
                  parent.outputs.push(temporaryWire.fromId);
                }
                setTemporaryWire(null);
                break;
              case "input":
                if (terminalType === "output") {
                  parent.outputs.push(temporaryWire.fromId);
                }
                setTemporaryWire(null);
                break;
              default:
                break;
            }
          } else {
            setTemporaryWire(null);
          }
        } else {
          setTemporaryWire(null);
        }
      }

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
        const xOnCanvas = (draggingNewElement.x - canvasReference.current.getBoundingClientRect().left) / canvas.zoom;
        const maxMinX = Math.max(0, Math.min(xOnCanvas, 1000));
        const yOnCanvas = (draggingNewElement.y - canvasReference.current.getBoundingClientRect().top) / canvas.zoom;
        const maxMinY = Math.max(0, Math.min(yOnCanvas, 1000));
        addItem({
          id: randomGateId(),
          x: maxMinX,
          y: maxMinY,
          ...(draggingNewElement.type.type === "input"
            ? {
                itemType: "input" as const,
                type: draggingNewElement.type.node as InputType,
                value: false,
                outputs: [],
              }
            : {
                itemType: "gate" as const,
                type: draggingNewElement.type.node as GateType,
                computedValue: false,
                inputs: [],
                outputs: [],
              }),
        });
        setHolding(false);
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
    //! Disabled for now until can get the moving of elements within the canvas working properly when scaled.
    canvasU((canvas) => {
      return {
        ...canvas,
        zoom: Math.max(0.4, Math.min(canvas.zoom * (1 - e.deltaY * 0.001), 3)),
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
              <AccordionContent>
                <div className="flex flex-wrap gap-5 p-4 justify-between items-start">
                  {Object.values(InputType).map((type) => (
                    <DraggableItem key={type} type={{ type: "input", node: type }} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gates">
              <AccordionTrigger>Gates</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-5 p-4 justify-between items-start">
                  {Object.values(GateType).map((type) => (
                    <DraggableItem key={type} type={{ type: "gate", node: type }} />
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
          data-logicate-canvas-position={`${canvas.x}px ${canvas.y}px`}
          data-logicate-canvas-zoom={canvas.zoom}
          data-logicate-canvas
        >
          <BackgroundElement canvasReference={canvasReference} showBackground={user.client_showBackground} />
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
            {items.map((item) =>
              item.itemType === "gate" ? (
                <Gate
                  key={item.id}
                  type={item.type}
                  inputs={item.inputs.length}
                  state={item.computedValue ?? false}
                  gateId={item.id}
                  x={item.x + canvas.x}
                  y={item.y + canvas.y}
                />
              ) : item.itemType === "input" ? (
                <Input
                  key={item.id}
                  type={item.type}
                  computedValue={item.value ?? false}
                  inputId={item.id}
                  x={item.x + canvas.x}
                  y={item.y + canvas.y}
                />
              ) : null,
            )}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-row items-center">
          <Dialog open={confirmClear} onOpenChange={setConfirmClear}>
            <DialogTrigger asChild>
              <Button className="mr-2" variant="destructive-primary" size="icon-sm">
                <Eraser01Icon className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to clear the canvas?</DialogTitle>
                <DialogDescription className="text-neutralgrey-900 text-sm">
                  This will clear all components and wires on the canvas. You cannot undo this action.
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
          {draggingNewElement.type.type === "gate" ? (
            <TemporaryGate
              canvasZoom={canvas.zoom}
              type={draggingNewElement.type.node}
              inputs={0}
              state={false}
              gateId={"temporary-dragging-logicate-element"}
              x={draggingNewElement.x}
              y={draggingNewElement.y}
            />
          ) : draggingNewElement.type.type === "input" ? (
            <TemporaryInput
              canvasZoom={canvas.zoom}
              type={draggingNewElement.type.node}
              inputId={"temporary-dragging-logicate-element"}
              x={draggingNewElement.x}
              y={draggingNewElement.y}
            />
          ) : null}
        </div>
      )}

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {temporaryWire && (
          <Wire
            startX={temporaryWire.from.x}
            startY={temporaryWire.from.y}
            endX={temporaryWire.to.x}
            endY={temporaryWire.to.y}
            isActive={false}
            canvas={canvas}
            canvasReference={canvasReference}
          />
        )}
      </svg>
    </>
  );
}
