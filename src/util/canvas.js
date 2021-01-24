export const getClickCoords = (canvas, clickEvent) => {
    const boundingBox = canvas.getBoundingClientRect();

    return { x: clickEvent.clientX - boundingBox.left, y: clickEvent.clientY - boundingBox.top }
};

export const getPixelAsRGBHex = (canvas, {x, y}) => {
    const pixel = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    const rgba = pixel.slice(0, 3);

    return rgba.reduce((hex, component) =>  hex + component.toString(16).padStart(2, '0'), '#');
};