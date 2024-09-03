import { create } from "zustand";
import { Item, Wire } from "../types";

export interface State {
  wires: Wire[];
  items: Item[];
  selected: (Item | Wire)[];
  canvas: {
    x: number;
    y: number;
    zoom: number;
  };
  isHolding: boolean;
}

interface Actions {
  setWires: (wires: Wire[]) => void;
  addWire: (wire: Wire) => void;
  removeWire: (wire: Wire) => void;
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  setSelected: (selected: (Item | Wire)[]) => void;
  select: (item: Item | Wire) => void;
  unselect: (item: Item | Wire) => void;
  setCanvas: (canvas: { x: number; y: number; zoom: number }) => void;
  setZoom: (zoom: number) => void;
  setX: (x: number) => void;
  setY: (y: number) => void;
  getZoom: () => number;
  getX: () => number;
  getY: () => number;
  canvasU: (update: (canvas: State["canvas"]) => State["canvas"]) => void;
  updateItem: (id: Item["id"], item: Partial<Item>) => void;
  setHolding: (isHolding: boolean) => void;
  isSelected: (itemId: Item["id"] | Wire["id"]) => boolean;
  getItem: (id: Item["id"]) => Item | undefined;
  selectId: (id: Item["id"] | Wire["id"]) => void;
}

const useCanvasStore = create<State & Actions>((set, get) => ({
  wires: [],
  items: [],
  selected: [],
  canvas: {
    x: 0,
    y: 0,
    zoom: 1,
  },
  isHolding: false,
  setWires: (wires) => set({ wires }),
  addWire: (wire) => set((state) => ({ wires: [...state.wires, wire] })),
  removeWire: (wire) => set((state) => ({ wires: state.wires.filter((w) => w.id !== wire.id) })),
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (item) => set((state) => ({ items: state.items.filter((i) => i.id !== item.id) })),
  setSelected: (selected) => set({ selected }),
  select: (item) => set((state) => ({ selected: [...state.selected, item] })),
  unselect: (item) => set((state) => ({ selected: state.selected.filter((i) => i !== item) })),
  setCanvas: (canvas) => set({ canvas }),
  setZoom: (zoom) => set((state) => ({ canvas: { ...state.canvas, zoom } })),
  setX: (x) => set((state) => ({ canvas: { ...state.canvas, x } })),
  setY: (y) => set((state) => ({ canvas: { ...state.canvas, y } })),
  getZoom: () => get().canvas.zoom,
  getX: () => get().canvas.x,
  getY: () => get().canvas.y,
  updateItem: (id, item) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, ...item } : i)),
    })),
  canvasU: (update) => set((state) => ({ canvas: update(state.canvas) })),
  setHolding: (isHolding) => set({ isHolding }),
  isSelected: (itemId) => get().selected.some((i) => i.id === itemId),
  getItem: (id) => get().items.find((i) => i.id === id),
  selectId: (id) => set((state) => ({ selected: [...state.selected, ...state.items.filter((i) => i.id === id)] })),
}));

export default useCanvasStore;
