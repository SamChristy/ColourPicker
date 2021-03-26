import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HueScale from '../HueScale';
import * as util from '../../../util/canvas';

it('renders without crashing', () => {
  render(<HueScale onHueUpdate={() => {}} />);
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

it('gets correct hue value', () => {
  const mockCallback = jest.fn(() => {});
  const { container } = render(<HueScale onHueUpdate={mockCallback} />);
  const hueScaleCanvas = container.getElementsByTagName('canvas')[0];

  jest.spyOn(util, 'getClickCoords').mockImplementation(() => ({ x: 20, y: 90 }));
  hueScaleCanvas.setAttribute('height', '360px');
  userEvent.click(hueScaleCanvas);

  expect(mockCallback).toBeCalledWith(270);
});
