import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Enable HTTPS for local development. You'll likely need a locally-trusted
  // certificate (e.g., via mkcert) to avoid browser warnings.
  server: {
    https: true,
    host: true,
  },
})
