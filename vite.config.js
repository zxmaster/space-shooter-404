import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Allow external access (needed for Docker)
    strictPort: true, // Exit if port is already in use
    open: false, // Don't auto-open browser (handled by VSCode)
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    strictPort: true,
  },
});
