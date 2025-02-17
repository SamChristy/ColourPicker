import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json'

export default {
  input: 'build/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    typescript({ objectHashIgnoreUnknownHack: true })
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime', 'prop-types']
}