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
    // Configuração para desenvolvimento (site demo)
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    // Configuração para biblioteca
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'CodessaGrowing',
      fileName: (format) => `codessa-growing.${format}.js`,
      formats: ['es', 'umd']
    },
    sourcemap: true,
    minify: 'terser'
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Configurações Sass específicas
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
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
