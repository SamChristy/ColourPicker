import React, { useState } from 'react';

import Palette from './Pallette';
import HueScale from './HueScale';
import ColourSwatch from './ColourSwatch'
import './ColourPicker.css';

export default function ColourPicker({ onColourUpdate = () => {}, ...props }) {
    const [colour, setColour] = useState('');
    const [hue, setHue] = useState(0);

    const onColourUpdateCallback = colour => {
        onColourUpdate(colour);
        setColour(colour);
    }
    const onHueUpdateCallback = hue => setHue(hue);

    return (
        <div {...props}>
            <Palette onColourUpdate={onColourUpdateCallback} hue={hue} />
            <HueScale onHueUpdate={onHueUpdateCallback} />
            <ColourSwatch colour={colour} />
        </div>
    );
}