import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Allows importing from 'src' using '@/'
    },
  },
  server: {
    port: 5173, // Change the port if needed
    open: true, // Opens the browser when the server starts
  },
});
