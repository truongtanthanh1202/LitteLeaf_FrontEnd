import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import PostCSS from 'postcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    PostCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
