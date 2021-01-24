import React, { useState } from 'react';

import Palette from './Pallette';
import HueScale from "./HueScale";

export default function ColourPicker({width, height, callback, ...other}) {
    const [hue, setHue] = useState(311);
    const dimensions = {
        palette: { width: Math.round(width * .9), height},
        hueScale: { width: Math.round(width * .1), height}
    };

    const onColourUpdateCallback = colour => callback(colour);
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
        </div>
    );
}