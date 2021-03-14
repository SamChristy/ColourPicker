import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as util from '../../../util/canvas';
import Palette from '../Palette';

// TODO: Update jest settings to do this by default!
afterEach(() => jest.restoreAllMocks());

it('renders without crashing', () => {
  render(<Palette hue={0} onColourUpdate={() => {}} />);
});

it('renders correct colour for hue', () => {
  jest.spyOn(util, 'getDimensions').mockImplementation(() => ({ width: 100, height: 100 }));

  const redHue = 0;
  const blueHue = 240;
  const red = new Uint8ClampedArray([0, 0, 255, 255]);
  const blue = new Uint8ClampedArray([255, 0, 0, 255]);

  const { container, rerender } = render(<Palette hue={240} onColourUpdate={() => {}} />);
  const paletteCanvas = container.getElementsByTagName('canvas')[0];

  expect(util.getPixel(paletteCanvas, { x: 99, y: 0 })).toEqual(
    expect.objectContaining([1, 1, 254, 255])
  );

  rerender(<Palette hue={0} onColourUpdate={() => {}} />);
  expect(util.getPixel(paletteCanvas, { x: 99, y: 0 })).toEqual(
    expect.objectContaining([254, 1, 1, 255])
  );
});

it('moves its marker when clicked', () => {});
it('updates colour when hue prop is changed', () => {});

it('updates colour when clicked', () => {
  const black = new Uint8ClampedArray([0, 0, 0, 0]);
  jest.spyOn(util, 'getPixel').mockImplementation(() => black);
  jest.spyOn(util, 'getDimensions').mockImplementation(() => ({ width: 1, height: 1 }));

  const mockCallback = jest.fn((colour: Uint8ClampedArray) => {});
  const { container } = render(<Palette hue={0} onColourUpdate={mockCallback} />);
  const paletteCanvas = container.getElementsByTagName('canvas')[0];

  fireEvent.click(paletteCanvas);
  expect(mockCallback).toBeCalledWith(black);
});

it('identifies correct colour', () => {
  jest.spyOn(util, 'getDimensions').mockImplementation(() => ({ width: 100, height: 100 }));
  jest.spyOn(util, 'getClickCoords').mockImplementation(() => ({ x: 80, y: 60 }));

  const mockCallback = jest.fn((colour: Uint8ClampedArray) => {});
  const { container } = render(<Palette hue={0} onColourUpdate={mockCallback} />);
  const paletteCanvas = container.getElementsByTagName('canvas')[0];
  const darkRed = new Uint8ClampedArray([100, 20, 20, 255]);

  fireEvent.click(paletteCanvas);
  // TODO: Match it to pixel at same location!
  expect(mockCallback).toBeCalledWith(expect.similarColourTo(darkRed));
});
