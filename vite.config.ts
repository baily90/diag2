import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://sit-diagnosis-doctor.weicha88.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, '/api'),
      },
    },
  },
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
      ],
    },
  },
});
