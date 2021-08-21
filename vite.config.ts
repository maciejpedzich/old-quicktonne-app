import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src'
      }
    ]
  },
  plugins: [vue(), nodeResolve()]
});
