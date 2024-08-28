import { cn } from "@logicate/ui";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";

export enum GateType {
  AND = "AND",
  OR = "OR",
  NOT = "NOT",
  XOR = "XOR",
  NAND = "NAND",
  NOR = "NOR",
  XNOR = "XNOR",
  BUFFER = "BUFFER",
}

export const gateTypeToIcon: Record<
  GateType,
  `data:image/svg+xml;base64,${string}`
> = {
  [GateType.AND]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDEgMQpMIDEgMzEgMTYgMzEKUSAyMi4yIDMxIDI2LjYgMjYuNiAzMSAyMi4yIDMxIDE2IDMxIDkuOCAyNi42IDUuNCAyMi4yIDEgMTYgMQpMIDEgMSBaIi8+CjxwYXRoIGlkPSJMYXllcjBfMF8xX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMyIgZmlsbD0ibm9uZSIgZD0iCk0gMSAxCkwgMTYgMQpRIDIyLjIgMSAyNi42IDUuNCAzMSA5LjggMzEgMTYgMzEgMjIuMiAyNi42IDI2LjYgMjIuMiAzMSAxNiAzMQpMIDEgMzEgMSAxIFoiLz4KPC9zdmc+",
  [GateType.OR]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzZweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzYgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDMzLjU1IDE5Ljc1ClEgMzQuNiAxOCAzNS41IDE2IDM0LjU1IDE0LjMgMzMuNTUgMTIuNzUgMjUuNzUgMS4yNSAxMi4xNSAxCkwgMS41IDEKUSAyLjI1IDIuNiAyLjk1IDQuMiAzLjggNi40IDQuNDUgOC41IDQuNzUgOS41IDQuOTUgMTAuNSA2LjY1IDE4LjA1IDQuNjUgMjQuNTUgNC4zIDI1LjU1IDMuOSAyNi41NSAzLjQ1IDI3LjYgMi45NSAyOC42IDIuMjUgMjkuOCAxLjUgMzEKTCAxMS43NSAzMQpRIDI2LjU1IDMxLjE1IDMzLjU1IDE5Ljc1IFoiLz4KPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjMiIGZpbGw9Im5vbmUiIGQ9IgpNIDEyLjE1IDEKTCAxLjUgMQpRIDIuMjUgMi42IDIuOTUgNC4yIDMuOCA2LjQgNC40NSA4LjUgNC43NSA5LjUgNC45NSAxMC41IDYuNjUgMTguMDUgNC42NSAyNC41NSA0LjMgMjUuNTUgMy45IDI2LjU1IDMuNDUgMjcuNiAyLjk1IDI4LjYgMi4yNSAyOS44IDEuNSAzMQpMIDExLjc1IDMxIi8+CjxwYXRoIGlkPSJMYXllcjBfMF8yX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9IgpNIDExLjc1IDMxClEgMjYuNTUgMzEuMTUgMzMuNTUgMTkuNzUgMzQuNiAxOCAzNS41IDE2IDM0LjU1IDE0LjMgMzMuNTUgMTIuNzUgMjUuNzUgMS4yNSAxMi4xNSAxIi8+Cjwvc3ZnPg==",
  [GateType.NOT]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDEgMS42CkwgMSAzMS4zNSAzMC41NSAxNS44IDEgMS42IFoiLz4KPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxIDMxLjM1CkwgMSAxLjYgMzAuNTUgMTUuOCAxIDMxLjM1IFoiLz4KPC9zdmc+",
  [GateType.XOR]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDBweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgNDAgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDkuMjUgOC41ClEgOS41NSA5LjUgOS43NSAxMC41IDExLjQgMTggOS40NSAyNC41IDkuMSAyNS41IDguNzUgMjYuNSA3LjggMjguOCA2LjQgMzAuOTUKTCAxNi4zNSAzMC45NQpRIDMyLjg1IDMxLjEgMzkuNCAxNS45NSAzMS43IDEuMyAxNi43NSAxCkwgNi40IDEKUSA4LjI1IDQuODUgOS4yNSA4LjUgWiIvPgoKPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxLjQgMQpRIDMuMiA0LjU1IDQuMzUgOC42NQpNIDQuNjUgMTAuMDUKUSA2LjEgMTcuMDUgNC4xNSAyNC4wNQpNIDMuNyAyNS42NQpRIDIuNyAyOC41NSAxLjQgMzEiLz4KCjxwYXRoIGlkPSJMYXllcjBfMF8yX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxNi43NSAxCkwgNi40IDEKUSA4LjI1IDQuODUgOS4yNSA4LjUgOS41NSA5LjUgOS43NSAxMC41IDExLjQgMTggOS40NSAyNC41IDkuMSAyNS41IDguNzUgMjYuNSA3LjggMjguOCA2LjQgMzAuOTUKTCAxNi4zNSAzMC45NSIvPgoKPHBhdGggaWQ9IkxheWVyMF8wXzNfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgZD0iCk0gMTYuMzUgMzAuOTUKUSAzMi44NSAzMS4xIDM5LjQgMTUuOTUgMzEuNyAxLjMgMTYuNzUgMSIvPgo8L3N2Zz4=",
  [GateType.NAND]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDEgMQpMIDEgMzEgMTYgMzEKUSAyMi4yIDMxIDI2LjYgMjYuNiAzMSAyMi4yIDMxIDE2IDMxIDkuOCAyNi42IDUuNCAyMi4yIDEgMTYgMQpMIDEgMSBaIi8+CjxwYXRoIGlkPSJMYXllcjBfMF8xX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMyIgZmlsbD0ibm9uZSIgZD0iCk0gMSAxCkwgMTYgMQpRIDIyLjIgMSAyNi42IDUuNCAzMSA5LjggMzEgMTYgMzEgMjIuMiAyNi42IDI2LjYgMjIuMiAzMSAxNiAzMQpMIDEgMzEgMSAxIFoiLz4KPC9zdmc+",
  [GateType.NOR]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzZweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzYgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDMzLjU1IDE5Ljc1ClEgMzQuNiAxOCAzNS41IDE2IDM0LjU1IDE0LjMgMzMuNTUgMTIuNzUgMjUuNzUgMS4yNSAxMi4xNSAxCkwgMS41IDEKUSAyLjI1IDIuNiAyLjk1IDQuMiAzLjggNi40IDQuNDUgOC41IDQuNzUgOS41IDQuOTUgMTAuNSA2LjY1IDE4LjA1IDQuNjUgMjQuNTUgNC4zIDI1LjU1IDMuOSAyNi41NSAzLjQ1IDI3LjYgMi45NSAyOC42IDIuMjUgMjkuOCAxLjUgMzEKTCAxMS43NSAzMQpRIDI2LjU1IDMxLjE1IDMzLjU1IDE5Ljc1IFoiLz4KPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjMiIGZpbGw9Im5vbmUiIGQ9IgpNIDEyLjE1IDEKTCAxLjUgMQpRIDIuMjUgMi42IDIuOTUgNC4yIDMuOCA2LjQgNC40NSA4LjUgNC43NSA5LjUgNC45NSAxMC41IDYuNjUgMTguMDUgNC42NSAyNC41NSA0LjMgMjUuNTUgMy45IDI2LjU1IDMuNDUgMjcuNiAyLjk1IDI4LjYgMi4yNSAyOS44IDEuNSAzMQpMIDExLjc1IDMxIi8+CjxwYXRoIGlkPSJMYXllcjBfMF8yX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9IgpNIDExLjc1IDMxClEgMjYuNTUgMzEuMTUgMzMuNTUgMTkuNzUgMzQuNiAxOCAzNS41IDE2IDM0LjU1IDE0LjMgMzMuNTUgMTIuNzUgMjUuNzUgMS4yNSAxMi4xNSAxIi8+Cjwvc3ZnPg==",
  [GateType.XNOR]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDBweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgNDAgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDkuMjUgOC41ClEgOS41NSA5LjUgOS43NSAxMC41IDExLjQgMTggOS40NSAyNC41IDkuMSAyNS41IDguNzUgMjYuNSA3LjggMjguOCA2LjQgMzAuOTUKTCAxNi4zNSAzMC45NQpRIDMyLjg1IDMxLjEgMzkuNCAxNS45NSAzMS43IDEuMyAxNi43NSAxCkwgNi40IDEKUSA4LjI1IDQuODUgOS4yNSA4LjUgWiIvPgoKPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxLjQgMQpRIDMuMiA0LjU1IDQuMzUgOC42NQpNIDQuNjUgMTAuMDUKUSA2LjEgMTcuMDUgNC4xNSAyNC4wNQpNIDMuNyAyNS42NQpRIDIuNyAyOC41NSAxLjQgMzEiLz4KCjxwYXRoIGlkPSJMYXllcjBfMF8yX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxNi43NSAxCkwgNi40IDEKUSA4LjI1IDQuODUgOS4yNSA4LjUgOS41NSA5LjUgOS43NSAxMC41IDExLjQgMTggOS40NSAyNC41IDkuMSAyNS41IDguNzUgMjYuNSA3LjggMjguOCA2LjQgMzAuOTUKTCAxNi4zNSAzMC45NSIvPgoKPHBhdGggaWQ9IkxheWVyMF8wXzNfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgZD0iCk0gMTYuMzUgMzAuOTUKUSAzMi44NSAzMS4xIDM5LjQgMTUuOTUgMzEuNyAxLjMgMTYuNzUgMSIvPgo8L3N2Zz4=",
  [GateType.BUFFER]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDEgMS42CkwgMSAzMS4zNSAzMC41NSAxNS44IDEgMS42IFoiLz4KPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxIDMxLjM1CkwgMSAxLjYgMzAuNTUgMTUuOCAxIDMxLjM1IFoiLz4KPC9zdmc+",
};

