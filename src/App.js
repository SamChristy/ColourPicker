import React from 'react';

import ColourPicker from "./components/ColourPicker/ColourPicker";

function App() {
  return (
        <ColourPicker width={445} height={400} onColourUpdate={colour => (console.log({ colour }))} />
  );
}

export default App;
