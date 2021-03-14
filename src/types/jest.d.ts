declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Checks if the colour `received` matches `expected`, within the percentage threshold defined
       * by `matchPercentage' (default 99). Intended to avoid inadvertently creating snapshot tests.
       *
       * @param received
       * @param expected
       * @param matchPercentage
       */
      similarColourTo(
        received: Uint8ClampedArray,
        expected: Uint8ClampedArray,
        matchPercentage: number = 99
      ): R;
    }
    interface Expect {
      /**
       * Checks if the target matches `expected`, within the percentage threshold defined by
       * `matchPercentage' (default 99). Intended to avoid inadvertently creating snapshot tests.
       *
       * @param expected
       * @param matchPercentage
       */
      similarColourTo(expected: Uint8ClampedArray, matchPercentage: number = 99): any;
    }
  }
}

export {};
