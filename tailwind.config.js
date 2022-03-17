const themeColors = {
  primary: { DEFAULT: "#8407c4", dark: "#b400ff" },
  secondary: { DEFAULT: "#cc0066", dark: "#b20059" }
}

module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./renderer/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: themeColors
    }
  },
  variants: {
    extend: {},
  },
  plugins: []
}
