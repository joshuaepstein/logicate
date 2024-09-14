export const darkerColour = (color: string, amount: number) => {
  // Convert the colour to RGB
  const rgb = hexToRgb(color)
  if (!rgb) return color
  // Adjust the RGB values to make the colour darker
  const darkerRgb = {
    r: Math.max(0, rgb.r - amount),
    g: Math.max(0, rgb.g - amount),
    b: Math.max(0, rgb.b - amount),
  }
  // Convert the RGB values back to a hex colour
  return `#${((1 << 24) + (darkerRgb.r << 16) + (darkerRgb.g << 8) + darkerRgb.b).toString(16).slice(1)}`
}

export const lighterColour = (color: string, amount: number) => {
  // Convert the colour to RGB
  const rgb = hexToRgb(color)
  if (!rgb) return color
  // Adjust the RGB values to make the colour lighter
  const lighterRgb = {
    r: Math.min(255, rgb.r + amount),
    g: Math.min(255, rgb.g + amount),
    b: Math.min(255, rgb.b + amount),
  }
  // Convert the RGB values back to a hex colour
  return `#${((1 << 24) + (lighterRgb.r << 16) + (lighterRgb.g << 8) + lighterRgb.b).toString(16).slice(1)}`
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}
