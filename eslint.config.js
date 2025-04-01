import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint"; // ESLint plugin for Vite

export default defineConfig({
  plugins: [
    react(),
    eslint({ cache: false }), // Runs ESLint on save
  ],
  define: {
    "process.env": {}, // Ensures no errors for process.env
  },
  esbuild: {
    loader: "jsx", // Ensure JSX support in .js files
    include: [/src\/.*\.js$/], // Apply this only to JS files inside src/
  },
  server: {
    open: true, // Opens browser on server start
  },
});
