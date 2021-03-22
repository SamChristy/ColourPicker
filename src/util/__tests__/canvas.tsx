import React from 'react';
import { screen, render } from '@testing-library/react';
import { getClickCoords } from '../canvas';

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
    // @ts-ignore
    expect(getClickCoords(div, { clientX: 30, clientY: 85 })).toEqual({ x: 20, y: 70 });
  });
});
