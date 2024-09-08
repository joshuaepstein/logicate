import useCanvasStore from './useCanvasStore';

export const useNode = (id: string) => {
  const { items } = useCanvasStore();
  return items.find((item) => item.id === id);
};