export const defaultInputs: Record<GateType, number> = {
  [GateType.AND]: 2,
  [GateType.OR]: 2,
  [GateType.NOT]: 2,
  [GateType.XOR]: 2,
  [GateType.NAND]: 2,
  [GateType.NOR]: 2,
  [GateType.XNOR]: 2,
  [GateType.BUFFER]: 1,
};

const inverted = [GateType.NOT, GateType.NAND, GateType.NOR, GateType.XNOR];

type GateState = boolean | number | string | null;

export type GateProps = {
  type: GateType;
  inputs: number;
  state: GateState;
  gateId: string;
  isSelected?: boolean;
};

export const Gate = forwardRef<
  HTMLDivElement,
  GateProps & {
    x: number;
    y: number;
    canvasZoom: number;
    savePosition: (x: number, y: number) => void;
  } & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      type,
      inputs,
      x,
      y,
      state,
      gateId,
      isSelected = false,
      canvasZoom,
      savePosition,
      ...rest
    },
    ref,
  ) => {
    const isInverted = useMemo(() => {
      return inverted.includes(type);
    }, [type]);
    const isOrType = useMemo(() => {
      return type === GateType.OR || type === GateType.NOR;
    }, [type]);
    const isXorXnorType = useMemo(() => {
      return type === GateType.XOR || type === GateType.XNOR;
    }, [type]);
    const [position, setPosition] = useState({ x, y });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x, y });

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.dataset.logicateBody) {
          setDragging(true);
          setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
          });
        }
      },
      [position],
    );

    const handleMouseMove = useCallback(
      (event: MouseEvent) => {
        if (dragging) {
          setPosition({
            x: event.clientX - offset.x,
            y: event.clientY - offset.y,
          });
        }
      },
      [dragging, offset],
    );

    const handleMouseUp = useCallback(() => {
      setDragging(false);
      savePosition(position.x, position.y);
    }, [position]);

    useEffect(() => {
      if (dragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [dragging, handleMouseMove, handleMouseUp]);

    return (
      <>
        <div
          className={cn(
            "grid w-auto outline-none absolute origin-top-left items-center justify-center select-none cursor-default pointer-events-none",
            {
              "filter-[drop-shadow(0px_0px_3px_#0079db)]": true,
            },
          )}
          style={{ left: position.x, top: position.y }}
          tabIndex={-1}
          data-logicate-id={gateId}
          data-logicate-type={type}
          data-logicate-inputs={inputs}
          data-logicate-state={state}
          ref={ref}
          {...rest}
          onMouseDown={handleMouseDown}
          data-logicate-dragging={dragging}
        >
          <div
            className="flex flex-col items-start justify-center"
            style={{
              gridColumn: "3 / span 1",
              gridRow: "2 / span 1",
            }}
          >
            <div className="flex flex-row w-7 items-center relative mb-[2.5px] last-of-type:mb-0">
              <div
                className="order-2 z-[1] pointer-events-auto"
                style={{ lineHeight: 0 }}
              >
                <svg
                  style={{
                    overflow: "visible",
                    width: "12.5px",
                    height: "12.5px",
                  }}
                  className="pointer-events-auto hover:scale-[1.2] transition-transform"
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
              </div>
              <div className="grow order-1 h-[2px] bg-black min-w-4"></div>
              <div
                className={cn(
                  "-order-1 z-[1] h-2 w-2 border-2 border-black rounded-[50%] bg-white absolute",
                  {
                    hidden: !isInverted,
                  },
                )}
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
                Math.max(inputs, defaultInputs[type]),
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
                    <circle
                      cx="6.5"
                      cy="6.5"
                      r="6"
                      stroke="black"
                      strokeWidth="1"
                      fill="white"
                    ></circle>
                  </svg>
                </div>
                <div className="grow min-w-4 h-[2px] bg-black"></div>
                <div className="hidden z-[1] h-2 w-2 border-2 border-black rounded-[50%] bg-white absolute"></div>
              </div>
            ))}
          </div>
          <div
            className={cn(
              "bg-transparent w-8 min-h-8 min-w-[30px] border-black flex justify-center items-center",
              {
                "filter-[drop-shadow(0px_0px_3px_#0079db)]": isSelected,
                "border-none": inputs < 4,
                "border-l-2 my-[5.25px] self-stretch": inputs > 3,
                "-ml-[4.5px] -mr-px w-[36px]": isOrType,
                "-ml-[9px] -mr-px w-[40px]": isXorXnorType,
              },
            )}
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
              ></span>
            </div>
          </div>
        </div>
      </>
    );
  },
);

Gate.displayName = "Logicate Logic Gate";
