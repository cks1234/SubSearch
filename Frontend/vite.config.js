import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/search': 'http://cks123.pythonanywhere.com',
      '/subtitles': 'http://cks123.pythonanywhere.com',
    }
  }
})
