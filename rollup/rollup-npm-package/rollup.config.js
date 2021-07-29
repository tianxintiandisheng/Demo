// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
export default {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    },
    plugins: [ resolve() ]
  };