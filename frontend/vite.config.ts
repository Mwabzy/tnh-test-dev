import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { intlayerPlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
   intlayerPlugin(), 
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  //  server: {
  //   watch: {
  //     ignored: [
  //       "**/.intlayer/**", 
  //     ],
  // },
  // hmr: {
  //     overlay: false,
  //   },
  
  // },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("react") || id.includes("react-dom")) return "react-vendor";
            if (
              id.includes("react-intlayer") ||
              id.includes("vite-intlayer") ||
              id.includes("intlayer")
            ) return "intlayer";

            return "vendor";
          }

          if (id.includes("/src/assets/")) return "assets";
        },
      },
    },
  },
});