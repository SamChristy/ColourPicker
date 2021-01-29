import React from 'react';
import PropTypes from "prop-types";

export default function ColourSwatch({ colour }) {
    return (
        <div className={'colourSwatch'}>
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