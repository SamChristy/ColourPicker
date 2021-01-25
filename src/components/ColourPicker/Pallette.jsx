import React, { useLayoutEffect, useRef, useState } from 'react';

import Marker from "./Marker";
import { getClickCoords, getDimensions, getPixelAsRGBHex } from '../../util/canvas';

const drawCanvas = (ctx, hue) => {
    const { width, height } = getDimensions(ctx.canvas);
    const saturationGradient = ctx.createLinearGradient(0, 0, width, 0);
    const brightnessGradient = ctx.createLinearGradient(0, 0, 0, height);

    saturationGradient.addColorStop(0, `hsla(${hue},100%,50%,0)`);
    saturationGradient.addColorStop(1, `hsla(${hue},100%,50%,1)`);
    brightnessGradient.addColorStop(0, "white")
    brightnessGradient.addColorStop(1, "black");

    // Let the browser/GPU do the work...
    ctx.fillStyle = brightnessGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = saturationGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";
};

export default function Palette({ hue, onColourUpdate }) {
    const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    const selectColour = event => {
        const canvas = canvasRef.current;
        const coords = getClickCoords(canvas, event);
        const colour = getPixelAsRGBHex(canvas, coords);

        setMarkerPosition(coords);
        onColourUpdate(colour);
    }

    useLayoutEffect(() => {
        drawCanvas(canvasRef.current.getContext('2d'), hue);

        if (hue !== 0) {
            // The hue has been changed, so we need to update the selected colour.
            onColourUpdate(getPixelAsRGBHex(canvasRef.current, markerPosition));
        }
    }, [markerPosition, hue, onColourUpdate]);

    return (
        <div className={'palette'}>
            <canvas ref={canvasRef} onClickCapture={selectColour} />
            <Marker position={markerPosition} />
        </div>

    );
}