import { render } from '@testing-library/react';
import HueScale from '../HueScale';

it('renders without crashing', () => {
  render(<HueScale onHueUpdate={() => {}} />);
});
