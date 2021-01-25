import React, { useLayoutEffect, useRef, useState } from 'react';
import { getClickCoords, getDimensions, getPixelAsRGBHex } from '../../util/canvas';
import Marker from "./Marker";

const drawCanvas = (ctx, hue) => {
    // TODO: See if <svg> or even <div> elements are faster... 🧐
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
    const last = useRef({ hue, markerPosition });

    const selectColour = event => {
        const canvas = canvasRef.current;
        const coords = getClickCoords(canvas, event);
        const colour = getPixelAsRGBHex(canvas, coords);

        setMarkerPosition(coords);
        onColourUpdate(colour);
    }

    useLayoutEffect(() => {
        drawCanvas(canvasRef.current.getContext('2d'), hue);

        if (hue !== last.current.hue) {
            // The hue has been changed, so we need to update the colour.
            onColourUpdate(getPixelAsRGBHex(canvasRef.current, last.current.markerPosition));
        }

        last.current.hue = hue;
    }, [last, hue, onColourUpdate]);

    return (
        <div className={'palette'}>
            <canvas ref={canvasRef} onClickCapture={selectColour} />
            <Marker position={markerPosition} />
        </div>
    );
}