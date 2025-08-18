
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
      "@": path.resolve(__dirname, "client/src"),
    },
  },
})
