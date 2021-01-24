import React, { useEffect, useRef } from 'react';

export default function Palette({ width, height, hue }) {
    const ref = useRef(null);

    const renderPalette = ctx => {
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

    useEffect(() => {
        const canvasContext = ref.current.getContext('2d')
        renderPalette(canvasContext);
    });

    return (
        <canvas ref={ref} width={width} height={height} />
    );
}