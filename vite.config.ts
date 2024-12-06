import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  resolve: {
    alias: {
      process: 'process/browser',
      util: 'util'
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis'
  }
});