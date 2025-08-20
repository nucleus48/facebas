export type Bound = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function getScaledBound(
  srcW: number,
  srcH: number,
  bound: Bound,
  scale: number
): Bound {
  "worklet";

  let { x, y, width, height } = bound;

  // Clamp scale to avoid overflow
  scale = Math.min((srcH - 1) / height, (srcW - 1) / width, scale);

  const newWidth = width * scale;
  const newHeight = height * scale;

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  let x1 = centerX - newWidth / 2;
  let y1 = centerY - newHeight / 2;
  let x2 = centerX + newWidth / 2;
  let y2 = centerY + newHeight / 2;

  // Clamp to left/top
  if (x1 < 0) {
    x2 -= x1;
    x1 = 0;
  }
  if (y1 < 0) {
    y2 -= y1;
    y1 = 0;
  }

  // Clamp to right/bottom
  if (x2 > srcW - 1) {
    x1 -= x2 - (srcW - 1);
    x2 = srcW - 1;
  }
  if (y2 > srcH - 1) {
    y1 -= y2 - (srcH - 1);
    y2 = srcH - 1;
  }

  // Final dimensions
  const finalX = Math.max(0, x1);
  const finalY = Math.max(0, y1);
  const finalWidth = x2 - finalX;
  const finalHeight = y2 - finalY;

  return {
    x: Math.round(finalX),
    y: Math.round(finalY),
    width: Math.round(finalWidth),
    height: Math.round(finalHeight),
  };
}
