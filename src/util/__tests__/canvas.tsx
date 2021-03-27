import { screen, render } from '@testing-library/react';
import { createCanvas } from 'canvas';
import { getClickCoords, getDimensions, getPixel, rgbaToHex } from '../canvas';

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

describe('getPixel()', () => {
  const draw20By20GreenCanvas = () => {
    const canvas = createCanvas(20, 20);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#00FF00';
    ctx.fillRect(0, 0, 20, 20);

    return canvas;
  };

  it('returns the colour of the specified pixel', () => {
    // @ts-ignore - because we're using the node canvas library
    const pixel = getPixel(draw20By20GreenCanvas(), { x: 10, y: 10 });
    const green = new Uint8ClampedArray([0, 255, 0, 255]);

    expect(pixel).toMatchColour(green);
  });
  it('returns [0, 0, 0, 0] when pixel is out of bounds ', () => {
    // @ts-ignore
    const pixel = getPixel(draw20By20GreenCanvas(), { x: 21, y: 21 });

    expect(pixel).toMatchColour(new Uint8ClampedArray([0, 0, 0, 0]));
  });
  it('returns null without canvas', () => {
    // @ts-ignore
    expect(getPixel(null, { x: 1000, y: 1000 })).toBeNull();
  });
});

const rgbaToHexData = [
  { rgbaArray: new Uint8ClampedArray([0, 0, 0]), expected: '#000000' },
  { rgbaArray: new Uint8ClampedArray([153, 0, 153]), expected: '#990099' },
  { rgbaArray: new Uint8ClampedArray([255, 153, 51]), expected: '#ff9933' },
  { rgbaArray: new Uint8ClampedArray([170, 255, 128]), expected: '#aaff80' },
  { rgbaArray: new Uint8ClampedArray([255, 255, 255]), expected: '#ffffff' },
];

describe.each(rgbaToHexData)('rgbaToHex()', ({ rgbaArray, expected }) =>
  test(`colour: ${expected}`, () => expect(rgbaToHex(rgbaArray)).toBe(expected))
);

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
    // @ts-ignore - because getByTestId() always returns a HTMLElement
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
