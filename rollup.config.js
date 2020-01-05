import commonjs from 'rollup-plugin-commonjs';
import glslify from 'rollup-plugin-glslify';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: [
    {
      name: 'PolyKingdom',
      file: 'output/PolyKingdom.umd.js',
      format: 'umd',
      sourcemap: true
    }
  ],
  plugins: [
    glslify(),
    resolve(),
    commonjs()
  ]
};
