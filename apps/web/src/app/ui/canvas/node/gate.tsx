import { cn } from '@logicate/ui';
import { cursorInside } from '@logicate/utils/dom-cursor';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import useCanvasStore from '../hooks/useCanvasStore';
import { useNode } from '../hooks/useNode';
import AndBody from './nodes/and/body';
import { GateItem } from '../types';
import OrBody from './nodes/or/body';
import { createSVGColouredElement } from './nodes/or/svg-left-element';

export enum GateType {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  XOR = 'XOR',
  NAND = 'NAND',
  NOR = 'NOR',
  XNOR = 'XNOR',
  BUFFER = 'BUFFER',
}

export const gateTypeToIcon: Record<GateType, `data:image/svg+xml;base64,${string}`> = {
  [GateType.AND]:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDEgMQpMIDEgMzEgMTYgMzEKUSAyMi4yIDMxIDI2LjYgMjYuNiAzMSAyMi4yIDMxIDE2IDMxIDkuOCAyNi42IDUuNCAyMi4yIDEgMTYgMQpMIDEgMSBaIi8+CjxwYXRoIGlkPSJMYXllcjBfMF8xX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMyIgZmlsbD0ibm9uZSIgZD0iCk0gMSAxCkwgMTYgMQpRIDIyLjIgMSAyNi42IDUuNCAzMSA5LjggMzEgMTYgMzEgMjIuMiAyNi42IDI2LjYgMjIuMiAzMSAxNiAzMQpMIDEgMzEgMSAxIFoiLz4KPC9zdmc+',
  [GateType.OR]:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzZweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzYgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDMzLjU1IDE5Ljc1ClEgMzQuNiAxOCAzNS41IDE2IDM0LjU1IDE0LjMgMzMuNTUgMTIuNzUgMjUuNzUgMS4yNSAxMi4xNSAxCkwgMS41IDEKUSAyLjI1IDIuNiAyLjk1IDQuMiAzLjggNi40IDQuNDUgOC41IDQuNzUgOS41IDQuOTUgMTAuNSA2LjY1IDE4LjA1IDQuNjUgMjQuNTUgNC4zIDI1LjU1IDMuOSAyNi41NSAzLjQ1IDI3LjYgMi45NSAyOC42IDIuMjUgMjkuOCAxLjUgMzEKTCAxMS43NSAzMQpRIDI2LjU1IDMxLjE1IDMzLjU1IDE5Ljc1IFoiLz4KPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjMiIGZpbGw9Im5vbmUiIGQ9IgpNIDEyLjE1IDEKTCAxLjUgMQpRIDIuMjUgMi42IDIuOTUgNC4yIDMuOCA2LjQgNC40NSA4LjUgNC43NSA5LjUgNC45NSAxMC41IDYuNjUgMTguMDUgNC42NSAyNC41NSA0LjMgMjUuNTUgMy45IDI2LjU1IDMuNDUgMjcuNiAyLjk1IDI4LjYgMi4yNSAyOS44IDEuNSAzMQpMIDExLjc1IDMxIi8+CjxwYXRoIGlkPSJMYXllcjBfMF8yX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9IgpNIDExLjc1IDMxClEgMjYuNTUgMzEuMTUgMzMuNTUgMTkuNzUgMzQuNiAxOCAzNS41IDE2IDM0LjU1IDE0LjMgMzMuNTUgMTIuNzUgMjUuNzUgMS4yNSAxMi4xNSAxIi8+Cjwvc3ZnPg==',
  [GateType.NOT]:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDEgMS42CkwgMSAzMS4zNSAzMC41NSAxNS44IDEgMS42IFoiLz4KPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxIDMxLjM1CkwgMSAxLjYgMzAuNTUgMTUuOCAxIDMxLjM1IFoiLz4KPC9zdmc+',
  [GateType.XOR]:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDBweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgNDAgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDkuMjUgOC41ClEgOS41NSA5LjUgOS43NSAxMC41IDExLjQgMTggOS40NSAyNC41IDkuMSAyNS41IDguNzUgMjYuNSA3LjggMjguOCA2LjQgMzAuOTUKTCAxNi4zNSAzMC45NQpRIDMyLjg1IDMxLjEgMzkuNCAxNS45NSAzMS43IDEuMyAxNi43NSAxCkwgNi40IDEKUSA4LjI1IDQuODUgOS4yNSA4LjUgWiIvPgoKPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxLjQgMQpRIDMuMiA0LjU1IDQuMzUgOC42NQpNIDQuNjUgMTAuMDUKUSA2LjEgMTcuMDUgNC4xNSAyNC4wNQpNIDMuNyAyNS42NQpRIDIuNyAyOC41NSAxLjQgMzEiLz4KCjxwYXRoIGlkPSJMYXllcjBfMF8yX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxNi43NSAxCkwgNi40IDEKUSA4LjI1IDQuODUgOS4yNSA4LjUgOS41NSA5LjUgOS43NSAxMC41IDExLjQgMTggOS40NSAyNC41IDkuMSAyNS41IDguNzUgMjYuNSA3LjggMjguOCA2LjQgMzAuOTUKTCAxNi4zNSAzMC45NSIvPgoKPHBhdGggaWQ9IkxheWVyMF8wXzNfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgZD0iCk0gMTYuMzUgMzAuOTUKUSAzMi44NSAzMS4xIDM5LjQgMTUuOTUgMzEuNyAxLjMgMTYuNzUgMSIvPgo8L3N2Zz4=',
  [GateType.NAND]:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDEgMQpMIDEgMzEgMTYgMzEKUSAyMi4yIDMxIDI2LjYgMjYuNiAzMSAyMi4yIDMxIDE2IDMxIDkuOCAyNi42IDUuNCAyMi4yIDEgMTYgMQpMIDEgMSBaIi8+CjxwYXRoIGlkPSJMYXllcjBfMF8xX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMyIgZmlsbD0ibm9uZSIgZD0iCk0gMSAxCkwgMTYgMQpRIDIyLjIgMSAyNi42IDUuNCAzMSA5LjggMzEgMTYgMzEgMjIuMiAyNi42IDI2LjYgMjIuMiAzMSAxNiAzMQpMIDEgMzEgMSAxIFoiLz4KPC9zdmc+',
  [GateType.NOR]:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzZweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzYgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDMzLjU1IDE5Ljc1ClEgMzQuNiAxOCAzNS41IDE2IDM0LjU1IDE0LjMgMzMuNTUgMTIuNzUgMjUuNzUgMS4yNSAxMi4xNSAxCkwgMS41IDEKUSAyLjI1IDIuNiAyLjk1IDQuMiAzLjggNi40IDQuNDUgOC41IDQuNzUgOS41IDQuOTUgMTAuNSA2LjY1IDE4LjA1IDQuNjUgMjQuNTUgNC4zIDI1LjU1IDMuOSAyNi41NSAzLjQ1IDI3LjYgMi45NSAyOC42IDIuMjUgMjkuOCAxLjUgMzEKTCAxMS43NSAzMQpRIDI2LjU1IDMxLjE1IDMzLjU1IDE5Ljc1IFoiLz4KPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjMiIGZpbGw9Im5vbmUiIGQ9IgpNIDEyLjE1IDEKTCAxLjUgMQpRIDIuMjUgMi42IDIuOTUgNC4yIDMuOCA2LjQgNC40NSA4LjUgNC43NSA5LjUgNC45NSAxMC41IDYuNjUgMTguMDUgNC42NSAyNC41NSA0LjMgMjUuNTUgMy45IDI2LjU1IDMuNDUgMjcuNiAyLjk1IDI4LjYgMi4yNSAyOS44IDEuNSAzMQpMIDExLjc1IDMxIi8+CjxwYXRoIGlkPSJMYXllcjBfMF8yX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9IgpNIDExLjc1IDMxClEgMjYuNTUgMzEuMTUgMzMuNTUgMTkuNzUgMzQuNiAxOCAzNS41IDE2IDM0LjU1IDE0LjMgMzMuNTUgMTIuNzUgMjUuNzUgMS4yNSAxMi4xNSAxIi8+Cjwvc3ZnPg==',
  [GateType.XNOR]:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDBweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgNDAgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDkuMjUgOC41ClEgOS41NSA5LjUgOS43NSAxMC41IDExLjQgMTggOS40NSAyNC41IDkuMSAyNS41IDguNzUgMjYuNSA3LjggMjguOCA2LjQgMzAuOTUKTCAxNi4zNSAzMC45NQpRIDMyLjg1IDMxLjEgMzkuNCAxNS45NSAzMS43IDEuMyAxNi43NSAxCkwgNi40IDEKUSA4LjI1IDQuODUgOS4yNSA4LjUgWiIvPgoKPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxLjQgMQpRIDMuMiA0LjU1IDQuMzUgOC42NQpNIDQuNjUgMTAuMDUKUSA2LjEgMTcuMDUgNC4xNSAyNC4wNQpNIDMuNyAyNS42NQpRIDIuNyAyOC41NSAxLjQgMzEiLz4KCjxwYXRoIGlkPSJMYXllcjBfMF8yX1NUUk9LRVMiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxNi43NSAxCkwgNi40IDEKUSA4LjI1IDQuODUgOS4yNSA4LjUgOS41NSA5LjUgOS43NSAxMC41IDExLjQgMTggOS40NSAyNC41IDkuMSAyNS41IDguNzUgMjYuNSA3LjggMjguOCA2LjQgMzAuOTUKTCAxNi4zNSAzMC45NSIvPgoKPHBhdGggaWQ9IkxheWVyMF8wXzNfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgZD0iCk0gMTYuMzUgMzAuOTUKUSAzMi44NSAzMS4xIDM5LjQgMTUuOTUgMzEuNyAxLjMgMTYuNzUgMSIvPgo8L3N2Zz4=',
  [GateType.BUFFER]:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiIGQ9IgpNIDEgMS42CkwgMSAzMS4zNSAzMC41NSAxNS44IDEgMS42IFoiLz4KPHBhdGggaWQ9IkxheWVyMF8wXzFfU1RST0tFUyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIzIiBmaWxsPSJub25lIiBkPSIKTSAxIDMxLjM1CkwgMSAxLjYgMzAuNTUgMTUuOCAxIDMxLjM1IFoiLz4KPC9zdmc+',
};

