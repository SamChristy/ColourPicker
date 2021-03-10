import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styles from './ColourSwatch.module.scss';

export default function ColourSwatch({ colour }: InferProps<typeof ColourSwatch.propTypes>) {
  return (
    <div className={`${styles.colourSwatch} colourSwatch`}>
      <div style={{ background: colour }} />
      <input value={colour} readOnly disabled />
    </div>
  );
}

ColourSwatch.propTypes = {
  colour: PropTypes.string.isRequired,
};
