import React from 'react';
import PropTypes from "prop-types";

export default function Marker({ position: { x, y } }) {
    console.log({ x, y });
    const style = {
        ...(x !== 'undefined' ? { left: `${Math.round(x)}px` } : {}), top: `${Math.round(y)}px`
    };

    return (
        <div className={'marker'} style={style} />
    );
}

Marker.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number.isRequired
    }),
};