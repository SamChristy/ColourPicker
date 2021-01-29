import React from 'react';
import { ColourPicker } from "./components";
import './App.css';

export default function App() {
  return (
      <>
        <h1>ColourPicker Demo</h1>
        <ColourPicker className={'colourPicker'} />
        <p>🎨Created by Sam Christy - <a href="https://github.com/SamChristy/ColourPicker">see code on GitHub</a></p>
      </>
  );
};