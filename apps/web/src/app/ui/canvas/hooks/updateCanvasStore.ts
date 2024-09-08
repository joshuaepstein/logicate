import { useEffect } from 'react';
import SuperJSON from 'superjson';
import useCanvasStore from './useCanvasStore';

const useUpdateCanvasStore = (canvasId: string) => {
  const canvasStore = useCanvasStore();

  useEffect(() => {
    const stringified = SuperJSON.stringify(canvasStore);
    localStorage.setItem(canvasId, stringified);
  }, [canvasStore]);
};

export default useUpdateCanvasStore;
