import { useEffect } from "react";
import SuperJSON from "superjson";
import useCanvasStore from "./hooks/useCanvasStore";

const updateStore = (canvasId: string) => {
  const canvasStore = useCanvasStore();

  useEffect(() => {
    const stringified = SuperJSON.stringify(canvasStore);
    localStorage.setItem(canvasId, stringified);
  }, [canvasStore]);
};

export default updateStore;
