/**
 * Gets the coordinates of a click event on a DOM element.
 *
 * @param {DOMElement} element
 * @param {object} clickEvent
 * @returns {{x: number, y: number}}
 */
export const getClickCoords = (element, clickEvent) => {
    const boundingBox = element.getBoundingClientRect();

    return { x: clickEvent.clientX - boundingBox.left, y: clickEvent.clientY - boundingBox.top };
};

/**
 * Gets the pixel data from the canvas, at the specified location.
 *
 * @todo Refactor to infer saturation & lightness values from position.
 *
 * @param {DOMElement} canvas
 * @param {number} x
 * @param {number} y
 * @returns {Uint8ClampedArray} [red, green, blue, alpha]
 */
export const getPixel = (canvas, { x, y }) => canvas.getContext('2d').getImageData(x, y, 1, 1).data;

/**
 * Converts an RGBA array (or Uint8ClampedArray, returned by canvas' getImageData() method) to a
 * css hexadecimal colour, e.g. '#ff0000'.
 *
 * @param {number[]|Uint8ClampedArray} rgbaArray
 * @returns {string}
 */
export const rgbaToHex = rgbaArray => {
    const rgb = rgbaArray.slice(0, 3);
    return rgb.reduce((hex, component) =>  hex + component.toString(16).padStart(2, '0'), '#');
};

/**
 * The <canvas> element's `width` and `height` props are separate from the width and height set by
 * CSS rules; so it's necessary to infer them from the DOM and explicitly apply them to the canvas
 * (so that pixels on the canvas and screen have a 1:1 mapping).
 *
 * @param {DOMElement} canvas
 * @returns {{width: number, height: number}}
 */
export const getDimensions = canvas => {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    return { width, height };
}