import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Ensures Vite listens on all network interfaces (important for Docker)
    port: 5173,       // Default Vite dev port
    strictPort: true, // Avoids auto-switching ports
    hmr: {
      protocol: "ws",
      host: "localhost", // Change to your Docker host machine if needed
    },
    watch: {
      usePolling: true, // Fixes issues with file changes not being detected inside Docker
    },
  },
});