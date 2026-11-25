import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Default "/" for root domain hosting (e.g., Netlify).
  // Switch to "/portfolio/" if deploying to GitHub Pages project subpath.
  base: "/",
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          motion: ["framer-motion"],
          "three-core": ["three"],
          "three-fiber": ["@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});
