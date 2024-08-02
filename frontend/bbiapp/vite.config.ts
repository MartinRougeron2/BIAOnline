import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  // cors
  server: {
    proxy: {
      // "/api": "http://localhost:3000/api/v1"
      "/api": {
        target: "https://urchin-app-vv7cz.ondigitalocean.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
      },
    },
  },
});
