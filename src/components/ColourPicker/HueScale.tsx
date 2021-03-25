import { useEffect, useRef, useState, MouseEvent } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { getClickCoords, getDimensions } from '../../util/canvas';
import Marker from './Marker';
import styles from './HueScale.module.scss';

const drawCanvas = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = getDimensions(ctx.canvas);
  const hueGradient = ctx.createLinearGradient(0, 0, 0, height);

  // No visible difference between 10 and 360 color stops, so may as well save some time...
  for (let i = 0; i <= 36; i++) {
    hueGradient.addColorStop(1 - i / 36, `hsla(${i * 10},100%,50%,1)`);
  }

  ctx.fillStyle = hueGradient;
  ctx.fillRect(0, 0, width, height);
};

export default function HueScale({ onHueUpdate }: InferProps<typeof HueScale.propTypes>) {
  const [markerPosition, setMarkerPosition] = useState({ y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const inferHue = (event: MouseEvent) => {
    if (canvasRef.current === null) return;

    const { y } = getClickCoords(canvasRef.current, event);
    const hueValue = Math.round((1 - y / canvasRef.current.height) * 360);

    setMarkerPosition({ y });
    onHueUpdate(hueValue);
  };

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext('2d');
    if (ctx) {
      drawCanvas(ctx);
    }
  }, []);

  return (
    <div className={`${styles.hueScale} hueScale`}>
      <canvas ref={canvasRef} onClick={inferHue} />
      <Marker position={markerPosition} />
    </div>
  );
}

HueScale.propTypes = {
  onHueUpdate: PropTypes.func.isRequired,
};
