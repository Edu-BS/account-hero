import { fileURLToPath, URL } from 'url'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:  process.env.VITE_APP_PORT,
    host:  process.env.VITE_APP_HOST,
  },

  // base: 'http://10.200.242.202:3000/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
