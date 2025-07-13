module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        titleLight: ["var(--font-title-light)", "sans-serif"],
        titleDark: ["var(--font-title-dark)", "sans-serif"],
      },
      fontSize: {
        sm: ["clamp(0.8125rem, 1.5vw, 0.875rem)", { lineHeight: "1.6" }],
        base: ["clamp(0.875rem, 1.75vw, 1rem)", { lineHeight: "1.6" }],
        lg: ["clamp(1rem, 2vw, 1.125rem)", { lineHeight: "1.4" }],
        xl: ["clamp(1.25rem, 2.25vw, 1.5rem)", { lineHeight: "1.3" }],
        "2xl": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2" }],
        // Add more if needed
      },
    },
  },
  plugins: [],
};
