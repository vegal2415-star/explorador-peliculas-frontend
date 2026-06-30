import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Esto le dice a Vite que procese el nuevo Tailwind v4
  ],
  base: '/explorador-peliculas-frontend/', // Añade el nombre exacto de tu repositorio entre barras
})