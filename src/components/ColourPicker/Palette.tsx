import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { getClickCoords, getDimensions, getPixel } from '../../util/canvas';
import Marker from "./Marker";
import styles from "./Palette.module.scss";

const drawCanvas = (ctx: CanvasRenderingContext2D, hue: number) => {
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

export default function Palette({ hue, onColourUpdate }: InferProps<typeof Palette.propTypes>) {
    const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });
    const last = useRef({ hue });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onClick = (event: MouseEvent) => {
        if (canvasRef.current === null) return;

        const coords = getClickCoords(canvasRef.current, event);
        const colour = getPixel(canvasRef.current, coords);

        setMarkerPosition(coords);
        onColourUpdate(colour);
    }

    useEffect(() => {
        if (canvasRef.current === null) return;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx === null) return;

        drawCanvas(ctx, hue);

        if (hue !== last.current.hue) {
            // The hue has been changed, so we need to update the colour.
            onColourUpdate(getPixel(canvasRef.current, markerPosition));
        }

        last.current.hue = hue;
    }, [last, markerPosition, hue, onColourUpdate]);

    return (
        <div className={`${styles.palette} palette`}>
            <canvas ref={canvasRef} onClick={onClick} />
            <Marker position={markerPosition} />
        </div>
    );
}

Palette.propTypes = {
    hue: PropTypes.number.isRequired,
    onColourUpdate: PropTypes.func.isRequired,
};