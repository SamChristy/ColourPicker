import React, { useEffect, useRef } from 'react';

import { getClickCoords } from "../../util/canvas";

const renderHueScale = (ctx, width, height) => {
    const hueGradient = ctx.createLinearGradient(0, 0, 0, height);

    for (let i = 0; i <= 360; i++) {
        hueGradient.addColorStop(1 - i / 360, `hsla(${i},100%,50%,1)`);
    }

    ctx.fillStyle = hueGradient;
    ctx.fillRect(width - width, 0, width, height);
};

export default function HueScale({ width, height, onHueUpdate }) {
    const ref = useRef(null);

    const inferHue = event => {
        const { y } = getClickCoords(ref.current, event)
        const hueValue = Math.round((1 - y / height) * 360);

        onHueUpdate(hueValue);
    }

    useEffect(() => {
        const canvasContext = ref.current.getContext('2d')
        renderHueScale(canvasContext, width, height);
    }, [width, height]);

    return (
        <canvas ref={ref} width={width} height={height} onClickCapture={inferHue} />
    );
}