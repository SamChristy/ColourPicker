type Position = {
  x: number;
  y: number;
};

/**
 * Gets the coordinates of a click event on a DOM element.
 */
export const getClickCoords = (
  element: HTMLElement,
  clickEvent: MouseEvent | React.MouseEvent
): Position => {
  const boundingBox = element.getBoundingClientRect();

  return { x: clickEvent.clientX - boundingBox.left, y: clickEvent.clientY - boundingBox.top };
};

/**
 * Gets the pixel data from the canvas, at the specified location.
 */
export const getPixel = (canvas: HTMLCanvasElement, { x, y }: Position): Uint8ClampedArray | null =>
  canvas?.getContext('2d')?.getImageData(x, y, 1, 1).data || null;

/**
 * Converts an Uint8ClampedArray to a CSS hexadecimal colour, e.g. '#ff0000'.
 */
export const rgbaToHex = (rgbaArray: Uint8ClampedArray): string => {
  const rgb = rgbaArray.slice(0, 3);
  return rgb.reduce(
    (hex: string, component: number) => hex + component.toString(16).padStart(2, '0'),
    '#'
  );
};

/**
 * The <canvas> element's `width` and `height` props are separate from the width and height set by
 * CSS rules; so it's necessary to infer them from the DOM and explicitly apply them to the canvas
 * (so that pixels on the canvas and screen have a 1:1 mapping).
 */
export const getDimensions = (canvas: HTMLCanvasElement): DOMRect => {
  const bounds = canvas.getBoundingClientRect();
  canvas.setAttribute('width', String(bounds.width));
  canvas.setAttribute('height', String(bounds.height));

  return bounds;
};
