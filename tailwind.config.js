/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        body: ["'Satoshi'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        gold: "#C9A84C",
        "gold-light": "#E8C96A",
        "gold-dim": "#8B6914",
        obsidian: "#080808",
        "obsidian-2": "#0E0E0E",
        "obsidian-3": "#141414",
        cream: "#F5F0E8",
      },
    },
  },
  plugins: [],
};
