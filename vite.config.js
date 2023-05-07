import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
module.exports = {
  // ...
  build: {
    rollupOptions: {
      input: {
        main: './public/index.html'
      }
    }
  }
}
