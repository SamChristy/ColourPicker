import React from 'react';
import { render } from '@testing-library/react';
import Marker from '../Marker';

it('renders without crashing', () => {
  render(<Marker position={{ x: 0, y: 0 }} />);
});
