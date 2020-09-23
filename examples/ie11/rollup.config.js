import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

const extensions = [
  '.js', '.jsx', '.ts', '.tsx'
]

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'RollupTypeScriptBabel'
  },
  plugins: [
    resolve({
      extensions,
      browser: true
    }),
    commonjs({
      sourceMap: false
    }),
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: [/\/core-js\//]
    })
  ]
}
