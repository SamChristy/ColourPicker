import PropTypes, { InferProps } from 'prop-types';
import styles from './Marker.module.scss';

export default function Marker({
  position: { x, y },
  onClick,
}: InferProps<typeof Marker.propTypes>) {
  const style = {
    ...(typeof x === 'number' ? { left: `${Math.round(x)}px` } : {}),
    top: `${Math.round(y)}px`,
  };

  // eslint-disable-next-line -- because the onclick handler is just a proxy
  return <div className={`${styles.marker} marker`} style={style} onClick={onClick} />;
}

Marker.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
