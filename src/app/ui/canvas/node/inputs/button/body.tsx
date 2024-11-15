import { cn } from "@/lib"
import { darkerColour, lighterColour } from "@/lib/color"
import { useCallback, useEffect } from "react"
import useCanvasStore from "../../../hooks/useCanvasStore"
import { InputItem } from "../../../types"

export default function ButtonBody({ input }: { input: InputItem }) {
  const { updateItem } = useCanvasStore()

  const handleClickDown = useCallback(() => {
    updateItem(input.id, {
      value: true,
    })
  }, [input.id, input.value, updateItem])

  const handleClickUp = useCallback(() => {
    updateItem(input.id, {
      value: false,
    })
  }, [input.id, input.value, updateItem])

  useEffect(() => {
    if (input.value === true) {
      document.addEventListener("mouseup", handleClickUp)
    } else {
      document.removeEventListener("mouseup", handleClickUp)
    }

    return () => {
      document.removeEventListener("mouseup", handleClickUp)
    }
  }, [input.value])

  return (
    <svg
      style={{ overflow: "visible", width: "30px", height: "30px" }}
      className={cn("pointer-events-auto")}
      onMouseDown={handleClickDown}
      data-logicate-input-content
    >
      <g>
        <circle
          className={cn("pointer-events-auto", {
            "fill-current": input.value === true,
          })}
          style={{
            color: (input.settings.color || "#000").startsWith("#000")
              ? "#6c92e4"
              : lighterColour(input.settings.color || "#6c92e4", 10) || "#6c92e4",
          }}
          fill="#FFFFFF"
          stroke={darkerColour(input.settings.color || "#000", 70) || "#000"}
          cx="15"
          cy="15"
          r="15"
          data-logicate-input-content
        ></circle>
        <circle
          className="cursor-pointer"
          fill="#FFFFFF"
          stroke={darkerColour(input.settings.color || "#000", 70) || "#000"}
          strokeWidth="1"
          cx="15"
          cy="15"
          r="11"
          data-logicate-input-content
          data-logicate-button-clickable
        />
      </g>
    </svg>
  )
}
