import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as util from '../../../util/canvas';
import Palette from '../Palette';

it('renders without crashing', () => {
  render(<Palette hue={0} onColourUpdate={() => {}} />);
});

it('updates colour when clicked', () => {
  jest.spyOn(util, 'getDimensions').mockImplementation(() => ({ width: 150, height: 150 }));
  jest.spyOn(util, 'getClickCoords').mockImplementation(() => ({ x: 75, y: 75 }));

  const { container } = render(<Palette hue={0} onColourUpdate={() => {}} />);
  const paletteCanvas = container.getElementsByTagName('canvas')[0];
  fireEvent.click(paletteCanvas);
});
