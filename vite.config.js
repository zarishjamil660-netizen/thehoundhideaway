import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.glb'],
  build: {
    // Do not ship original file maps publicly (harder to recover readable source).
    sourcemap: false,
    cssMinify: true,
    // Slightly smaller production bundles; no UI/behavior change.
    target: 'es2020',
    rollupOptions: {
      output: {
        // Hashed filenames already used by Vite; keep chunk naming opaque.
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
      },
    },
  },
})
