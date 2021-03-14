import React from 'react';
import { render } from '@testing-library/react';
import ColourPicker from '../ColourPicker';

it('renders without crashing', () => {
  render(<ColourPicker onColourUpdate={() => {}} />);
});

// it('renders correctly', () => {});
//
// it('calls onColourUpdate callback, when a new colour is selected', () => {});
