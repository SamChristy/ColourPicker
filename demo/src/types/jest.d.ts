declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Checks if the received value matches `expected`, within the percentage threshold defined by
       * `matchPercentage' (default 99). Intended to avoid inadvertently creating snapshot tests.
       *
       * @param expected
       * @param matchPercentage
       */
      toMatchColour(expected: Uint8ClampedArray, matchPercentage: number = 99): R;
    }
    interface Expect {
      /**
       * Checks if the received value matches `expected`, within the percentage threshold defined by
       * `matchPercentage' (default 99). Intended to avoid inadvertently creating snapshot tests.
       *
       * @param expected
       * @param matchPercentage
       */
      colourMatching(
        expected: Uint8ClampedArray,
        matchPercentage: number = 99
      ): { message: () => string; pass: boolean };
    }
  }
}

export {};
