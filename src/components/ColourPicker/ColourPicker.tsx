import React, { useState } from 'react';
import PropTypes, {InferProps} from "prop-types";
import Palette from './Palette';
import HueScale from './HueScale';
import ColourSwatch from './ColourSwatch'
import { rgbaToHex } from "../../util/canvas";
import styles from './ColourPicker.module.scss';

/**
 * Renders a CSS colour picker [see example]{@link https://samchristy.github.io/ColourPicker/}
 *
 * @param {function} onColourUpdate Callback that returns the colour as a CSS hex string.
 * @param {...*} props Properties for the component's <div> wrapper.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ColourPicker({ onColourUpdate, ...props }: InferProps<typeof ColourPicker.propTypes>) {
    const [colour, setColour] = useState('');
    const [hue, setHue] = useState(0);

    const onColourUpdateCallback = (colour: Uint8ClampedArray) => {
        const hexString = rgbaToHex(colour);

        onColourUpdate(hexString);
        setColour(hexString);
    }

    return (
        <div {...props} className={`${styles.colourPicker} colourPicker ${props.className}`} >
            <Palette onColourUpdate={onColourUpdateCallback} hue={hue} />
            <HueScale onHueUpdate={hue => setHue(hue)} />
            <ColourSwatch colour={colour} />
        </div>
    );
}

ColourPicker.propTypes = {
    onColourUpdate: PropTypes.func.isRequired,
    className: PropTypes.string
};