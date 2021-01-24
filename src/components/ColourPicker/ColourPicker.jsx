import React, { useState } from 'react';

import Palette from './Pallette';
import HueScale from './HueScale';
import ColourSwatch from './ColourSwatch'

export default function ColourPicker({width, height, onColourUpdate = () => {}, ...other}) {
    const [colour, setColour] = useState('#ff0000');
    const [hue, setHue] = useState(0);
    const dimensions = {
        palette: { width: Math.round(width * .9), height},
        hueScale: { width: Math.round(width * .1), height}
    };

    const onColourUpdateCallback = (colour) => {
        onColourUpdate(colour);
        setColour(colour);
    }
    const onHueUpdateCallback = hue => setHue(hue);

    return (
        <div {...other}>
            <Palette width={dimensions.palette.width}
                     height={dimensions.palette.height}
                     hue={hue}
                     onColourUpdate={onColourUpdateCallback} />
            <HueScale width={dimensions.hueScale.width}
                      height={dimensions.hueScale.height}
                      onHueUpdate={onHueUpdateCallback} />
            <ColourSwatch colour={colour} />
        </div>
    );
}