import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  base: '/dishes1/',
  mode: 'production',
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-scripts',
      '@fortawesome/fontawesome-free/css/all.css'
    ]
  }
});
