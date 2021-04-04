import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Marker from '../Marker';

it('renders without crashing', () => {
  render(<Marker position={{ x: 0, y: 0 }} onClick={() => {}} />);
});

it('proxies click events', () => {
  const mockCallback = jest.fn(() => {});
  const { container } = render(<Marker position={{ x: 0, y: 0 }} onClick={mockCallback} />);
  const marker = container.children[0];
  const click = { clientX: 2, clientY: 5 };

  userEvent.click(marker, click);

  expect(mockCallback).toHaveBeenCalledWith(expect.objectContaining(click));
});
