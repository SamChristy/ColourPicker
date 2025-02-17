import { render } from '@testing-library/react';
import ColourSwatch from '../ColourSwatch';

it('renders without crashing', () => {
  render(<ColourSwatch colour="" />);
});

const testRender = () => {
  const colourProp = '#f1a712';
  const { container } = render(<ColourSwatch colour={colourProp} />);
  const colourSwatch = container.children[0];

  return { colourProp, colourSwatch };
};

it('renders colour box with given colour', () => {
  const { colourProp, colourSwatch } = testRender();
  const box = colourSwatch.getElementsByTagName('div')[0];

  expect(box).toHaveStyle({ background: colourProp });
});

it('renders hex string with given colour', () => {
  const { colourProp, colourSwatch } = testRender();
  const hexString = colourSwatch.getElementsByTagName('input')[0];

  expect(hexString).toHaveValue(colourProp);
});
