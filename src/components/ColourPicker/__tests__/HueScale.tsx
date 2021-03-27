import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HueScale from '../HueScale';
import * as util from '../../../util/canvas';

it('renders without crashing', () => {
  render(<HueScale onHueUpdate={() => {}} />);
});

const hueData = [
  { hue: 60, expected: new Uint8ClampedArray([255, 255, 0, 255]) },
  { hue: 180, expected: new Uint8ClampedArray([0, 255, 250, 255]) },
  { hue: 240, expected: new Uint8ClampedArray([0, 0, 255, 255]) },
  { hue: 300, expected: new Uint8ClampedArray([255, 0, 255, 255]) },
];

describe.each(hueData)('renders correct colours on scale', ({ hue, expected }) => {
  const [width, height] = [10, 150];
  const getExpectedYCoord = (hueValue: number) => Math.round(((360 - hueValue) / 360) * height);
  jest
    .spyOn(util, 'getDimensions')
    .mockImplementation(() => ({ ...global.emptyDOMRect, width, height }));
  const { container } = render(<HueScale onHueUpdate={() => {}} />);
  const hueScaleCanvas = container.getElementsByTagName('canvas')[0];

  test(`hue: ${hue}`, () => {
    const y = getExpectedYCoord(hue);
    const colourAtPosition = util.getPixel(hueScaleCanvas, { x: width / 2, y });

    expect(colourAtPosition).toMatchColour(expected);
  });
});

it('updates marker position, when clicked', () => {
  const { container } = render(<HueScale onHueUpdate={() => {}} />);
  const hueScaleCanvas = container.getElementsByTagName('canvas')[0];
  const marker = container.getElementsByClassName('marker')[0];
  const clickPosition = { x: 5, y: 30 };

  jest.spyOn(util, 'getClickCoords').mockImplementation(() => clickPosition);
  hueScaleCanvas.setAttribute('height', '150px');
  userEvent.click(hueScaleCanvas);

  expect(marker).toHaveStyle({ top: `${clickPosition.y}px` });
});

const testCallback = () => {
  const mockCallback = jest.fn(() => {});
  const { container } = render(<HueScale onHueUpdate={mockCallback} />);
  const hueScaleCanvas = container.getElementsByTagName('canvas')[0];

  jest.spyOn(util, 'getClickCoords').mockImplementation(() => ({ x: 20, y: 90 }));
  hueScaleCanvas.setAttribute('height', '360px');
  userEvent.click(hueScaleCanvas);

  return mockCallback;
};

it('calls onHueUpdate callback, when clicked', () => {
  expect(testCallback()).toBeCalledTimes(1);
});

it('returns correct hue value', () => {
  expect(testCallback()).toBeCalledWith(270);
});
