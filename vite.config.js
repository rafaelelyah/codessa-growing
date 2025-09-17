import { defineConfig } from 'vite';
import path from 'path';
import purgeCss from 'vite-plugin-purgecss';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    sourcemap: true,
    minify: 'terser'
  },
  plugins: [
    purgeCss({
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,vue,html}',
      ],
    }),
  ],
});
