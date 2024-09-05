export function cursorInside(e: MouseEvent, bounds: DOMRect) {
  return e.clientX > bounds.left && e.clientX < bounds.right && e.clientY > bounds.top && e.clientY < bounds.bottom;
}
