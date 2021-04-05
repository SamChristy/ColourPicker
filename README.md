# 🎨 ColourPicker
![npm](https://img.shields.io/npm/v/react-colour-picker?color=%23cc3534)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-colour-picker)
![NPM](https://img.shields.io/npm/l/react-colour-picker)

🧪 Comprehensive test suite

🐭 Lightweight

🏗 Extensible

🖼 Easily-stylable

## Live Demo
[Click here to view](http://samchristy.github.io/ColourPicker/)

## Installation
`npm i react-colour-picker`

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
.hueScale {/* The hue scale, on the right */}
.marker {/* The marker rings */}
.colourSwatch {/* The colour block and input, at the bottom */}
```

### Development
A [CRA](https://create-react-app.dev/docs/getting-started/) project is used, in `/demo`, not only
for the above demo page, but also for the actual development of the component; so we can benefit
from all of the niceties that CRA bundles, without lumbering them on the users of the npm
package! 😉

#### To run the local demo:
```bash
cd demo && npm start
# In a separate tab:
npm test
```
#### Tests:
```bash
# Run all tests, once:
npm test -- --watchAll=false
# Code coverage report:
npm run coverage
```

### Distribution
A separate bundler, Rollup, is used to produce a 
[lighter distribution](https://blog.logrocket.com/does-my-bundle-look-big-in-this/). It's 
run from the project's root:
```bash
npm run build
```