/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config();


export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Memisahkan library besar seperti React ke dalam chunk 'vendor'
        },
      },
    },
    chunkSizeWarningLimit: 6000, // Menurunkan batas peringatan ukuran chunk, misalnya 500KB
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
    cache: { dir: '../node_modules/.vitest' },
  },
});



// export default defineConfig({
//   root: 'src',
//   build: {
//     outDir: '../dist',
//     emptyOutDir: true,
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'globalThis',
//       },
//     },
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:4943',
//         changeOrigin: true,
//       },
//     },
//   },
//   plugins: [
//     react(),
//     environment('all', { prefix: 'CANISTER_' }),
//     environment('all', { prefix: 'DFX_' }),
//   ],
//   test: {
//     environment: 'jsdom',
//     setupFiles: 'setupTests.ts',
//     cache: { dir: '../node_modules/.vitest' },
//   },
// });
