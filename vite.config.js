import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import html from 'vite-plugin-html';

export default defineConfig({
  plugins: [reactRefresh(), html()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
