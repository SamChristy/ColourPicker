/**
 * Gets the coordinates of a click event on a DOM element.
 *
 * @param {DOMElement} element
 * @param {object} clickEvent
 * @returns {{x: number, y: number}}
 */
export const getClickCoords = (element: HTMLElement, clickEvent: { clientX: number, clientY: number }) => {
    const boundingBox = element.getBoundingClientRect();

    return { x: clickEvent.clientX - boundingBox.left, y: clickEvent.clientY - boundingBox.top };
};

/**
 * Gets the pixel data from the canvas, at the specified location.
 *
 * @todo Refactor to infer saturation & lightness values from position.
 *
 * @param {DOMElement} canvas
 * @param {{x: number, y: number}} position
 * @returns {Uint8ClampedArray | null} [red, green, blue, alpha]
 */
export const getPixel = (canvas: HTMLCanvasElement, { x, y }: { x: number, y: number }): Uint8ClampedArray | null =>
    canvas?.getContext('2d')?.getImageData(x, y, 1, 1).data || null;

/**
 * Converts an Uint8ClampedArray to a CSS hexadecimal colour, e.g. '#ff0000'.
 *
 * @param {number[]|Uint8ClampedArray} rgbaArray
 * @returns {string}
 */
export const rgbaToHex = (rgbaArray: Uint8ClampedArray): string => {
    const rgb = rgbaArray.slice(0, 3);
    return rgb.reduce((hex: string, component: number) =>  hex + component.toString(16).padStart(2, '0'), '#');
};

/**
 * The <canvas> element's `width` and `height` props are separate from the width and height set by
 * CSS rules; so it's necessary to infer them from the DOM and explicitly apply them to the canvas
 * (so that pixels on the canvas and screen have a 1:1 mapping).
 *
 * @param {DOMElement} canvas
 * @returns {{width: number, height: number}}
 */
export const getDimensions = (canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    return { width, height };
}