import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default {
  input: 'src/ev-charging-card.ts',
  output: {
    file: 'dist/ev-charging-card.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    json(),
    terser({
      compress: {
        drop_console: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
  external: [],
};
