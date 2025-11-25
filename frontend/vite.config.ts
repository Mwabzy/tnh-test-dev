
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { intlayerPlugin } from "vite-intlayer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), intlayerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Improve chunking for large bundles: split vendor libs and heavy deps into separate chunks
  build: {
    // raise warning limit slightly but also provide manual chunking guidance
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            // Separate very large or frequently changing libs into their own chunks
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('react-intlayer') || id.includes('vite-intlayer') || id.includes('intlayer')) return 'intlayer';
            // Default vendor chunk for smaller deps
            return 'vendor';
          }

          // keep very large asset-heavy modules separate (if imported via JS)
          if (id.includes('/src/assets/')) return 'assets';
        }
      }
    }
  }
})
