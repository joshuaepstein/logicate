import { icons } from "@jfstech/icons-react/24/outline"
import React from "react"

export const getIconFromKey = (key: keyof typeof icons): React.ReactNode => {
  return icons[key]
}
