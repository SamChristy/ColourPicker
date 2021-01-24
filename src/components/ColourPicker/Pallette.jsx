import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Marker from "./Marker";
import { getClickCoords, getPixelAsRGBHex, resetCanvas } from '../../util/canvas';

const renderPalette = (ctx, hue, { width, height }) => {
    resetCanvas(ctx, { width, height });

    const saturationGradient = ctx.createLinearGradient(0, 0, width, 0);
    const brightnessGradient = ctx.createLinearGradient(0, 0, 0, height);

    saturationGradient.addColorStop(0, `hsla(${hue},100%,50%,0)`);
    saturationGradient.addColorStop(1, `hsla(${hue},100%,50%,1)`);
    brightnessGradient.addColorStop(0, "white")
    brightnessGradient.addColorStop(1, "black");

    // Let the browser/GPU do the work...
    ctx.fillStyle = saturationGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = brightnessGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";
};

export default function Palette({ hue, onColourUpdate }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [markerPosition, setMarkerPosition] = useState({});
    const ref = useRef(null);

    const selectColour = event => {
        const canvas = ref.current;
        const coords = getClickCoords(canvas, event);

        setMarkerPosition(coords);
        onColourUpdate(getPixelAsRGBHex(canvas, coords));
    }

    useLayoutEffect(() => ref.current
        && setDimensions({ width: ref.current.offsetWidth, height: ref.current.offsetHeight }), []);
    useEffect(() => ref.current && renderPalette(ref.current.getContext('2d'), hue, dimensions), [hue, dimensions]);

    return (
        <div className={'palette'}>
            <canvas ref={ref} onClickCapture={selectColour} />
            <Marker position={markerPosition} />
        </div>

    );
}