import ColourPicker from "./components/ColourPicker/ColourPicker";
import './App.css';

export default function App() {
  return (
      <>
        <h1>Basic Colour Picker Demo</h1>
        <ColourPicker className={'colourPicker'} />
      </>
  );
};