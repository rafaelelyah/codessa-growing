import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Removido additionalData para evitar conflitos
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~terrain': resolve(__dirname, '../../../terrain')
    }
  }
});