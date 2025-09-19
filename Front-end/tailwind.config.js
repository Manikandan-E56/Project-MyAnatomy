// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, hsl(215 85% 35%), hsl(25 85% 60%))",
      },
    },
  },
  plugins: [],
}
