import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/trilussa-tour/',
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'photo-sphere-viewer': [
            '@photo-sphere-viewer/core',
            '@photo-sphere-viewer/cubemap-tiles-adapter',
            '@photo-sphere-viewer/markers-plugin',
            '@photo-sphere-viewer/autorotate-plugin',
          ],
        },
      },
    },
  },
})
