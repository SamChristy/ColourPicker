import React, { useState } from 'react';
import PropTypes from "prop-types";
import Palette from './Palette';
import HueScale from './HueScale';
import ColourSwatch from './ColourSwatch'
import { rgbaToHex } from "../../util/canvas";
import './ColourPicker.scss';

/**
 * Renders a CSS colour picker [see example]{@link https://samchristy.github.io/ColourPicker/}
 *
 * @param {?function} onColourUpdate Optional callback that returns the colour as a CSS hex string.
 * @param {...*} props Properties for the component's <div> wrapper.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ColourPicker({ onColourUpdate = () => {}, ...props }) {
    const [colour, setColour] = useState('');
    const [hue, setHue] = useState(0);

    const onColourUpdateCallback = colour => {
        const hexString = rgbaToHex(colour);

        onColourUpdate(hexString);
        setColour(hexString);
    }

    return (
        <div {...props}>
            <Palette onColourUpdate={onColourUpdateCallback} hue={hue} />
            <HueScale onHueUpdate={hue => setHue(hue)} />
            <ColourSwatch colour={colour} />
        </div>
    );
}

ColourPicker.propTypes = {
    onColourUpdate: PropTypes.func,
};