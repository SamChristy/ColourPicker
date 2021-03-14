import '@testing-library/jest-dom';
import 'jest-extended';

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
