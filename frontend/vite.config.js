import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('leaflet')) return 'leaflet-vendor'
    if (id.includes('react-toastify')) return 'toastify-vendor'
    return 'vendor'
  }
}

      }
    }
  }
}
