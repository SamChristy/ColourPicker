import React, { useLayoutEffect, useRef, useState } from 'react';

import Marker from "./Marker";
import { getClickCoords, getDimensions } from "../../util/canvas";

const drawCanvas = ctx => {
    const { width, height } = getDimensions(ctx.canvas);
    const hueGradient = ctx.createLinearGradient(0, 0, 0, height);

    for (let i = 0; i <= 360; i++) {
        hueGradient.addColorStop(1 - i / 360, `hsla(${i},100%,50%,1)`);
    }

    ctx.fillStyle = hueGradient;
    ctx.fillRect(0, 0, width, height);
};

export default function HueScale({ onHueUpdate }) {
    const [markerPosition, setMarkerPosition] = useState({ y: 0 });
    const canvasRef = useRef(null);

    const inferHue = event => {
        const { y } = getClickCoords(canvasRef.current, event)
        const hueValue = Math.round((1 - y / canvasRef.current.height) * 360);

        setMarkerPosition({ y });
        onHueUpdate(hueValue);
    }

    useLayoutEffect(() => drawCanvas(canvasRef.current.getContext('2d'), []));

    return (
        <div className={'hueScale'}>
            <canvas ref={canvasRef} onClickCapture={inferHue} />
            <Marker position={markerPosition} />
        </div>
    );
}