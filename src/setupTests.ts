import '@testing-library/jest-dom';
import 'jest-extended';
import failOnConsole from 'jest-fail-on-console';

failOnConsole();

declare global {
  namespace NodeJS {
    interface Global {
      /** Helpful base object, to avoid defining loads of unused props or resorting to @ts-ignore */
      emptyDOMRect: DOMRect;
    }
  }
}
export default global;

global.emptyDOMRect = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  toJSON: () => '',
};

const compareColours = (
  received: Uint8ClampedArray,
  expected: Uint8ClampedArray,
  matchPercentage = 99
) => {
  const distance = Math.sqrt(
    received.reduce((sum, value, i) => sum + (value - expected[i]) ** 2, 0)
  );
  const maxDistance = 510;
  const actualMatchPercentage = (1 - distance / maxDistance) * 100;

  return actualMatchPercentage >= matchPercentage
    ? {
        message: () =>
          `expected rgba(${received}) to be < ${matchPercentage}% match to rgba(${expected}) ` +
          `(was ${actualMatchPercentage}%)`,
        pass: true,
      }
    : {
        message: () =>
          `expected rgba(${received}) to be >= ${matchPercentage}% match to rgba(${expected}) ` +
          `(was ${actualMatchPercentage}%)`,
        pass: false,
      };
};

expect.extend({
  colourMatching: compareColours,
  toMatchColour: compareColours,
});
