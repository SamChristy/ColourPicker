import React, { useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";
import { getClickCoords, getDimensions } from "../../util/canvas";
import Marker from "./Marker";

const drawCanvas = ctx => {
    const { width, height } = getDimensions(ctx.canvas);
    const hueGradient = ctx.createLinearGradient(0, 0, 0, height);

    // No visible difference between 10 and 360 color stops, so may as well save some time...
    for (let i = 0; i <= 36; i++) {
        hueGradient.addColorStop(1 - i / 36, `hsla(${i*10},100%,50%,1)`);
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

    useEffect(() => drawCanvas(canvasRef.current.getContext('2d')), []);

    return (
        <div className={'hueScale'}>
            <canvas ref={canvasRef} onClickCapture={inferHue} />
            <Marker position={markerPosition} />
        </div>
    );
}

HueScale.propTypes = {
    onHueUpdate: PropTypes.func.isRequired,
};