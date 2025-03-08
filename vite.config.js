import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "X-Frame-Options": "DENY", 
      "Content-Security-Policy": "frame-ancestors 'none';", 
    },
  }
})
