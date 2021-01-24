import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Marker from "./Marker";
import { getClickCoords, resetCanvas } from "../../util/canvas";

const renderHueScale = (ctx, { width, height }) => {
    resetCanvas(ctx, { width, height });

    const hueGradient = ctx.createLinearGradient(0, 0, 0, height);

    for (let i = 0; i <= 360; i++) {
        hueGradient.addColorStop(1 - i / 360, `hsla(${i},100%,50%,1)`);
    }

    ctx.fillStyle = hueGradient;
    ctx.fillRect(0, 0, width, height);
};

export default function HueScale({ onHueUpdate }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [markerPosition, setMarkerPosition] = useState({ y: 0 });
    const ref = useRef(null);

    const inferHue = event => {
        const { y } = getClickCoords(ref.current, event)
        const hueValue = Math.round((1 - y / dimensions.height) * 360);

        setMarkerPosition({ y });
        onHueUpdate(hueValue);
    }

    useLayoutEffect(() => ref.current
        && setDimensions({ width: ref.current.offsetWidth, height: ref.current.offsetHeight }), []);
    useEffect(() => ref.current && renderHueScale(ref.current.getContext('2d'), dimensions), [dimensions]);

    return (
        <div className={'hueScale'}>
            <canvas ref={ref} onClickCapture={inferHue} />
            <Marker position={markerPosition} />
        </div>
    );
}