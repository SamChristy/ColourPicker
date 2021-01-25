export const getClickCoords = (element, clickEvent) => {
    const boundingBox = element.getBoundingClientRect();

    return { x: clickEvent.clientX - boundingBox.left, y: clickEvent.clientY - boundingBox.top }
};

export const getPixelAsRGBHex = (canvas, { x, y }) => {
    // TODO: Refactor this to infer saturation & lightness values from position.
    const pixel = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    const rgba = pixel.slice(0, 3);

    return rgba.reduce((hex, component) =>  hex + component.toString(16).padStart(2, '0'), '#');
};

export const getDimensions = canvas => {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    return { width, height };
}