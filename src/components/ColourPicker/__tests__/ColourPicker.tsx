import React from 'react';
import { render } from '@testing-library/react';
import ColourPicker from '../ColourPicker';

it('renders without crashing', () => {
  render(<ColourPicker onColourUpdate={() => {}} />);
});

xit('appends className prop', () => {});

xit('applies other props', () => {});

xit('updates colour swatch', () => {});

xit('calls onColourUpdate callback with selected colour', () => {});
