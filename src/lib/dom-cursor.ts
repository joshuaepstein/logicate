export function cursorInside(e: MouseEvent, bounds: DOMRect) {
  return e.clientX > bounds.left && e.clientX < bounds.right && e.clientY > bounds.top && e.clientY < bounds.bottom
}

export function cursorInsideElement(position: { x: number; y: number }, bounds: DOMRect) {
  return position.x > bounds.left && position.x < bounds.right && position.y > bounds.top && position.y < bounds.bottom
}
