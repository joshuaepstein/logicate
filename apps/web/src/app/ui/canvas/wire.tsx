export const Wire = ({
  startX,
  startY,
  endX,
  endY,
  isActive,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
  canvas: {
    x: number;
    y: number;
    zoom: number;
  };
  canvasReference: React.RefObject<HTMLDivElement>;
}) => {
  // Calculate control points for the Bézier curve
  const controlX1 = startX + (endX - startX) / 2;
  const controlY1 = startY;
  const controlX2 = startX + (endX - startX) / 2;
  const controlY2 = endY;

  return (
    <path
      d={`
              M ${startX},${startY}
              C ${controlX1},${controlY1}
                ${controlX2},${controlY2}
                ${endX},${endY}
              `}
      stroke={isActive ? "#4CAF50" : "#9E9E9E"}
      strokeWidth="2"
      fill="none"
    />
  );
};
