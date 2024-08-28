import { Click } from "@logicate/utils/buttons";
import { useEffect } from "react";

const useDisableHook = (canvasReference: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    // disable right click context menu on canvas
    const disableContextMenu = (e: MouseEvent) => {
      if (e.button === 2) {
        if (canvasReference.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    const disableScroll = (e: WheelEvent) => {
      if (canvasReference.current) {
        if (e.buttons === Click.Auxiliary) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    canvasReference.current?.addEventListener(
      "contextmenu",
      disableContextMenu,
    );
    document.addEventListener("wheel", disableScroll);
    document.body.classList.add("fixed", "w-full", "h-full");
    return () => {
      canvasReference.current?.removeEventListener(
        "contextmenu",
        disableContextMenu,
      );
      document.removeEventListener("wheel", disableScroll);
      document.body.classList.remove("fixed", "w-full", "h-full");
    };
  });
};

export default useDisableHook;
