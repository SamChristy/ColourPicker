import React, { useRef, useEffect } from 'react';

export default function ColourPicker({width, height}) {
    const HUE_SCALE_WIDTH_PERCENTAGE = 10;
    const PADDING = 2;
    const canvasRef = useRef(null);

    const renderPalette = ctx => {
        const paletteWidth = Math.round(width * (1 - (HUE_SCALE_WIDTH_PERCENTAGE + PADDING) / 100));
        const hue = 311;
        const saturationGradient = ctx.createLinearGradient(0, 0, paletteWidth, 0);
        const brightnessGradient = ctx.createLinearGradient(0, 0, 0, height);

        saturationGradient.addColorStop(0, `hsla(${hue},100%,50%,0)`);
        saturationGradient.addColorStop(1, `hsla(${hue},100%,50%,1)`);
        brightnessGradient.addColorStop(0, "white")
        brightnessGradient.addColorStop(1, "black");

        // Let the browser/GPU do the work...
        ctx.fillStyle = saturationGradient;
        ctx.fillRect(0, 0, paletteWidth, height);
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = brightnessGradient;
        ctx.fillRect(0, 0, paletteWidth, height);
        ctx.globalCompositeOperation = "source-over";
    };
    const renderHueScale = ctx => {
        const scaleWidth = Math.round(width * HUE_SCALE_WIDTH_PERCENTAGE / 100);
        const hueGradient = ctx.createLinearGradient(0, 0, 0, height);

        for (let i = 0; i <= 360; i++) {
            hueGradient.addColorStop(1 - i / 360, `hsla(${i},100%,50%,1)`);
        }

        ctx.fillStyle = hueGradient;
        ctx.fillRect(width - scaleWidth, 0, width, height);
    };

    useEffect(() => {
        const canvasContext = canvasRef.current.getContext('2d')
        renderPalette(canvasContext);
        renderHueScale(canvasContext);
    });

    return (
        <>
            <canvas ref={canvasRef} width={width} height={height} />
        </>
    );
}