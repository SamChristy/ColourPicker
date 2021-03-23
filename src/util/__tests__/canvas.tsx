import React from 'react';
import { screen, render } from '@testing-library/react';
import { getClickCoords, getDimensions } from '../canvas';

describe('getClickCoords()', () => {
  it('returns the coordinates of the click on a DOM element', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      ...global.emptyDOMRect,
      left: 10,
      top: 15,
      width: 100,
      height: 100,
    }));
    render(<div data-testid={1} />);
    const div = screen.getByTestId(1);
    const click = new MouseEvent('click', { clientX: 30, clientY: 85 });

    expect(getClickCoords(div, click)).toEqual({ x: 20, y: 70 });
  });
});

describe('getDimensions()', () => {
  const testGetDimensions = () => {
    const rect = {
      ...global.emptyDOMRect,
      width: 50,
      height: 70,
    };
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => rect);
    render(<canvas data-testid={1} />);
    const canvas = screen.getByTestId(1);
    // @ts-ignore (Because getByTestId always returns a HTMLElement.)
    const output = getDimensions(canvas);

    return { rect, canvas, output };
  };
  it("returns the canvas's dimensions", () => {
    const { rect, output } = testGetDimensions();

    expect(output).toEqual(rect);
  });
  it("sets the canvas's width & height attributes", () => {
    const { rect, canvas } = testGetDimensions();

    expect(canvas).toHaveAttribute('width', String(rect.width));
    expect(canvas).toHaveAttribute('height', String(rect.height));
  });
});
