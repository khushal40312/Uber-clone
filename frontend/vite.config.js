import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   plugins: [react(),tailwindcss()],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group all react-related stuff together
            if (id.match(/react|react-dom|react-router|scheduler/)) {
              return 'react-vendor'
            }
            // Separate heavy libraries like leaflet
            if (id.includes('leaflet')) return 'leaflet-vendor'
            if (id.includes('react-toastify')) return 'toastify-vendor'
            return 'vendor'
          }
        }
      }
    }
  }
})
