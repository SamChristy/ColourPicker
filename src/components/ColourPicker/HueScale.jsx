import React, { useEffect, useRef } from 'react';

import { getClickCoords } from "../../util/canvas";


export default function HueScale({ width, height, onHueUpdate }) {
    const ref = useRef(null);

    const renderHueScale = ctx => {
        const hueGradient = ctx.createLinearGradient(0, 0, 0, height);

        for (let i = 0; i <= 360; i++) {
            hueGradient.addColorStop(1 - i / 360, `hsla(${i},100%,50%,1)`);
        }

        ctx.fillStyle = hueGradient;
        ctx.fillRect(width - width, 0, width, height);
    };
    const inferHue = event => {
        const { y } = getClickCoords(ref.current, event)

        onHueUpdate(Math.round((1 - y / height) * 360));
    }

    useEffect(() => {
        const canvasContext = ref.current.getContext('2d')
        renderHueScale(canvasContext);
    }, []);

    return (
        <canvas ref={ref} width={width} height={height} onClickCapture={inferHue} />
    );
}