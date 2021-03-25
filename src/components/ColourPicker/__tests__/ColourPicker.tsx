import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColourPicker from '../ColourPicker';
import * as util from '../../../util/canvas';

it('renders without crashing', () => {
  render(<ColourPicker onColourUpdate={() => {}} />);
});

it('appends className prop', () => {
  const { container, rerender } = render(<ColourPicker onColourUpdate={() => {}} />);
  const originalClassName = container.children[0].className;
  const passedClassName = 'test1234';

  rerender(<ColourPicker className={passedClassName} onColourUpdate={() => {}} />);

  expect(container.getElementsByClassName(passedClassName)[0].className).toBe(
    `${originalClassName}${passedClassName}`
  );
});

it('applies other props', () => {
  render(<ColourPicker data-testid={1} onColourUpdate={() => {}} />);
  screen.getByTestId(1);
});

it('updates colour swatch', () => {
  const blue = new Uint8ClampedArray([0, 0, 255, 255]);
  const { container } = render(<ColourPicker onColourUpdate={() => {}} />);
  const paletteCanvas = container
    .getElementsByClassName('palette')[0]
    .getElementsByTagName('canvas')[0];
  const colourSwatch = container.getElementsByClassName('colourSwatch')[0];
  const originalColourSwatch = colourSwatch.innerHTML;

  jest.spyOn(util, 'getPixel').mockImplementation(() => blue);
  userEvent.click(paletteCanvas);

  expect(colourSwatch.innerHTML).not.toBe(originalColourSwatch);
});

it('calls onColourUpdate callback with selected colour', () => {
  const blueRGBA = new Uint8ClampedArray([0, 0, 255, 255]);
  const blueHexString = '#0000ff';
  const mockCallback = jest.fn((colour) => {});
  const { container } = render(<ColourPicker onColourUpdate={mockCallback} />);
  const paletteCanvas = container
    .getElementsByClassName('palette')[0]
    .getElementsByTagName('canvas')[0];

  jest.spyOn(util, 'getPixel').mockImplementation(() => blueRGBA);
  userEvent.click(paletteCanvas);

  expect(mockCallback).toBeCalledWith(blueHexString);
});
