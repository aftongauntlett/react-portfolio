module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: "var(--font-body)",
        heading: "var(--font-heading)",
      },
    },
  },
  plugins: [],
};
