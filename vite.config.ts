import vue from '@vitejs/plugin-vue';

export default {
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src'
      }
    ]
  },
  plugins: [vue()]
};
