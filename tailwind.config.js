/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#d4d0c8",
        foreground: "#000000",
        surface: "#d4d0c8",
        accent: "#0a246a",
        "accent-light": "#3a6ea5",
        "border-light": "#ffffff",
        "border-dark": "#808080",
        "border-darker": "#404040",
      },
      fontFamily: {
        heading: ["var(--font-vt323)", "monospace"],
        body: ['"MS Sans Serif"', '"Tahoma"', "Arial", "sans-serif"],
        mono: ['"Courier New"', "monospace"],
      },
    },
  },
  plugins: [],
};
