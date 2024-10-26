import { useEffect, useRef } from "react"
import useCanvasStore from "./hooks/useCanvasStore"

export default function BackgroundElement({
  showBackground = true,
  canvasReference,
}: {
  showBackground: boolean
  canvasReference?: React.RefObject<HTMLDivElement | null>
}) {
  const { canvas } = useCanvasStore()
  const backgroundElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!backgroundElementRef.current) return
    if (!canvasReference?.current) return
    const { zoom } = canvas
    // const { width, height } = canvasReference.current.getBoundingClientRect();

    // Update the background size style property on the background element - HOWEVer, we want it to zoom around the center of the canvas
    const newBackgroundSize = `${50 * zoom}px ${50 * zoom}px`
    backgroundElementRef.current.style.backgroundSize = newBackgroundSize
    // backgroundElementRef.current.style.backgroundPosition = `${width / 2}px ${height / 2}px`;
  }, [canvasReference, canvas])

  if (!showBackground) return null
  // if (!canvasReference.current) return null;

  return (
    <div
      data-logicate-canvas-background
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: `url(/_static/grid.png)`,
        backgroundRepeat: "repeat",
        backgroundSize: "50px 50px",
        backgroundPosition: "center",
        // imageResolution: "72dpi",
        // backgroundPosition: `${canvas.x || 0}px ${canvas.y || 0}px`,
        // transition for background position
        transition: "background-position 1s ease-in-out",
      }}
      ref={backgroundElementRef}
    />
  )
}
