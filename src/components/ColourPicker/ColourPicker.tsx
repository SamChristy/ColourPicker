import { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Palette from './Palette';
import HueScale from './HueScale';
import ColourSwatch from './ColourSwatch';
import { rgbaToHex } from '../../util/canvas';
import styles from './ColourPicker.module.scss';

/**
 * Renders a CSS colour picker [see example]{@link https://samchristy.github.io/ColourPicker/}
 *
 * @param onColourUpdate Callback that returns the colour as a CSS hex string.
 * @param className Optional class that can be applied to the component's wrapper <div>.
 * @param props Properties for the component's <div> wrapper.
 */
export default function ColourPicker({
  onColourUpdate,
  className,
  ...props
}: InferProps<typeof ColourPicker.propTypes>) {
  const [colour, setColour] = useState('');
  const [hue, setHue] = useState(0);

  const onColourUpdateCallback = (updatedColour: Uint8ClampedArray) => {
    const hexString = rgbaToHex(updatedColour);

    onColourUpdate(hexString);
    setColour(hexString);
  };

  return (
    <div {...props} className={`${styles.colourPicker} colourPicker ${className}`}>
      <Palette onColourUpdate={onColourUpdateCallback} hue={hue} />
      <HueScale onHueUpdate={(updatedHue) => setHue(updatedHue)} />
      <ColourSwatch colour={colour} />
    </div>
  );
}

ColourPicker.propTypes = {
  onColourUpdate: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ColourPicker.defaultProps = {
  className: '',
};
