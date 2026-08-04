import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'vendor-framer';
            }
            if (id.includes('gsap') || id.includes('split-type')) {
              return 'vendor-gsap';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            return 'vendor-deps';
          }
        }
      }
    }
  },
});