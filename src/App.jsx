import React from 'react';
import { ColourPicker } from "./components";
import './App.css';

export default function App() {
  return (
      <>
        <h1>Basic Colour Picker Demo</h1>
        <ColourPicker className={'colourPicker'} />
      </>
  );
};