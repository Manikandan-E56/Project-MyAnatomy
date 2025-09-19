import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, hsl(215 85% 35%), hsl(25 85% 60%))",
      },
    },
  },
  plugins: [react(),tailwindcss(),],

})
