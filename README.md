# 🎨 ColourPicker

🧪 Comprehensive test suite

🐭 Lightweight

🏗 Extensible

🖼 Easily-stylable

## Live Demo
[Click here to view](http://samchristy.github.io/ColourPicker/)

## Installation
`npm install react-colour-picker`

### Usage
```typescript jsx
import { ColourPicker } from 'react-colour-picker';
import './App.css';

export default function App() {
    return (
        <ColourPicker onColourUpdate={(colour) => doSomething(colour)} />
    );
}
````
Most apps will probably be perfectly fine with `<input type="color" />` and there isn't a great 
deal this package can do on its own - you will most likely want to use it as a building block 
for a more complicated UI.

#### Styling
Fully stylable, using regular CSS, the following classes are made available:
```css
.colourPicker {/* Styles the main container*/}
.palette {/* The palette, in the middle */}
.hueScale { /* The hue scale, on the right */ }
.marker {/* The marker rings */}
.colourSwatch {/* The colour block and input, at the bottom */}
```

### Development
A [CRA](https://create-react-app.dev/docs/getting-started/) app is used, in `/demo`, not only
for the above demo page, but also for the actual development of the component; so we can benefit
from all of the niceties that CRA bundles, without lumbering then on the users of the npm
package! 😉

#### To run the local demo:
```bash
cd demo && npm start
```
#### Tests:
```bash
npm test
```

## License
The MIT License (MIT)

Copyright (c) 2021, Sam Christy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.