import '@testing-library/jest-dom';
import 'jest-extended';

expect.extend({
  similarColourTo: (
    received: Uint8ClampedArray,
    expected: Uint8ClampedArray,
    matchPercentage = 99
  ) => {
    const distance = Math.sqrt(
      received.reduce((sum, value, i) => sum + (value - expected[i]) ** 2, 0)
    );

    return distance / 255 <= 100 - matchPercentage
      ? {
          message: () =>
            `expected rgba(${received}) to be >= ${matchPercentage}% match to rgba(${expected})`,
          pass: true,
        }
      : {
          message: () =>
            `expected rgba(${received}) to be < ${matchPercentage}% match to rgba(${expected})`,
          pass: false,
        };
  },
});
