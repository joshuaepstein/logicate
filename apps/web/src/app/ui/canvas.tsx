"use client";

import { CenterIcon, Eraser01Icon } from "@jfstech/icons-react/24/outline";
import { cn } from "@logicate/ui";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import dot from "~/dot.png";
import { gates } from "./gates";
import type { Item, Wire as TypeWire } from "./types";
import { Wire } from "./wire";

const DraggableItem = ({
  label,
  onDrag,
}: {
  label: string;
  onDrag: () => void;
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", label);
    onDrag();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-move border border-neutralgrey-400 p-2 mb-2 bg-neutralgrey-200 rounded-sm"
    >
      {label}
    </div>
  );
};

export default function Canvas() {
  const canvasReference = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [wires, setWires] = useState<TypeWire[]>([]);
  const [nextId, setNextId] = useState(0);
  const [connecting, setConnecting] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [canvasX, setCanvasX] = useState(0);
  const [canvasY, setCanvasY] = useState(0);

  const [confirmClear, setConfirmClear] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("text") as
        | keyof typeof gates
        | "INPUT"
        | "OUTPUT";
      const rect = canvasReference.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - canvasX;
        const y = e.clientY - rect.top - canvasY;
        setItems((prevItems) => [
          ...prevItems,
          {
            id: nextId,
            type,
            x,
            y,
            value: type === "INPUT" ? false : null,
            inputs: [],
            outputs: [],
          },
        ]);
        setNextId(nextId + 1);
      }
    },
    [nextId, canvasX, canvasY],
  );

  const toggleInput = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.type === "INPUT"
          ? { ...item, value: !item.value }
          : item,
      ),
    );
  };

  const canConnect = (fromType: string, toType: string) => {
    if (fromType === "OUTPUT") return false;
    if (toType === "INPUT") return false;
    return true;
  };

  const handleConnect = (id: number) => {
    if (connecting) {
      if (connecting !== id) {
        const fromItem = items.find((item) => item.id === connecting);
        const toItem = items.find((item) => item.id === id);

        if (fromItem && toItem && canConnect(fromItem.type, toItem.type)) {
          setWires((prevWires) => [...prevWires, { from: connecting, to: id }]);
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === connecting
                ? { ...item, outputs: [...item.outputs, id] }
                : item.id === id
                  ? { ...item, inputs: [...item.inputs, connecting] }
                  : item,
            ),
          );
        }
      }
      setConnecting(null);
    } else {
      setConnecting(id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.type === "INPUT") {
      setDragging(id);
    } else {
      handleConnect(id);
    }
  };

  const handleMouseUp = (e: React.MouseEvent, id: number) => {
    if (dragging) {
      if (dragging !== id) {
        const fromItem = items.find((item) => item.id === dragging);
        const toItem = items.find((item) => item.id === id);

        if (fromItem && toItem && canConnect(fromItem.type, toItem.type)) {
          setWires((prevWires) => [...prevWires, { from: dragging, to: id }]);
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === dragging
                ? { ...item, outputs: [...item.outputs, id] }
                : item.id === id
                  ? { ...item, inputs: [...item.inputs, dragging] }
                  : item,
            ),
          );
        }
      } else {
        toggleInput(id);
      }
      setDragging(null);
    }
  };

  const handleCanvasMove = useCallback((e: React.MouseEvent) => {
    if (e.buttons === 1) {
      //   Update the canvas position BUT make sure that either axis doesnt go above 1000 or below -1000
      setCanvasX((previous) => {
        const newX = previous + e.movementX;
        if (newX > 1000) {
          return 1000;
        } else if (newX < -1000) {
          return -1000;
        }
        return newX;
      });
      setCanvasY((previous) => {
        const newY = previous + e.movementY;
        if (newY > 1000) {
          return 1000;
        } else if (newY < -1000) {
          return -1000;
        }
        return newY;
      });
    }
  }, []);

  const simulate = useCallback(() => {
    setItems((prevItems) => {
      const newItems = [...prevItems];

      const getValue = (id: number) => {
        const item = newItems.find((item) => item.id === id);
        return item
          ? item.type === "INPUT"
            ? item.value
            : item.computedValue
          : false;
      };

      const visited = new Set<number>();
      const stack: number[] = [];

      const visit = (id: number) => {
        if (visited.has(id)) return;
        visited.add(id);
        const item = newItems.find((item) => item.id === id);
        if (item) {
          item.outputs.forEach((outputId) => visit(outputId));
          stack.push(id);
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
            if (item.type !== "INPUT") {
              const inputValues = item.inputs
                .map(getValue)
                .map((a) => a || false);
              if (item.type === "OUTPUT") {
                item.computedValue = inputValues[0] || false;
              } else if (item.type in gates) {
                item.computedValue = gates[item.type](inputValues);
              }
            } else {
              item.computedValue = item.value || false;
            }
          }
        }
      }

      return newItems;
    });
  }, []);

  useEffect(() => {
    simulate();
  }, [wires, simulate]);

  useHotkeys("Escape", (e) => {
    setConnecting(null);
    setDragging(null);
  });

  return (
    <main className="w-full h-full grow flex flex-row">
      <aside className="xl:w-[15%] lg:w-[25%] md:w-[35%] w-0 h-full transition-all duration-300 border-r border-neutralgrey-400">
        <h2 className="text-xl font-semibold mb-2">Components</h2>
        <DraggableItem label="INPUT" onDrag={() => {}} />
        <DraggableItem label="OUTPUT" onDrag={() => {}} />
        {Object.keys(gates).map((gate) => (
          <DraggableItem key={gate} label={gate} onDrag={() => {}} />
        ))}
      </aside>
      <div
        ref={canvasReference}
        className="w-full h-full grow overflow-hidden relative"
        onMouseMove={(e) => {
          if (e.buttons === 1) {
            if (dragging || connecting) {
              return;
            }
            if (
              !items.find((item) => {
                // const rect = item.getBoundingClientRect();
                const rect = document
                  .querySelector(`[data-logicate-id="${item.id}"]`)
                  ?.getBoundingClientRect();
                if (!rect) return false;
                return (
                  e.clientX > rect.left &&
                  e.clientX < rect.right &&
                  e.clientY > rect.top &&
                  e.clientY < rect.bottom
                );
              })
            ) {
              handleCanvasMove(e);
            }
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${dot.src})`,
            backgroundSize: "10px",
            backgroundRepeat: "repeat",
            backgroundPosition: `${canvasX}px ${canvasY}px`,
          }}
        />
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {wires.map((wire, index) => {
            const fromItem = items.find((item) => item.id === wire.from);
            const toItem = items.find((item) => item.id === wire.to);
            return fromItem && toItem ? (
              <Wire
                key={index}
                startX={fromItem.x + canvasX + 50}
                startY={fromItem.y + canvasY + 25}
                endX={toItem.x + canvasX}
                endY={toItem.y + canvasY + 25}
                isActive={
                  fromItem.type === "INPUT"
                    ? fromItem.value === true
                    : fromItem.computedValue === true
                }
              />
            ) : null;
          })}
        </svg>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              `absolute border select-none border-neutralgrey-400 p-2 bg-neutralgrey-200 rounded-sm cursor-pointer`,
              {
                "ring-2 ring-blue-700":
                  connecting === item.id || dragging === item.id,
                "ring-2 ring-green-700":
                  (connecting || dragging) &&
                  connecting !== item.id &&
                  dragging !== item.id &&
                  canConnect(
                    items.find((i) => i.id === (connecting || dragging))
                      ?.type || "",
                    item.type,
                  ),
              },
            )}
            data-logicate-type={item.type}
            data-logicate-id={item.id}
            data-logicate-value={item.value}
            data-logicate-cv={item.computedValue}
            data-logicate-compoment
            style={{ left: item.x + canvasX, top: item.y + canvasY }}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
            onMouseUp={(e) => handleMouseUp(e, item.id)}
          >
            {item.type}:{" "}
            {item.type === "INPUT"
              ? item.value?.toString()
              : item.computedValue?.toString()}
          </div>
        ))}
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
            setCanvasX(0);
            setCanvasY(0);
          }}
          className="mr-2"
          variant="dark"
          size="icon-sm"
          title="Center Canvas"
        >
          <CenterIcon className="size-5" />
        </Button>
        {(connecting || dragging) && (
          <span className="text-blue-500 ml-2">
            Click on another component to connect
          </span>
        )}
      </div>
    </main>
  );
}
