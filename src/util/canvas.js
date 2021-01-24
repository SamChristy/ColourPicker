export const getClickCoords = (canvas, clickEvent) => {
    const boundingBox = canvas.getBoundingClientRect();

    return { x: clickEvent.clientX - boundingBox.left, y: clickEvent.clientY - boundingBox.top }
};