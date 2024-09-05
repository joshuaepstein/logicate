import { create } from "zustand";
import { Item, TempWire, Wire } from "../types";

type SelectedItem = Item & { selectedType: "item" };
type SelectedWire = Wire & { selectedType: "wire" };

type Selected = SelectedItem | SelectedWire;

export interface State {
  wires: Wire[];
  items: Item[];
  // selected: (Item & {
  //       type: "item";
  //     }) | (Wire & {
  //       type: "wire";
  //     })[];
  selected: Selected[];
  canvas: {
    x: number;
    y: number;
    zoom: number;
  };
  isHolding: boolean;
  temporaryWire: TempWire | null;
}

interface Actions {
  setWires: (wires: Wire[]) => void;
  addWire: (wire: Wire) => void;
  removeWire: (wire: Wire) => void;
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  setSelected: (selected: Selected[]) => void;
  select: (item: Selected) => void;
  unselect: (item: Selected) => void;
  setCanvas: (canvas: { x: number; y: number; zoom: number }) => void;
  setZoom: (zoom: number) => void;
  setX: (x: number) => void;
  setY: (y: number) => void;
  getZoom: () => number;
  getX: () => number;
  getY: () => number;
  canvasU: (update: (canvas: State["canvas"]) => State["canvas"]) => void;
  itemsUpdate: (update: (items: State["items"]) => State["items"]) => void;
  updateItem: (id: Item["id"], item: Partial<Item>) => void;
  setHolding: (isHolding: boolean) => void;
  isSelected: (itemId: Item["id"] | Wire["id"]) => boolean;
  getItem: (id: Item["id"]) => Item | undefined;
  selectItemId: (id: Item["id"]) => void;
  selectWireId: (id: Wire["id"]) => void;
  unselectItemId: (id: Item["id"]) => void;
  unselectWireId: (id: Wire["id"]) => void;
  setTemporaryWire: (wire: TempWire | null) => void;
  updateTemporaryWire: (update: (wire: TempWire) => TempWire) => void;
  updateSelected: () => void;
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
  temporaryWire: null,
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
      items: state.items.map((i) => (i.id === id ? ({ ...i, ...item } as Item) : i)),
    })),
  canvasU: (update) => set((state) => ({ canvas: update(state.canvas) })),
  itemsUpdate: (update) => set((state) => ({ items: update(state.items) })),
  setHolding: (isHolding) => set({ isHolding }),
  isSelected: (itemId) => get().selected.some((i) => i.id === itemId),
  getItem: (id) => get().items.find((i) => i.id === id),
  selectItemId: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (item) {
        return {
          selected: [
            ...state.selected,
            {
              ...item,
              selectedType: "item",
            } as SelectedItem,
          ],
        };
      }
      return state;
    }),
  selectWireId: (id) =>
    set((state) => {
      const wire = state.wires.find((w) => w.id === id);
      if (wire) {
        return {
          selected: [...state.selected, { ...wire, selectedType: "wire" } as SelectedWire],
        };
      }
      return state;
    }),
  unselectItemId: (id) => set((state) => ({ selected: state.selected.filter((i) => i.id !== id) })),
  unselectWireId: (id) => set((state) => ({ selected: state.selected.filter((i) => i.id !== id) })),
  setTemporaryWire: (wire) => set({ temporaryWire: wire }),
  updateTemporaryWire: (update) =>
    set((state) => ({
      temporaryWire: state.temporaryWire ? update(state.temporaryWire) : null,
    })),
  // updateSelected should use all the ids from the selected array in the state and get the new item or wires to reset all information
  updateSelected: () =>
    set((state) => ({
      selected: state.selected
        .map((i) => {
          if (i.selectedType === "item") {
            const item = state.items.find((item) => item.id === i.id);
            return item ? ({ ...item, selectedType: "item" } as SelectedItem) : null;
          } else if (i.selectedType === "wire") {
            const wire = state.wires.find((wire) => wire.id === i.id);
            return wire ? ({ ...wire, selectedType: "wire" } as SelectedWire) : null;
          }
          return null;
        })
        .filter((item): item is Selected => item !== null),
    })),
}));

export default useCanvasStore;
