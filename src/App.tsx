import React from 'react';
import { ColourPicker } from './components';
import './App.scss';

export default function App() {
  return (
    <>
      <h1>ColourPicker Demo</h1>
      {/* eslint-disable-next-line no-console */}
      <ColourPicker onColourUpdate={(colour) => console.log(`🎨: ${colour}`)} />
      <p>
        🎨Created by Sam Christy -{' '}
        <a href="https://github.com/SamChristy/ColourPicker">see code on GitHub</a>
      </p>
    </>
  );
}