export const defaultInputs: Record<
  GateType,
  {
    min: number;
    max: number;
    default: number;
  }
> = {
  [GateType.AND]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.OR]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.NOT]: {
    default: 1,
    min: 1,
    max: 1,
  },
  [GateType.XOR]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.NAND]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.NOR]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.XNOR]: {
    default: 2,
    min: 2,
    max: 10,
  },
  [GateType.BUFFER]: {
    default: 1,
    min: 1,
    max: 1,
  },
};

const inverted = [GateType.NOT, GateType.NAND, GateType.NOR, GateType.XNOR];

type GateState = boolean | number | string | null;

export type GateProps = {
  type: GateType;
  inputs: number;
  state: GateState;
  gateId: string;
};

export const Gate = forwardRef<
  HTMLDivElement,
  GateProps & {
    x: number;
    y: number;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, inputs, x, y, state, gateId, ...rest }, ref) => {
  const {
    setHolding,
    canvas,
    updateItem,
    temporaryWire,
    setTemporaryWire,
    selectItemId: select,
    unselectItemId: unselect,
    isSelected,
  } = useCanvasStore();
  const item = useNode(gateId) as GateItem;
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
  const [offset, setOffset] = useState({ x, y });
  const [dragging, setDragging] = useState(false);

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
    [position, canvas.zoom, offset]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (dragging) {
        const canvasElement = document.querySelector('[data-logicate-canvas]');
        if (canvasElement) {
          const bounds = canvasElement.getBoundingClientRect();
          if (cursorInside(event, bounds)) {
            setPosition({
              x: event.clientX - offset.x,
              y: event.clientY - offset.y,
            });
          }
        }
      }
    },
    [dragging, offset, canvas.zoom]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    updateItem(gateId, { x: position.x, y: position.y });
    select(gateId);
  }, [position]);

  useEffect(() => {
    if (dragging) {
      setHolding(true);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      setHolding(false);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      <div
        className={cn(
          'pointer-events-none absolute grid w-auto origin-top-left cursor-default select-none items-center justify-center outline-none'
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
        data-logicate-selected={isSelected(gateId)}
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
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="6"
                  stroke={item.settings.color || '#000'}
                  strokeWidth="1"
                  fill="white"
                  data-logicate-output-terminal={0}
                  data-logicate-node-parent-id={gateId}
                  data-logicate-parent-terminal-index={0}
                  data-logicate-parent-terminal-type="output"
                  onMouseDown={(e) => {
                    setTemporaryWire({
                      from: {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      fromId: gateId,
                      to: {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      active: false,
                      fromTerminal: 'output',
                    });
                  }}
                ></circle>
              </svg>
            </div>
            <div
              className="order-1 h-[2px] min-w-4 grow"
              style={{
                backgroundColor: item.settings.color || '#000',
              }}
            />
            <div
              className={cn('absolute z-[1] -order-1 h-2 w-2 rounded-[50%] border-2 bg-white', {
                hidden: !isInverted,
              })}
              style={{
                borderColor: item.settings.color || '#000',
              }}
            ></div>
          </div>
        </div>
        <div
          className="flex flex-col items-end justify-center"
          style={{
            gridColumn: '1 / span 1',
            gridRow: '2 / span 1',
          }}
        >
          {Array.from({
            // length: inputs > defaultInputs[type] ? inputs : defaultInputs[type],
            length:
              inputs < defaultInputs[type].min
                ? defaultInputs[type].min
                : inputs > defaultInputs[type].max
                  ? defaultInputs[type].max
                  : inputs,
          }).map((_, index) => (
            <div key={index} className="pointer-events-none relative mb-[2.5px] flex w-7 flex-row items-center last-of-type:mb-0">
              <div
                className="relative z-[1]"
                style={{
                  lineHeight: 0,
                }}
              >
                <svg
                  style={{
                    overflow: 'visible',
                    width: '12.5px',
                    height: '12.5px',
                  }}
                  className="pointer-events-auto transition-transform hover:scale-[1.2]"
                  data-logicate-input-terminal={index}
                >
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="6"
                    stroke={item.settings.color || '#000'}
                    strokeWidth="1"
                    fill="white"
                    data-logicate-input-terminal={index}
                    data-logicate-node-parent-id={gateId}
                    data-logicate-parent-terminal-index={index}
                    data-logicate-parent-terminal-type="input"
                  ></circle>
                </svg>
              </div>
              <div
                className={cn('h-[2px] min-w-4 grow', {
                  'mr-px min-w-0': isOrType,
                })}
                style={{
                  backgroundColor: item.settings.color || '#000',
                }}
              />
              <div
                className="absolute z-[1] hidden h-2 w-2 rounded-[50%] border-2 bg-white"
                style={{
                  borderColor: item.settings.color || '#000',
                }}
              ></div>
            </div>
          ))}
        </div>
        <div
          className={cn(
            'flex min-h-8 w-8 min-w-[30px] items-center justify-center border-black bg-transparent transition-[filter] duration-100',
            {
              // "filter-[drop-shadow(0px_0px_3px_#0079db)]": isSelected,
              'border-none': inputs < 4,
              'my-[5.25px] self-stretch border-l-2': inputs > 3 && !isOrType && !isXorXnorType,
              'my-[5.25px] self-stretch bg-repeat-y': inputs > 3 && (isOrType || isXorXnorType),
              '-ml-[4.5px] -mr-px w-[36px]': isOrType,
              '-ml-[9px] -mr-px w-[40px]': isXorXnorType,
            }
          )}
          style={{
            gridColumn: '2 / span 1',
            gridRow: '2 / span 1',
            filter: isSelected(gateId) ? `drop-shadow(0px 0px 3px #0079db)` : 'none',
            ...(inputs > 3 &&
              isOrType && {
                backgroundImage: `url(${createSVGColouredElement(item.settings.color || '#000')})`,
                backgroundPosition: 'center left',
              }),
          }}
        >
          <div className="pointer-events-auto flex h-full w-full items-center justify-center">
            {/* <span
              className={cn('min-h-8 w-8 select-none bg-no-repeat', {
                '-ml-[2px]': inputs > 3,
                'w-[38px]': isOrType,
                'w-[40px]': isXorXnorType,
              })}
              style={{
                backgroundImage: `url(${gateTypeToIcon[type]})`,
              }}
              data-logicate-body
            ></span> */}
            {(() => {
              switch (type) {
                case GateType.AND:
                case GateType.NAND:
                  return <AndBody item={item} />;
                case GateType.OR:
                case GateType.NOR:
                  return <OrBody item={item} />;
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
});

Gate.displayName = 'Logicate Logic Gate';
