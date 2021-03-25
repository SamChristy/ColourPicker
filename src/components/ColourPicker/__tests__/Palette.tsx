import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as util from '../../../util/canvas';
import Palette from '../Palette';

it('renders without crashing', () => {
  render(<Palette hue={0} onColourUpdate={() => {}} />);
});

it('renders correct colour for hue', () => {
  jest
    .spyOn(util, 'getDimensions')
    .mockImplementation(() => ({ ...global.emptyDOMRect, width: 100, height: 100 }));
  const blueHue = 240;
  const blue = new Uint8ClampedArray([0, 0, 255, 255]);
  const { container } = render(<Palette hue={blueHue} onColourUpdate={() => {}} />);
  const paletteCanvas = container.getElementsByTagName('canvas')[0];

  expect(util.getPixel(paletteCanvas, { x: 99, y: 0 })).toMatchColour(blue);
});

it('updates colour when hue prop is changed', () => {
  const black = new Uint8ClampedArray([0, 0, 0, 0]);
  jest.spyOn(util, 'getPixel').mockImplementation(() => black);
  jest
    .spyOn(util, 'getDimensions')
    .mockImplementation(() => ({ ...global.emptyDOMRect, width: 1, height: 1 }));

  const { rerender } = render(<Palette hue={0} onColourUpdate={() => {}} />);
  const mockCallback = jest.fn((colour) => {});

  rerender(<Palette hue={1} onColourUpdate={mockCallback} />);
  expect(mockCallback).toBeCalledWith(black);
  // Rerenders with the same value shouldn't trigger it again.
  rerender(<Palette hue={1} onColourUpdate={mockCallback} />);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('updates marker position when clicked', () => {
  const { container } = render(<Palette hue={0} onColourUpdate={() => {}} />);
  const paletteCanvas = container.getElementsByTagName('canvas')[0];

  jest.spyOn(util, 'getPixel').mockImplementation(() => new Uint8ClampedArray());
  userEvent.click(paletteCanvas, { clientX: 5, clientY: 10 });
  const marker = container.getElementsByClassName('marker')[0];

  expect(marker).toHaveStyle({ left: '5px', top: '10px' });
});

it('updates colour when clicked', () => {
  const black = new Uint8ClampedArray([0, 0, 0, 0]);
  jest.spyOn(util, 'getPixel').mockImplementation(() => black);
  jest
    .spyOn(util, 'getDimensions')
    .mockImplementation(() => ({ ...global.emptyDOMRect, width: 1, height: 1 }));

  const mockCallback = jest.fn(() => {});
  const { container } = render(<Palette hue={0} onColourUpdate={mockCallback} />);
  const paletteCanvas = container.getElementsByTagName('canvas')[0];

  userEvent.click(paletteCanvas);
  expect(mockCallback).toBeCalledWith(black);
});

it('selects correct colour', () => {
  jest
    .spyOn(util, 'getDimensions')
    .mockImplementation(() => ({ ...global.emptyDOMRect, width: 100, height: 100 }));
  jest.spyOn(util, 'getClickCoords').mockImplementation(() => ({ x: 80, y: 60 }));

  const mockCallback = jest.fn((colour) => {});
  const { container } = render(<Palette hue={0} onColourUpdate={mockCallback} />);
  const paletteCanvas = container.getElementsByTagName('canvas')[0];
  const darkRed = new Uint8ClampedArray([100, 20, 20, 255]);

  userEvent.click(paletteCanvas);
  expect(mockCallback).toBeCalledWith(expect.colourMatching(darkRed));
});
