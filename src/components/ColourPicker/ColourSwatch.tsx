import React from 'react';
import PropTypes from "prop-types";
import styles from "./ColourSwatch.module.scss"

export default function ColourSwatch({ colour }) {
    return (
        <div className={`${styles.colourSwatch} colourSwatch`}>
            <div style={{ background: colour }} />
            <input value={colour} readOnly disabled />
        </div>
    );
}

ColourSwatch.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number.isRequired
    }),
};