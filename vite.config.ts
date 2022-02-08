import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build',
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer')({
          // overrideBrowserslist: [
          //   'Android 4.1',
          //   'iOS 7.1',
          //   'Chrome > 31',
          //   'ff > 31',
          //   'ie >= 8'
          // ]
        }),
        require('postcss-px-to-viewport')({
          unitToConvert: 'px',
          viewportWidth: 1280,
          unitPrecision: 3,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-'],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [/node_modules/],
        }),
      ],
    },
  },
});
