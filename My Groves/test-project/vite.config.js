import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',  // 👈 Root é o diretório atual (test-project)
  build: {
    outDir: './dist',  // 👈 Saída é ./dist (dentro do projeto)
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')  // 👈 Entrada é o index.html local
      }
    }
  },
  server: {
    port: 3002,  // 👈 Porta diferente para não conflitar
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~terrain': resolve(__dirname, '../../Wood/terrain')  // 👈 Caminho atualizado para Wood/terrain
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Configuração SCSS para projetos
      }
    }
  }
});