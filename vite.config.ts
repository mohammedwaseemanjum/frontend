import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: {
    open: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tsconfigPaths(),
    tailwindcss(),
    mkcert()
  ],
})
