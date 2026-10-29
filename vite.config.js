import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // En GitHub Pages la app vive en https://acner999.github.io/proyectofinalreact/
  base: process.env.GITHUB_PAGES ? '/proyectofinalreact/' : '/',
  plugins: [react(), tailwindcss()],
})
