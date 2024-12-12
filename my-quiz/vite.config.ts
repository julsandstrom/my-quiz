import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || "/", // Use BASE_PATH from .env, fallback to root if not defined
  build: {
    outDir: "dist",
    assetsDir: "assets", // Specify where the assets go in the dist directory
  },
});
