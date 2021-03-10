import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styles from './Marker.module.scss';

export default function Marker({ position: { x, y } }: InferProps<typeof Marker.propTypes>) {
  const style = {
    ...(x !== undefined && x !== null ? { left: `${Math.round(x)}px` } : {}),
    top: `${Math.round(y)}px`,
  };

  return <div className={`${styles.marker} marker`} style={style} />;
}

Marker.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number.isRequired,
  }).isRequired,
};
