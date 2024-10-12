import { create } from 'zustand'
import { Item, Selected, SelectedItem, SelectedWire, TempWire, Wire } from '../types'

export interface State {
  wires: Wire[]
  items: Item[]
  selected: Selected[]
  canvas: {
    x: number
    y: number
    zoom: number
  }
  isHolding: boolean
  temporaryWire: TempWire | null
  updatingDatabase: {
    is: boolean
    lastUpdated: number | null
    progress?: number
  }
  recentActions: []
  currentTool: 'select' | 'drag-canvas'
}

interface Actions {
  setCurrentTool: (tool: State['currentTool']) => void
  setWires: (wires: Wire[]) => void
  addWire: (wire: Wire) => void
  removeWire: (wire: Wire) => void
  setItems: (items: Item[]) => void
  addItem: (item: Item) => void
  removeItem: (item: Item) => void
  setSelected: (selected: Selected[]) => void
  setSelectedIds: (selected: Selected['id'][]) => void
  setItemsSelected: (selected: Item[]) => void
  select: (item: Selected) => void
  unselect: (item: Selected) => void
  setCanvas: (canvas: { x: number; y: number; zoom: number }) => void
  setZoom: (zoom: number) => void
  setX: (x: number) => void
  setY: (y: number) => void
  getZoom: () => number
  getX: () => number
  getY: () => number
  canvasU: (update: (canvas: State['canvas']) => State['canvas']) => void
  itemsUpdate: (update: (items: State['items']) => State['items']) => void
  updateItem: (id: Item['id'], item: Partial<Item>) => void
  updateItemPosition: (id: Item['id'], position: { x: number; y: number }) => void
  setHolding: (isHolding: boolean) => void
  isSelected: (itemId: Item['id'] | Wire['id']) => boolean
  getItem: (id: Item['id']) => Item | undefined
  selectItemId: (id: Item['id']) => void
  selectWireId: (id: Wire['id']) => void
  unselectItemId: (id: Item['id']) => void
  unselectWireId: (id: Wire['id']) => void
  setTemporaryWire: (wire: TempWire | null) => void
  updateTemporaryWire: (update: (wire: TempWire) => TempWire) => void
  updateSelected: () => void
  setUpdatingDatabase: ({ is, lastUpdated, progress }: { is: boolean; lastUpdated: number | null; progress?: number }) => void
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
  updatingDatabase: {
    is: false,
    lastUpdated: 0,
  },
  recentActions: [],
  currentTool: 'select',
  setCurrentTool: (tool) => set({ currentTool: tool }),
  setWires: (wires) => set({ wires }),
  addWire: (wire) => set((state) => ({ wires: [...state.wires, wire] })),
  removeWire: (wire) => set((state) => ({ wires: state.wires.filter((w) => w.id !== wire.id) })),
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (item) => set((state) => ({ items: state.items.filter((i) => i.id !== item.id) })),
  setSelected: (selected) => {
    set({ selected })
  },
  setItemsSelected: (items) => {
    const itemsSelected = items.map((item) => ({ ...item, selectedType: 'item' }) as SelectedItem)
    set({ selected: itemsSelected })
  },
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
    set((state) => {
      return {
        items: state.items.map((i) => (i.id === id ? ({ ...i, ...item } as Item) : i)),
      }
    }),
  updateItemPosition: (id, position) =>
    set((state) => {
      return { items: state.items.map((i) => (i.id === id ? ({ ...i, ...position } as Item) : i)) }
    }),
  canvasU: (update) => set((state) => ({ canvas: update(state.canvas) })),
  itemsUpdate: (update) => set((state) => ({ items: update(state.items) })),
  setHolding: (isHolding) => set({ isHolding }),
  isSelected: (itemId) => get().selected.some((i) => i.id === itemId),
  getItem: (id) => get().items.find((i) => i.id === id),
  setSelectedIds(selected) {
    set((state) => {
      const itemsSelected = state.items
        .filter((item) => selected.includes(item.id))
        .map((item) => ({ ...item, selectedType: 'item' }) as SelectedItem)
      return { selected: itemsSelected }
    })
  },
  selectItemId: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id)
      if (item) {
        const newSelected: Selected[] = [
          ...state.selected,
          {
            ...item,
            selectedType: 'item',
          },
        ]
        return {
          ...state,
          selected: newSelected,
        }
      }
      return state
    }),
  selectWireId: (id) =>
    set((state) => {
      const wire = state.wires.find((w) => w.id === id)
      if (wire) {
        return {
          selected: [...state.selected, { ...wire, selectedType: 'wire' } as SelectedWire],
        }
      }
      return state
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
          if (i.selectedType === 'item') {
            const item = state.items.find((item) => item.id === i.id)
            return item ? ({ ...item, selectedType: 'item' } as SelectedItem) : null
          } else if (i.selectedType === 'wire') {
            const wire = state.wires.find((wire) => wire.id === i.id)
            return wire ? ({ ...wire, selectedType: 'wire' } as SelectedWire) : null
          }
          return null
        })
        .filter((item): item is Selected => item !== null),
    })),
  setUpdatingDatabase: ({ is, lastUpdated, progress }) => set({ updatingDatabase: { is, lastUpdated, progress } }),
}))

export default useCanvasStore
